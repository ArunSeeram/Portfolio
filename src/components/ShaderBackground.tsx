import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    if (!gl) return; // graceful fallback — CSS gradient shows instead

    // Vertex shader
    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader — subtle flowing liquid field
    const fsSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      float noise(vec2 p) {
        return sin(p.x * 1.5 + u_time * 0.3) * sin(p.y * 1.2 + u_time * 0.25) * 0.5 + 0.5;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        vec2 m = u_mouse / u_resolution;

        // mouse influence
        float dist = length(uv - m);
        float influence = smoothstep(0.6, 0.0, dist) * 0.08;

        // flowing field
        float n1 = noise(uv * 2.5 + vec2(u_time * 0.08, u_time * 0.06));
        float n2 = noise(uv * 4.0 + vec2(-u_time * 0.05, u_time * 0.09) + n1 * 0.3);
        float field = n1 * 0.6 + n2 * 0.4 + influence;

        // dark cinematic palette
        vec3 dark  = vec3(0.020, 0.020, 0.020); // near black
        vec3 deep  = vec3(0.040, 0.038, 0.032); // dark warm
        vec3 accent= vec3(0.098, 0.082, 0.054); // gold shadow
        
        vec3 col = mix(dark, deep, field * 0.7);
        col = mix(col, accent, pow(field, 3.0) * 0.4);

        // subtle vignette
        float vig = 1.0 - smoothstep(0.4, 1.0, length(uv - 0.5) * 1.4);
        col *= (0.75 + vig * 0.25);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function compileShader(type: number, source: string): WebGLShader | null {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);

    // Full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes  = gl.getUniformLocation(program, 'u_resolution');
    const uMouse= gl.getUniformLocation(program, 'u_mouse');

    let mouseX = 0.5, mouseY = 0.5;
    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = window.innerHeight - e.clientY;
    };
    window.addEventListener('mousemove', onMouse);

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    let raf: number;
    const startTime = performance.now();

    // Pause when not visible
    let paused = false;
    const observer = new IntersectionObserver(([entry]) => {
      paused = !entry.isIntersecting;
    });
    observer.observe(canvas);

    const render = () => {
      if (!paused) {
        const t = (performance.now() - startTime) / 1000;
        gl.uniform1f(uTime, t);
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform2f(uMouse, mouseX, mouseY);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', resize);
      observer.disconnect();
      gl.deleteProgram(program);
      gl.deleteBuffer(buf);
    };
  }, [reduced]);

  return (
    <div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(135deg, #050505 0%, #0d0a07 50%, #050505 100%)' }}
    >
      {/* Canvas shader layer */}
      {!reduced && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.85 }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
