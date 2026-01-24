'use client';

import { useEffect, useRef, useCallback } from 'react';

// ============================================
// CONFIGURATION CONSTANTS
// ============================================

// Dash density: lower = more dashes (grid cell size in pixels)
const GRID_SIZE = 32;

// Dash length in pixels
const DASH_LENGTH = 16;

// Field scale: higher = more zoomed out / larger patterns
const NOISE_SCALE = 0.004;

// Animation speed: higher = faster evolution
const TIME_SPEED = 0.001;

// Mouse interaction radius in pixels
const INTERACTION_RADIUS = 250;

// Mouse interaction strength (swirl + repulsion)
const SWIRL_STRENGTH = 2.0;
const REPULSION_STRENGTH = 0.5;

// ============================================
// LIGHTWEIGHT 2D VALUE NOISE
// ============================================

// Permutation table for noise
const perm: number[] = [];
for (let i = 0; i < 512; i++) {
  perm[i] = Math.floor(Math.random() * 256);
}

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a: number, b: number, t: number): number {
  return a + t * (b - a);
}

function grad(hash: number, x: number, y: number): number {
  const h = hash & 3;
  const u = h < 2 ? x : y;
  const v = h < 2 ? y : x;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

function noise2D(x: number, y: number): number {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  
  x -= Math.floor(x);
  y -= Math.floor(y);
  
  const u = fade(x);
  const v = fade(y);
  
  const A = perm[X] + Y;
  const B = perm[X + 1] + Y;
  
  return lerp(
    lerp(grad(perm[A], x, y), grad(perm[B], x - 1, y), u),
    lerp(grad(perm[A + 1], x, y - 1), grad(perm[B + 1], x - 1, y - 1), u),
    v
  );
}

// 3D noise for time evolution
function noise3D(x: number, y: number, z: number): number {
  const z0 = Math.floor(z);
  const z1 = z0 + 1;
  const tz = fade(z - z0);
  
  const n0 = noise2D(x + (z0 & 255) * 0.7, y + (z0 & 255) * 0.3);
  const n1 = noise2D(x + (z1 & 255) * 0.7, y + (z1 & 255) * 0.3);
  
  return lerp(n0, n1, tz);
}

// ============================================
// SMOOTHSTEP UTILITY
// ============================================

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// ============================================
// FLOW FIELD COMPONENT
// ============================================

interface FlowFieldProps {
  dashColor?: string;
  density?: number; // multiplier for grid density (1 = default, 2 = double density)
  className?: string;
}

export default function FlowField({
  dashColor = 'rgba(0, 0, 0, 0.15)',
  density = 1,
  className = '',
}: FlowFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const reducedMotionRef = useRef(false);
  
  // Reusable arrays to avoid allocations
  const gridPointsRef = useRef<{ x: number; y: number }[]>([]);

  const computeGrid = useCallback((width: number, height: number) => {
    const cellSize = GRID_SIZE / density;
    // Add padding so dashes at edges don't get clipped
    const padding = DASH_LENGTH;
    const cols = Math.ceil((width - padding * 2) / cellSize) + 1;
    const rows = Math.ceil((height - padding * 2) / cellSize) + 1;
    
    const points: { x: number; y: number }[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        points.push({
          x: padding + col * cellSize,
          y: padding + row * cellSize,
        });
      }
    }
    gridPointsRef.current = points;
  }, [density]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mediaQuery.matches;
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // Handle resize
    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      ctx.scale(dpr, dpr);
      computeGrid(rect.width, rect.height);
    };

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    // Initial setup
    handleResize();
    
    window.addEventListener('resize', handleResize);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    let time = 0;
    
    const animate = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Update time (pause if reduced motion)
      if (!reducedMotionRef.current) {
        time += TIME_SPEED * 16.67; // Normalize to ~60fps
      }
      
      const mouse = mouseRef.current;
      const points = gridPointsRef.current;
      
      ctx.strokeStyle = dashColor;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const px = point.x;
        const py = point.y;
        
        // Base angle from noise
        let angle = noise3D(
          px * NOISE_SCALE,
          py * NOISE_SCALE,
          time
        ) * Math.PI * 2;
        
        // Mouse interaction
        const dx = px - mouse.x;
        const dy = py - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < INTERACTION_RADIUS) {
          const influence = smoothstep(INTERACTION_RADIUS, 0, dist);
          
          // Swirl effect (perpendicular to direction from mouse)
          const swirlAngle = Math.atan2(dy, dx) + Math.PI / 2;
          angle += swirlAngle * influence * SWIRL_STRENGTH;
          
          // Repulsion (push away from mouse)
          const repulsionAngle = Math.atan2(dy, dx);
          angle = lerp(angle, repulsionAngle, influence * REPULSION_STRENGTH);
        }
        
        // Calculate dash endpoints
        const halfLen = DASH_LENGTH / 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        
        const x1 = px - cos * halfLen;
        const y1 = py - sin * halfLen;
        const x2 = px + cos * halfLen;
        const y2 = py + sin * halfLen;
        
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      
      ctx.stroke();
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, [dashColor, density, computeGrid]);

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
