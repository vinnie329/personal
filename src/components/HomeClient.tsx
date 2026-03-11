'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import LiveClock from '@/components/LiveClock';

// ── Theme definitions ──
const THEMES: Record<string, { bg: string; text: string; line: string; accent: string; hover: string }> = {
  default:  { bg: '#f2f2f0', text: '#1a1a1a', line: '#dcdcdc', accent: '#8c8c88', hover: '#eceae7' },
  midnight: { bg: '#1a1a1a', text: '#e8e8e6', line: '#333333', accent: '#666666', hover: '#e8e8e6' },
  ocean:    { bg: '#0a1628', text: '#c8daf0', line: '#1e3a5f', accent: '#4a7ab5', hover: '#c8daf0' },
  warm:     { bg: '#f5efe6', text: '#3d2e1e', line: '#d4c9b8', accent: '#9e8b74', hover: '#ebe5d8' },
  forest:   { bg: '#1a2e1a', text: '#c8e0c4', line: '#2d4a2d', accent: '#6a9a66', hover: '#c8e0c4' },
  rose:     { bg: '#2a1520', text: '#e8c8d8', line: '#4a2838', accent: '#b06888', hover: '#e8c8d8' },
};

const SWATCH_COLORS: Record<string, string> = {
  default: '#f2f2f0', midnight: '#1a1a1a', ocean: '#0a1628',
  warm: '#f5efe6', forest: '#1a2e1a', rose: '#2a1520',
};

const SPRAY_COLORS = ['#333', '#D8D4C5', '#D93F36', '#2A5BD7'];
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?<>~^';
const FRUITS = ['\u{1F34A}','\u{1F34B}','\u{1F34E}','\u{1F347}','\u{1F353}','\u{1F351}','\u{1F34C}','\u{1F349}','\u{1F95D}','\u{1F352}'];

// ── Work data ──
const WORK_ITEMS = [
  { num: '01', name: 'Aevo \u2014 Perps & Options Exchange', desc: 'High-performance derivatives trading interface for a decentralized exchange.', tags: ['#DEFI', '#TRADING'], year: '2024', sub: 'Shipped', color: 'bg-dark', href: '/work/aevo-perps' },
  { num: '02', name: 'Aevo \u2014 OTC Altcoin Options', desc: 'Over-the-counter options trading settled onchain for institutional participants.', tags: ['#OPTIONS', '#ONCHAIN'], year: '2024', sub: 'Shipped', color: 'bg-beige', href: '/work/aevo-otc' },
  { num: '03', name: 'Ribbon Finance \u2014 Options Vaults', desc: "DeFi's first structured products for automated on-chain yield generation.", tags: ['#DEFI', '#VAULTS'], year: '2022', sub: 'Shipped', color: 'bg-red', href: '/work/ribbon-finance' },
  { num: '04', name: 'Ribbon Lend \u2014 Unsecured Lending', desc: 'Lending to KYC/AML verified institutional market makers.', tags: ['#LENDING', '#INSTITUTIONAL'], year: '2023', sub: 'Shipped', color: 'bg-blue', href: '/work/ribbon-lend' },
];

const THOUGHTS = [
  { title: 'The Global Rules-Based Order is Dead', date: 'Jan 2026', href: '/thoughts/the-global-rules-based-order-is-dead' },
  { title: 'One-Player vs Multiplayer Software', date: 'Apr 2025', href: '/thoughts/one-player-vs-multiplayer-software' },
  { title: 'Four Potential Drivers of Crypto Adoption', date: 'Jul 2019', href: 'https://medium.com/@vinnielive/four-potential-drivers-of-crypto-adoption-59be6bf8a75e', external: true },
];

const LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/f1uxu5/' },
  { label: 'Twitter / X', href: 'https://x.com/vinnie_io' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vinnie-padmanabhan/' },
  { label: 'Dribbble', href: 'https://dribbble.com/vinnie_p' },
  { label: 'VSCO', href: 'https://vsco.co/the-mustard-co/gallery' },
];

function fmtTime(s: number): string {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ':' + String(sec).padStart(2, '0');
}

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function HomeClient() {
  // ── Hero state ──
  const [heroText, setHeroText] = useState("Hello,\nI\u2019m Vinnie");
  const [heroFocused, setHeroFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const displayRef = useRef<HTMLHeadingElement>(null);

  // ── Theme state ──
  const [activeTheme, setActiveTheme] = useState('default');

  // ── Draw state ──
  const [drawMode, setDrawMode] = useState<'none' | 'spray' | 'brush'>('none');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, down: false });
  const lastBrushRef = useRef<{ x: number; y: number } | null>(null);
  const sprayRafRef = useRef<number | null>(null);

  // ── Scramble state ──
  const [scrambleRunning, setScrambleRunning] = useState(false);
  const [scrambleDisplay, setScrambleDisplay] = useState<string | null>(null);

  // ── Fruit state ──
  const [fruitState, setFruitState] = useState<'ready' | 'dropping' | 'settled' | 'binning'>('ready');
  const fruitCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fruitItemsRef = useRef<Array<{
    emoji: string; x: number; y: number; vy: number; vx: number;
    gravity: number; bounce: number; rotation: number; spin: number;
    size: number; floor: number; settled: boolean;
  }>>([]);

  // ── Radio state ──
  const [isPlaying, setIsPlaying] = useState(false);
  const [radioTime, setRadioTime] = useState({ current: '0:00', duration: '0:00', pct: 0 });
  const ytPlayerRef = useRef<any>(null);

  // ── Widget drag state ──
  const widgetRefs = useRef<Map<string, { el: HTMLDivElement; promoted: boolean }>>(new Map());

  // ── Focus hero on mount ──
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.focus();
      ta.setSelectionRange(ta.value.length, ta.value.length);
    }
  }, []);

  // ── Theme application ──
  useEffect(() => {
    const t = THEMES[activeTheme];
    if (!t) return;
    const root = document.documentElement.style;
    root.setProperty('--bg', t.bg);
    root.setProperty('--text', t.text);
    root.setProperty('--line', t.line);
    root.setProperty('--accent', t.accent);
    root.setProperty('--hover', t.hover);
  }, [activeTheme]);

  // ── Canvas resize ──
  useEffect(() => {
    function resize() {
      const c = canvasRef.current;
      if (!c) return;
      const ctx = c.getContext('2d');
      if (!ctx) return;
      const imgData = ctx.getImageData(0, 0, c.width, c.height);
      c.width = window.innerWidth;
      c.height = document.documentElement.scrollHeight;
      ctx.putImageData(imgData, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // ── Spray loop ──
  useEffect(() => {
    if (drawMode !== 'spray') {
      if (sprayRafRef.current) cancelAnimationFrame(sprayRafRef.current);
      sprayRafRef.current = null;
      return;
    }
    function loop() {
      const c = canvasRef.current;
      if (!c) return;
      const ctx = c.getContext('2d');
      if (!ctx) return;
      if (c.height < document.documentElement.scrollHeight) {
        const imgData = ctx.getImageData(0, 0, c.width, c.height);
        c.width = window.innerWidth;
        c.height = document.documentElement.scrollHeight;
        ctx.putImageData(imgData, 0, 0);
      }
      if (mouseRef.current.down) {
        const count = 8 + Math.floor(Math.random() * 5);
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 18;
          const x = mouseRef.current.x + Math.cos(angle) * radius;
          const y = mouseRef.current.y + Math.sin(angle) * radius;
          const size = 1 + Math.random() * 2.5;
          const color = SPRAY_COLORS[Math.floor(Math.random() * SPRAY_COLORS.length)];
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = 0.5 + Math.random() * 0.5;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      sprayRafRef.current = requestAnimationFrame(loop);
    }
    sprayRafRef.current = requestAnimationFrame(loop);
    return () => {
      if (sprayRafRef.current) cancelAnimationFrame(sprayRafRef.current);
    };
  }, [drawMode]);

  // ── Mouse tracking for draw tools ──
  useEffect(() => {
    function onMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY + window.scrollY;
      if (drawMode === 'brush' && mouseRef.current.down) {
        const target = e.target as HTMLElement;
        if (target.closest('.toolbelt')) return;
        const c = canvasRef.current;
        const ctx = c?.getContext('2d');
        if (!ctx) return;
        ctx.strokeStyle = SPRAY_COLORS[Math.floor(Math.random() * SPRAY_COLORS.length)];
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = 0.8;
        const last = lastBrushRef.current;
        if (last) {
          ctx.beginPath();
          ctx.moveTo(last.x, last.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.stroke();
        }
        lastBrushRef.current = { x: mouseRef.current.x, y: mouseRef.current.y };
        ctx.globalAlpha = 1;
      }
    }
    function onDown(e: MouseEvent) {
      if (drawMode !== 'none') {
        const target = e.target as HTMLElement;
        if (!target.closest('.toolbelt')) {
          mouseRef.current.down = true;
          if (drawMode === 'brush') {
            lastBrushRef.current = { x: mouseRef.current.x, y: mouseRef.current.y };
          }
        }
      }
    }
    function onUp() {
      mouseRef.current.down = false;
      lastBrushRef.current = null;
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
    };
  }, [drawMode]);

  // ── Body class for draw mode cursor ──
  useEffect(() => {
    document.body.classList.remove('spraying', 'brushing');
    if (drawMode === 'spray') document.body.classList.add('spraying');
    if (drawMode === 'brush') document.body.classList.add('brushing');
    return () => {
      document.body.classList.remove('spraying', 'brushing');
    };
  }, [drawMode]);

  // ── YouTube player ──
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ((window as any).YT && (window as any).YT.Player) {
      initPlayer();
      return;
    }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
    (window as any).onYouTubeIframeAPIReady = initPlayer;

    function initPlayer() {
      const YTApi = (window as any).YT;
      ytPlayerRef.current = new YTApi.Player('yt-player', {
        height: '2',
        width: '2',
        videoId: 's8LtrwbEUow',
        playerVars: { autoplay: 0, controls: 0, disablekb: 1, fs: 0, modestbranding: 1, rel: 0, origin: window.location.origin },
        events: {
          onReady: (e: any) => {
            e.target.setVolume(80);
            e.target.cuePlaylist({ listType: 'playlist', list: 'PLaKVxZQYOh4h1n-cUf-46UToX5cvjfij0' });
          },
          onStateChange: (e: any) => {
            const YT = (window as any).YT;
            const playing = e.data === YT.PlayerState.PLAYING;
            const paused = e.data === YT.PlayerState.PAUSED;
            const ended = e.data === YT.PlayerState.ENDED;
            if (playing) setIsPlaying(true);
            else if (paused || ended) setIsPlaying(false);
          },
        },
      });
    }
  }, []);

  // ── Radio progress polling ──
  useEffect(() => {
    const interval = setInterval(() => {
      const p = ytPlayerRef.current;
      //getCurrentTime may not exist yet
      if (!p || !p.getCurrentTime || !p.getDuration) return;
      //getCurrentTime
      const cur = p.getCurrentTime();
      //getDuration
      const dur = p.getDuration();
      if (dur > 0) {
        setRadioTime({ current: fmtTime(cur), duration: fmtTime(dur), pct: (cur / dur) * 100 });
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // ── Handlers ──
  const handleTheme = (name: string) => setActiveTheme(name);

  const handleDraw = (mode: 'spray' | 'brush') => {
    setDrawMode(prev => prev === mode ? 'none' : mode);
  };

  const handleClear = () => {
    const c = canvasRef.current;
    const ctx = c?.getContext('2d');
    if (ctx && c) ctx.clearRect(0, 0, c.width, c.height);
  };

  const handleScramble = useCallback(() => {
    if (scrambleRunning || !heroText) return;
    setScrambleRunning(true);
    const chars = heroText.split('');
    const totalChars = chars.length;
    const totalDuration = 2000;
    const flickerInterval = 40;
    const staggerDelay = totalDuration / totalChars;
    const landed = new Array(totalChars).fill(false);
    const displayed = new Array(totalChars);
    for (let i = 0; i < totalChars; i++) {
      if (chars[i] === '\n' || chars[i] === ' ') { displayed[i] = chars[i]; landed[i] = true; }
      else displayed[i] = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    }
    setScrambleDisplay(displayed.join(''));
    const startTime = performance.now();
    let lastFlicker = startTime;
    function animate(now: number) {
      const elapsed = now - startTime;
      if (now - lastFlicker >= flickerInterval) {
        lastFlicker = now;
        for (let i = 0; i < totalChars; i++) {
          if (!landed[i]) displayed[i] = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }
      for (let i = 0; i < totalChars; i++) {
        if (!landed[i] && elapsed >= staggerDelay * i) { landed[i] = true; displayed[i] = chars[i]; }
      }
      setScrambleDisplay(displayed.join(''));
      if (landed.every(Boolean)) {
        setScrambleDisplay(null);
        setScrambleRunning(false);
        return;
      }
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [scrambleRunning, heroText]);

  const handleXRay = () => {
    const src = document.documentElement.outerHTML;
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;background:#1a1a1a;color:#c8f0c8;font-family:"Courier New",monospace;font-size:12px;line-height:1.6;overflow:auto;padding:2rem;white-space:pre-wrap;word-break:break-all;';
    const escaped = src
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/(&lt;\/?[\w-]+)/g, '<span style="color:#f472b6;">$1</span>')
      .replace(/(&gt;)/g, '<span style="color:#f472b6;">$1</span>')
      .replace(/([\w-]+)=(&quot;|")/g, '<span style="color:#7dd3fc;">$1</span>=<span style="color:#fbbf24;">"</span>')
      .replace(/("[\w\s:;#.,\-/%()]+?")/g, '<span style="color:#fbbf24;">$1</span>');
    overlay.innerHTML = escaped;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 500);
  };

  const handleFruit = () => {
    if (fruitState === 'ready') {
      setFruitState('dropping');
      const canvas = document.createElement('canvas');
      canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      document.body.appendChild(canvas);
      fruitCanvasRef.current = canvas;
      const ctx = canvas.getContext('2d')!;
      const items: typeof fruitItemsRef.current = [];
      for (let i = 0; i < 16; i++) {
        items.push({
          emoji: FRUITS[Math.floor(Math.random() * FRUITS.length)],
          x: Math.random() * canvas.width, y: -(30 + Math.random() * 150),
          vy: Math.random() * 2, vx: (Math.random() - 0.5) * 1.5,
          gravity: 0.35 + Math.random() * 0.25, bounce: 0.35 + Math.random() * 0.25,
          rotation: Math.random() * 360, spin: (Math.random() - 0.5) * 6,
          size: 20 + Math.random() * 16, floor: canvas.height - 10 - Math.random() * 5, settled: false,
        });
      }
      fruitItemsRef.current = items;
      function dropAnimate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let allSettled = true;
        items.forEach(f => {
          if (!f.settled) {
            f.vy += f.gravity; f.y += f.vy; f.x += f.vx; f.rotation += f.spin;
            if (f.y >= f.floor) {
              f.y = f.floor;
              if (Math.abs(f.vy) < 2) { f.vy = 0; f.spin = 0; f.settled = true; }
              else { f.vy = -f.vy * f.bounce; f.spin *= 0.5; }
            }
          }
          if (!f.settled) allSettled = false;
          ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(f.rotation * Math.PI / 180);
          ctx.font = f.size + 'px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(f.emoji, 0, 0); ctx.restore();
        });
        if (!allSettled) requestAnimationFrame(dropAnimate);
        else setFruitState('settled');
      }
      requestAnimationFrame(dropAnimate);
    } else if (fruitState === 'settled') {
      setFruitState('binning');
      const canvas = fruitCanvasRef.current!;
      const ctx = canvas.getContext('2d')!;
      const items = fruitItemsRef.current;
      items.forEach(f => { f.settled = false; f.vy = 0; f.gravity = 0.5 + Math.random() * 0.4; f.floor = canvas.height + 100; f.spin = (Math.random() - 0.5) * 8; });
      function binAnimate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let allGone = true;
        items.forEach(f => {
          f.vy += f.gravity; f.y += f.vy; f.rotation += f.spin;
          if (f.y < canvas.height + 60) allGone = false;
          ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(f.rotation * Math.PI / 180);
          ctx.font = f.size + 'px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(f.emoji, 0, 0); ctx.restore();
        });
        if (!allGone) requestAnimationFrame(binAnimate);
        else {
          canvas.remove();
          fruitCanvasRef.current = null;
          fruitItemsRef.current = [];
          setFruitState('ready');
        }
      }
      requestAnimationFrame(binAnimate);
    }
  };

  const handleRadioPlay = () => {
    const p = ytPlayerRef.current;
    if (!p) return;
    //playVideo/pauseVideo
    if (isPlaying) p.pauseVideo(); else p.playVideo();
  };

  const handleRadioPrev = () => {
    //previousVideo
    ytPlayerRef.current?.previousVideo();
  };

  const handleRadioNext = () => {
    //nextVideo
    ytPlayerRef.current?.nextVideo();
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseInt(e.target.value);
    //setVolume
    ytPlayerRef.current?.setVolume(vol);
  };

  const handleRadioSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const p = ytPlayerRef.current;
    //getDuration
    if (!p || !p.getDuration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    //getDuration / seekTo
    const dur = p.getDuration();
    //seekTo
    if (dur > 0) p.seekTo(pct * dur, true);
  };

  // ── Hero rendering ──
  const displayText = scrambleDisplay !== null ? scrambleDisplay : heroText;
  const renderHero = () => {
    const lines = displayText.split('\n');
    const elements: React.ReactNode[] = [];
    lines.forEach((line, i) => {
      if (i === lines.length - 1 && line.length === 0) {
        // skip empty last line for text node, cursor goes at start
      } else {
        elements.push(<span key={`l${i}`}>{line || '\u00A0'}</span>);
      }
      if (i < lines.length - 1) elements.push(<br key={`br${i}`} />);
    });
    const lastLine = lines[lines.length - 1];
    const atStart = displayText.length === 0 || lastLine.length === 0;
    elements.push(
      <span
        key="cursor"
        className={`cursor${atStart ? ' at-start' : ''}`}
      />
    );
    if (displayText.length === 0) {
      elements.push(<span key="ph" className="placeholder">Yo yo yo ...</span>);
    }
    return elements;
  };

  // ── Widget drag ──
  const handleWidgetMouseDown = (id: string, e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'IFRAME' || target.tagName === 'A') return;
    const entry = widgetRefs.current.get(id);
    if (!entry) return;
    const widget = entry.el;
    e.preventDefault();
    widget.classList.add('dragging');

    if (!entry.promoted) {
      const r = widget.getBoundingClientRect();
      widget.style.position = 'absolute';
      widget.style.left = (r.left + scrollX) + 'px';
      widget.style.top = (r.top + scrollY) + 'px';
      widget.style.right = 'auto';
      widget.style.margin = '0';
      entry.promoted = true;
    }

    const origLeft = parseInt(widget.style.left);
    const origTop = parseInt(widget.style.top);
    const startX = e.clientX;
    const startY = e.clientY;

    function onMove(ev: MouseEvent) {
      widget.style.left = (origLeft + ev.clientX - startX) + 'px';
      widget.style.top = (origTop + ev.clientY - startY) + 'px';
    }
    function onUp() {
      widget.classList.remove('dragging');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  return (
    <>
      {/* Nav */}
      <nav>
        <Logo animateOnLoad />
        <div className="coords">
          <LiveClock />
        </div>
      </nav>

      {/* Hero */}
      <div
        className={`hero${heroFocused ? ' focused' : ''}`}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('[data-drag]')) return;
          textareaRef.current?.focus();
        }}
      >
        <h1 ref={displayRef}>{renderHero()}</h1>
        <textarea
          ref={textareaRef}
          className="hero-input"
          spellCheck={false}
          value={heroText}
          onChange={(e) => setHeroText(e.target.value)}
          onFocus={() => setHeroFocused(true)}
          onBlur={() => setHeroFocused(false)}
        />

        {/* Widgets */}
        <div
          className="widget w2"
          data-drag
          ref={(el) => { if (el) widgetRefs.current.set('w2', { el, promoted: widgetRefs.current.get('w2')?.promoted || false }); }}
          onMouseDown={(e) => handleWidgetMouseDown('w2', e)}
        >
          <div className="widget-header"><span>Lisbon Studio</span><div className="handle" /></div>
          <div className="widget-body" style={{ height: 120, background: '#e8e7e3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><rect x="4" y="8" width="28" height="20" rx="2" stroke="#bbb" strokeWidth="1.5"/><circle cx="18" cy="18" r="5" stroke="#bbb" strokeWidth="1"/><circle cx="18" cy="18" r="1.5" fill="#bbb"/></svg>
          </div>
          <div className="widget-caption">Workspace &middot; 2026</div>
        </div>

        <div
          className="widget w3"
          data-drag
          ref={(el) => { if (el) widgetRefs.current.set('w3', { el, promoted: widgetRefs.current.get('w3')?.promoted || false }); }}
          onMouseDown={(e) => handleWidgetMouseDown('w3', e)}
        >
          <div className="widget-header"><span>Recent</span><div className="handle" /></div>
          <div style={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 300, color: 'var(--accent)' }}>12+</div>
            <div style={{ fontSize: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)' }}>Projects Shipped</div>
          </div>
        </div>
      </div>

      {/* Toolbelt */}
      <div className="toolbelt">
        {/* Theme */}
        <div className="tool-cell">
          <div className="tool-label">Theme</div>
          <div className="tool-controls">
            {Object.entries(SWATCH_COLORS).map(([name, color]) => (
              <div
                key={name}
                className={`swatch${activeTheme === name ? ' active' : ''}`}
                style={{ background: color }}
                title={name.charAt(0).toUpperCase() + name.slice(1)}
                onClick={() => handleTheme(name)}
              />
            ))}
          </div>
        </div>

        {/* Draw */}
        <div className="tool-cell">
          <div className="tool-label">Draw</div>
          <div className="tool-controls">
            <button className={`tool-btn${drawMode === 'brush' ? ' active' : ''}`} onClick={() => handleDraw('brush')}>
              🖌️ Marker
            </button>
            <button className={`tool-btn${drawMode === 'spray' ? ' active' : ''}`} onClick={() => handleDraw('spray')}>
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="3" cy="11" r="2"/><line x1="3" y1="9" x2="3" y2="5"/><line x1="3" y1="5" x2="8" y2="5"/><line x1="8" y1="5" x2="8" y2="2"/><circle cx="10" cy="1.5" r="0.8" fill="currentColor" stroke="none"/><circle cx="12" cy="2.5" r="0.6" fill="currentColor" stroke="none"/><circle cx="11" cy="4" r="0.5" fill="currentColor" stroke="none"/><circle cx="13" cy="4.5" r="0.4" fill="currentColor" stroke="none"/></svg>
              Spray
            </button>
            <button className="tool-btn" onClick={handleClear}>Clear</button>
          </div>
        </div>

        {/* Random */}
        <div className="tool-cell">
          <div className="tool-label">Random</div>
          <div className="tool-controls">
            <button className={`tool-btn${scrambleRunning ? ' active' : ''}`} disabled={scrambleRunning} onClick={handleScramble}>⟳ Scramble</button>
            <button className="tool-btn" onClick={handleXRay}>◎ X-Ray</button>
            <button
              className="tool-btn"
              disabled={fruitState === 'dropping' || fruitState === 'binning'}
              onClick={handleFruit}
            >
              {fruitState === 'settled' ? '🗑️ Bin' : '🍊 Fruit'}
            </button>
          </div>
        </div>

        {/* Radio */}
        <div className="tool-cell">
          <div className="tool-label">Radio</div>
          <div className="tool-controls">
            <button className="sound-btn" onClick={handleRadioPrev} title="Previous">
              <svg viewBox="0 0 14 14" fill="currentColor"><rect x="1.5" y="3" width="1.5" height="8" rx="0.5"/><path d="M12 3.5v7a.5.5 0 01-.77.42l-6-3.5a.5.5 0 010-.84l6-3.5A.5.5 0 0112 3.5z"/></svg>
            </button>
            <button className={`sound-btn play-btn${isPlaying ? ' active' : ''}`} onClick={handleRadioPlay} title="Play / Pause">
              {isPlaying ? (
                <svg viewBox="0 0 14 14" fill="currentColor"><rect x="3" y="2.5" width="2.5" height="9" rx="0.5"/><rect x="8.5" y="2.5" width="2.5" height="9" rx="0.5"/></svg>
              ) : (
                <svg viewBox="0 0 14 14" fill="currentColor"><path d="M4 2.5v9a.5.5 0 00.77.42l7-4.5a.5.5 0 000-.84l-7-4.5A.5.5 0 004 2.5z"/></svg>
              )}
            </button>
            <button className="sound-btn" onClick={handleRadioNext} title="Next">
              <svg viewBox="0 0 14 14" fill="currentColor"><rect x="11" y="3" width="1.5" height="8" rx="0.5"/><path d="M2 3.5v7a.5.5 0 00.77.42l6-3.5a.5.5 0 000-.84l-6-3.5A.5.5 0 002 3.5z"/></svg>
            </button>
            <span className="radio-time">{radioTime.current}</span>
            <div className="radio-progress" onClick={handleRadioSeek}>
              <div className="radio-progress-fill" style={{ width: `${radioTime.pct}%` }} />
            </div>
            <span className="radio-time">{radioTime.duration}</span>
            <input type="range" className="sound-vol" min="0" max="100" defaultValue="80" onChange={handleVolume} title="Volume" />
          </div>
        </div>
      </div>

      {/* YouTube player (hidden) */}
      <div id="yt-wrap"><div id="yt-player" /></div>

      {/* Spray canvas */}
      <canvas id="spray-canvas" ref={canvasRef} />

      {/* Work Section */}
      <div className="work-section">
        <h2 className="section-title">Selected Work</h2>
        <div className="list-header">
          <div>NO.</div>
          <div>PROJECT</div>
          <div>TAGS</div>
          <div className="col-year">YEAR</div>
        </div>
        {WORK_ITEMS.map((item) => (
          <Link key={item.num} href={item.href} className="row">
            <div className="row-num">{item.num}</div>
            <div className="row-main">
              <div className="row-name"><span className={`marker ${item.color}`} />{item.name}</div>
              <div className="row-desc">{item.desc}</div>
            </div>
            <div className="tags">
              {item.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
            <div className="row-year">{item.year} <span className="sub">{item.sub}</span></div>
          </Link>
        ))}
      </div>

      {/* Bottom Strip */}
      <div className="bottom-strip">
        <div className="bottom-left">
          <div className="section-label">Thoughts</div>
          {THOUGHTS.map((t) =>
            t.external ? (
              <a key={t.title} href={t.href} className="thought-row" target="_blank" rel="noopener noreferrer">
                <span className="thought-title">{t.title}</span>
                <span className="thought-date">{t.date}</span>
              </a>
            ) : (
              <Link key={t.title} href={t.href} className="thought-row">
                <span className="thought-title">{t.title}</span>
                <span className="thought-date">{t.date}</span>
              </Link>
            )
          )}
        </div>
        <div className="bottom-right">
          <div className="section-label">Links</div>
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="link-item" target="_blank" rel="noopener noreferrer">
              {l.label} &rarr;
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
