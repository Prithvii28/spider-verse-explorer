import React, { useRef, useEffect } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

export default function DimensionalRiftCanvas() {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);
    let pointer = null;

    // Web filament nodes
    const nodeCount = Math.min(Math.floor(width / 35), 28);
    const nodes = [];
    const centerX = width * 0.72;
    const centerY = height * 0.45;

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2 + (Math.random() * 0.2);
      const dist = 60 + Math.random() * (Math.min(width, height) * 0.42);
      nodes.push({
        x: centerX + Math.cos(angle) * dist,
        y: centerY + Math.sin(angle) * dist,
        baseAngle: angle,
        baseDist: dist,
        speed: (Math.random() - 0.5) * 0.004,
        pulseOffset: Math.random() * Math.PI * 2,
        size: Math.random() * 2 + 1.5,
      });
    }

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      if (prefersReducedMotion) {
        drawFrame(0);
      }
    };

    const handlePointerMove = (event) => {
      const bounds = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
      if (prefersReducedMotion) drawFrame(0);
    };

    const handlePointerLeave = () => {
      pointer = null;
      if (prefersReducedMotion) drawFrame(0);
    };

    window.addEventListener('resize', handleResize);
    canvas.parentElement.addEventListener('pointermove', handlePointerMove, { passive: true });
    canvas.parentElement.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    function drawFrame(time) {
      ctx.clearRect(0, 0, width, height);

      const curCenterX = width > 768 ? width * 0.72 : width * 0.5;
      const curCenterY = width > 768 ? height * 0.45 : height * 0.35;

      // Draw faint dimensional rift core glow
      const glowGrad = ctx.createRadialGradient(curCenterX, curCenterY, 10, curCenterX, curCenterY, 240);
      glowGrad.addColorStop(0, 'rgba(230, 57, 70, 0.12)');
      glowGrad.addColorStop(0.5, 'rgba(197, 27, 41, 0.04)');
      glowGrad.addColorStop(1, 'rgba(10, 11, 14, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(curCenterX, curCenterY, 240, 0, Math.PI * 2);
      ctx.fill();

      // Update & Draw nodes
      ctx.strokeStyle = 'rgba(230, 57, 70, 0.22)';
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (!prefersReducedMotion) {
          node.baseAngle += node.speed;
        }

        const currentX = curCenterX + Math.cos(node.baseAngle) * node.baseDist;
        const currentY = curCenterY + Math.sin(node.baseAngle) * node.baseDist;

        // Draw web line to rift center
        ctx.beginPath();
        ctx.strokeStyle = i % 3 === 0 ? 'rgba(230, 57, 70, 0.28)' : 'rgba(148, 163, 184, 0.12)';
        ctx.lineWidth = i % 3 === 0 ? 1.2 : 0.8;
        ctx.moveTo(curCenterX, curCenterY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

        // Connect adjacent nodes to form multiversal web rings
        const nextNode = nodes[(i + 1) % nodes.length];
        const nextX = curCenterX + Math.cos(nextNode.baseAngle) * nextNode.baseDist;
        const nextY = curCenterY + Math.sin(nextNode.baseAngle) * nextNode.baseDist;

        ctx.beginPath();
        ctx.strokeStyle = 'rgba(230, 57, 70, 0.14)';
        ctx.lineWidth = 0.8;
        ctx.moveTo(currentX, currentY);
        ctx.lineTo(nextX, nextY);
        ctx.stroke();

        // Node particle
        ctx.beginPath();
        ctx.fillStyle = i % 2 === 0 ? '#e63946' : '#cbd5e1';
        ctx.arc(currentX, currentY, node.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (pointer) {
        const pulse = prefersReducedMotion ? 0 : (Math.sin(time * 0.004) + 1) * 0.5;
        nodes.forEach((node) => {
          const x = curCenterX + Math.cos(node.baseAngle) * node.baseDist;
          const y = curCenterY + Math.sin(node.baseAngle) * node.baseDist;
          const distance = Math.hypot(pointer.x - x, pointer.y - y);
          if (distance < 210) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 92, 105, ${0.28 * (1 - distance / 210)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
        });
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 105, 116, ${0.28 + pulse * 0.2})`;
        ctx.arc(pointer.x, pointer.y, 5 + pulse * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Rift Center Geometric Polygon
      ctx.save();
      ctx.translate(curCenterX, curCenterY);
      if (!prefersReducedMotion) {
        ctx.rotate(time * 0.0003);
      }
      ctx.strokeStyle = '#e63946';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let s = 0; s < 6; s++) {
        const rad = (s * Math.PI) / 3;
        const px = Math.cos(rad) * 28;
        const py = Math.sin(rad) * 28;
        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();

      // Inner polygon
      ctx.strokeStyle = 'rgba(247, 244, 234, 0.6)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let s = 0; s < 6; s++) {
        const rad = (s * Math.PI) / 3 + Math.PI / 6;
        const px = Math.cos(rad) * 16;
        const py = Math.sin(rad) * 16;
        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }

    if (prefersReducedMotion) {
      drawFrame(0);
    } else {
      const render = (time) => {
        drawFrame(time);
        animationFrameId = requestAnimationFrame(render);
      };
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.parentElement?.removeEventListener('pointermove', handlePointerMove);
      canvas.parentElement?.removeEventListener('pointerleave', handlePointerLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="dimensional-rift-canvas"
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.9,
      }}
    />
  );
}
