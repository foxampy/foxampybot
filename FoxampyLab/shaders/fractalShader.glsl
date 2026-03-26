// Фрактальный шейдер для визуализаций
uniform float uTime;
uniform vec3 uColor;
uniform float uIntensity;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vec2 uv = vUv;
  
  // Фрактальный паттерн
  float pattern = sin(uv.x * 10.0 + uTime) * sin(uv.y * 10.0 + uTime * 0.5);
  pattern = abs(pattern);
  
  // Эмиссия с пульсацией
  vec3 emissive = uColor * (0.3 + pattern * uIntensity);
  
  gl_FragColor = vec4(emissive, 0.8);
}

