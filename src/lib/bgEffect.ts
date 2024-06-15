export interface BgEffectOptions {
  canvasId: string;
  colorSet: string[];
  width?: number;
  height?: number;
  particleCount?: number;
  particleSize?: number;
}

export interface Particle {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
  color: string;
}

export class BgEffect {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private colorSet: string[];
  private width: number;
  private height: number;
  private particleCount: number;
  private particleSize: number;
  private moveSpeed: number;
  private particles: Particle[];

  constructor({
    canvasId,
    colorSet,
    width = window.innerWidth,
    height = window.innerHeight,
    particleCount = 10,
    particleSize = 4,
  }: BgEffectOptions) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) {
      throw new Error(`Canvas element with id "${canvasId}" not found`);
    }
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.colorSet = colorSet;
    this.width = width;
    this.height = height;
    this.particleCount = particleCount;
    this.particleSize = particleSize;
    this.moveSpeed = 5;
    this.particles = [];

    this.init();
  }

  private init() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.createParticles();
    this.animate();
  }

  private createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      const radius = Math.random() * this.particleSize;
      const x = Math.random() * (this.canvas.width - radius * 2) + radius;
      const y = Math.random() * (this.canvas.height - radius * 2) + radius;
      const dx = (Math.random() - 0.5) * this.moveSpeed;
      const dy = (Math.random() - 0.5) * this.moveSpeed;
      const color = this.colorSet[i % this.colorSet.length];

      this.particles.push({ x, y, radius, dx, dy, color });
    }
  }

  private updateParticle(particle: Particle) {
    particle.x += particle.dx;
    particle.y += particle.dy;

    if (
      particle.x - particle.radius > this.canvas.width ||
      particle.x + particle.radius < 0
    ) {
      particle.dx = -particle.dx;
    }

    if (
      particle.y - particle.radius > this.canvas.height ||
      particle.y + particle.radius < 0
    ) {
      particle.dy = -particle.dy;
    }

    this.drawParticle(particle);
  }

  private drawParticle(particle: Particle) {
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = particle.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  private animate() {
    requestAnimationFrame(() => this.animate());

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "transparent";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for (let particle of this.particles) {
      this.updateParticle(particle);
    }
  }
}
