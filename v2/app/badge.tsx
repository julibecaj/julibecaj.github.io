'use client';

import { useEffect, useRef } from 'react';

/** A damped pendulum. Pointer capture keeps the card held across text layers. */
export function Badge() {
  const scene = useRef<HTMLDivElement>(null);
  const arm = useRef<HTMLDivElement>(null);
  const motion = useRef({ angle: 3, velocity: 0, stretch: 0, dragging: false, startX: 0, startY: 0, startAngle: 0, pointer: -1 });
  const frame = useRef(0);
  const reduced = useRef(false);
  const previous = useRef(0);

  function paint() {
    const m = motion.current;
    if (arm.current) arm.current.style.transform = `rotate(${m.angle}deg) scaleY(${1 + m.stretch / 1200})`;
    if (scene.current) {
      scene.current.style.zIndex = m.dragging || m.velocity >= 0 ? '3' : '1';
      scene.current.dataset.dragging = String(m.dragging);
      scene.current.querySelector('[role=slider]')?.setAttribute('aria-valuenow', String(Math.round(m.angle)));
    }
  }
  function tick(time: number) {
    const m = motion.current;
    const step = Math.min((time - previous.current) / 16.667 || 1, 2);
    previous.current = time;
    if (!m.dragging) {
      m.velocity += (-m.angle * .018 - m.velocity * .055) * step;
      m.angle += m.velocity * step;
      m.stretch *= Math.pow(.87, step);
    }
    paint();
    if (m.dragging || Math.abs(m.angle) + Math.abs(m.velocity) + m.stretch > .04) frame.current = requestAnimationFrame(tick);
    else { m.angle = 0; m.velocity = 0; paint(); frame.current = 0; }
  }
  function start() {
    if (!frame.current) { previous.current = performance.now(); frame.current = requestAnimationFrame(tick); }
  }
  function release() {
    motion.current.dragging = false;
    if (reduced.current) { motion.current.angle = 0; motion.current.velocity = 0; motion.current.stretch = 0; paint(); }
    else start();
  }
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { reduced.current = query.matches; };
    update(); query.addEventListener('change', update);
    paint();
    return () => { cancelAnimationFrame(frame.current); query.removeEventListener('change', update); };
  }, []);

  return <div ref={scene} className="pendulum-scene">
    <div ref={arm} className="pendulum-arm">
      <div className="pendulum-art">
        <img src="/assets/badge.svg" width="360" height="865" alt="" draggable={false}/>
        <div className="pendulum-print">
          <span className="badge-label">DEVELOPER / TIRANA, AL</span>
          <strong>Julian<br/>Becaj</strong>
          <span className="badge-description">Full-stack software engineer</span>
          <span className="badge-rule"/>
          <span className="badge-code">JB—01 <small>DESIGN<br/>DEVELOPMENT</small></span>
        </div>
        <div className="badge-grip" role="slider" tabIndex={0} aria-label="Swing Julian’s ID badge" aria-valuemin={-55} aria-valuemax={55} aria-valuenow={0} aria-valuetext="Draggable badge. Use left and right arrow keys to swing; Home to reset."
          onPointerDown={e => {
            if (e.button !== 0) return;
            e.currentTarget.setPointerCapture(e.pointerId);
            const m = motion.current;
            m.dragging = true; m.pointer = e.pointerId; m.startX = e.clientX; m.startY = e.clientY; m.startAngle = m.angle; m.velocity = 0;
            start();
          }}
          onPointerMove={e => {
            const m = motion.current;
            if (!m.dragging || m.pointer !== e.pointerId) return;
            const angle = Math.max(-55, Math.min(55, m.startAngle - (e.clientX - m.startX) * .16));
            m.velocity = Math.max(-4, Math.min(4, angle - m.angle)); m.angle = angle;
            m.stretch = Math.max(0, Math.min(100, e.clientY - m.startY));
            e.currentTarget.setAttribute('aria-valuenow', String(Math.round(angle)));
            paint();
          }}
          onPointerUp={e => { if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId); release(); }}
          onPointerCancel={release} onLostPointerCapture={release}
          onKeyDown={e => {
            const m = motion.current;
            if (!['ArrowLeft','ArrowRight','Home'].includes(e.key)) return;
            e.preventDefault();
            m.angle = e.key === 'Home' ? 0 : Math.max(-55, Math.min(55, m.angle + (e.key === 'ArrowLeft' ? 12 : -12)));
            m.velocity = 0; e.currentTarget.setAttribute('aria-valuenow', String(Math.round(m.angle))); paint();
            if (!reduced.current) start();
          }}/>
      </div>
    </div>
  </div>;
}

