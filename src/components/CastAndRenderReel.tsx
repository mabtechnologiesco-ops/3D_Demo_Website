import React, { useEffect, useRef, useState } from 'react';
import { X, ExternalLink, Play, Sparkles } from 'lucide-react';

interface CastAndRenderReelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CastAndRenderReel: React.FC<CastAndRenderReelProps> = ({ isOpen, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bootRef = useRef<HTMLDivElement>(null);
  const bootBarRef = useRef<HTMLElement>(null);
  const bootPctRef = useRef<HTMLParagraphElement>(null);
  const meterRef = useRef<HTMLElement>(null);

  const [loadingPct, setLoadingPct] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // 1920x1080, 10.04s, 241 frames, all-intra — every frame is a keyframe, which is why a scroll scrub can land on an exact frame instantly.
    const VIDEO_URL =
      'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/45567745-d826-44a2-a5ce-7ef670944e60.mp4';

    const clip = videoRef.current;
    if (!clip) return;

    const CUES = [
      [0.0, 0.0, 0.15, 0.23],
      [0.35, 0.43, 0.57, 0.65],
      [0.77, 0.85, 1.1, 1.2]
    ];
    const DRIFT = 22;

    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const smooth = (t: number) => t * t * (3 - 2 * t);
    const ramp = (p: number, a: number, b: number) => {
      if (b <= a) return p >= b ? 1 : 0;
      return smooth(clamp((p - a) / (b - a), 0, 1));
    };

    let progress = 0;
    let seekTo = 0;
    let seekAt = 0;
    let duration = 0;
    let ready = false;
    let started = false;
    let attached = false;
    let animId: number;

    const panels = containerRef.current
      ? [].slice.call(containerRef.current.querySelectorAll('[data-panel]')) as HTMLElement[]
      : [];

    const readScroll = () => {
      const scrollEl = containerRef.current;
      if (!scrollEl) return;
      const max = scrollEl.scrollHeight - scrollEl.clientHeight;
      progress = max > 0 ? clamp(scrollEl.scrollTop / max, 0, 1) : 0;
      if (duration) {
        seekTo = progress * duration;
      }
    };

    const paint = () => {
      if (meterRef.current) {
        meterRef.current.style.transform = `scaleX(${progress})`;
      }
      for (let i = 0; i < panels.length; i++) {
        const c = CUES[i];
        const el = panels[i];
        if (!el || !c) continue;
        const enter = ramp(progress, c[0], c[1]);
        const leave = ramp(progress, c[2], c[3]);
        const o = enter * (1 - leave);
        const y = (1 - enter) * DRIFT - leave * DRIFT;
        el.style.opacity = String(o);
        el.style.transform = `translate3d(0,${y}px,0)`;
        el.style.pointerEvents = o > 0.6 ? 'auto' : 'none';
      }
    };

    const frame = () => {
      if (ready && duration && clip) {
        const gap = seekTo - seekAt;
        if (Math.abs(gap) > 0.0008) {
          seekAt += gap * 0.115; // easing factor — turns a jumpy scrub into a smooth one
          if (clip.readyState >= 2 && !clip.seeking) {
            try {
              clip.currentTime = seekAt;
            } catch {}
          }
        }
      }
      paint();
      animId = requestAnimationFrame(frame);
    };

    const setProgress = (f: number) => {
      const pct = Math.round(f * 100);
      setLoadingPct(pct);
      if (bootBarRef.current) bootBarRef.current.style.transform = `scaleX(${f})`;
      if (bootPctRef.current) bootPctRef.current.textContent = `LOADING ${pct}%`;
    };

    const start = () => {
      if (started) return;
      started = true;
      ready = true;
      setIsReady(true);
      readScroll();
      seekAt = seekTo;
    };

    const attach = (src: string) => {
      if (attached) return;
      attached = true;
      clip.addEventListener('loadedmetadata', () => {
        duration = clip.duration || 0;
        clip.pause();
        readScroll();
        seekAt = seekTo;
        try {
          clip.currentTime = seekAt;
        } catch {}
      });
      clip.addEventListener('loadeddata', start);
      clip.addEventListener('canplaythrough', start);
      clip.addEventListener('error', start);

      clip.src = src;
      clip.load();
      setTimeout(start, 12000);
    };

    // Preload video as fully buffered blob for instant scrubbing
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const bail = setTimeout(() => {
      if (!attached) {
        if (controller) controller.abort();
        setProgress(1);
        attach(VIDEO_URL);
      }
    }, 15000);

    fetch(VIDEO_URL, controller ? { signal: controller.signal } : {})
      .then((res) => {
        if (!res.ok || !res.body) throw new Error('Fetch failed');
        const len = res.headers.get('content-length');
        const total = len ? parseInt(len, 10) : 0;
        const reader = res.body.getReader();
        const chunks: Uint8Array[] = [];
        let got = 0;

        const pump = (): Promise<Blob> => {
          return reader.read().then((r) => {
            if (r.done) {
              // Cast chunks to BlobPart array
              return new Blob(chunks as BlobPart[], { type: 'video/mp4' });
            }
            chunks.push(r.value);
            got += r.value.length;
            setProgress(total ? got / total : Math.min(got / 11e6, 0.95));
            return pump();
          });
        };
        return pump();
      })
      .then((blob) => {
        clearTimeout(bail);
        setProgress(1);
        attach(URL.createObjectURL(blob));
      })
      .catch(() => {
        clearTimeout(bail);
        setProgress(1);
        attach(VIDEO_URL);
      });

    // iOS play/pause unlock nudge
    const unlock = () => {
      const p = clip.play();
      if (p && p.then) {
        p.then(() => clip.pause()).catch(() => {});
      } else {
        clip.pause();
      }
    };
    ['touchstart', 'pointerdown', 'wheel', 'keydown'].forEach((ev) => {
      window.addEventListener(ev, unlock, { once: true, passive: true });
    });

    const scrollEl = containerRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', readScroll, { passive: true });
    }
    window.addEventListener('resize', readScroll);

    readScroll();
    paint();
    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(bail);
      if (controller) controller.abort();
      if (scrollEl) scrollEl.removeEventListener('scroll', readScroll);
      window.removeEventListener('resize', readScroll);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#f2f0ec] text-[#0d0c0b] font-inter-tight">
      {/* Preloader */}
      <div
        ref={bootRef}
        className={`fixed inset-0 z-[90] flex flex-col items-center justify-center gap-4 bg-[#f2f0ec] transition-opacity duration-700 ${
          isReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="w-[150px] h-[1px] bg-[#0d0c0b]/15 overflow-hidden">
          <i
            ref={bootBarRef}
            className="block h-full w-full bg-[#0d0c0b] origin-left"
            style={{ transform: `scaleX(${loadingPct / 100})` }}
          />
        </div>
        <p ref={bootPctRef} className="text-[12.5px] tracking-[0.05em] text-[#0d0c0b]/45 tabular-nums">
          LOADING {loadingPct}%
        </p>
      </div>

      {/* Close & External Links Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-gradient-to-b from-[#f2f0ec]/95 via-[#f2f0ec]/80 to-transparent">
        <div className="flex items-center gap-2 text-sm tracking-tight text-[#0d0c0b]">
          <span className="opacity-80">&#10037;</span>
          <span className="font-medium">Cast &amp; Render</span>
          <span className="text-[#0d0c0b]/40 text-xs hidden sm:inline-block">· 3D Flacon Sculpture Film</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/cast-and-render.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#0d0c0b]/70 hover:text-[#0d0c0b] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Standalone File</span>
          </a>

          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0d0c0b] text-[#ffffff] hover:bg-[#000000] transition-transform hover:scale-105"
            aria-label="Close 3D film viewer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hairline Scroll Meter */}
      <i
        ref={meterRef}
        className="fixed top-0 left-0 z-50 h-[2px] w-full bg-[#0d0c0b] opacity-55 origin-left"
        style={{ transform: 'scaleX(0)' }}
      />

      {/* Fixed Background Video Stage */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-[#f2f0ec] pointer-events-none">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 scale-[1.02] object-cover contrast-[1.02] will-change-transform"
        />
        {/* The Veil: 3-layer light wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to bottom, rgba(242,240,236,.62) 0%, rgba(242,240,236,.12) 22%, rgba(242,240,236,.12) 78%, rgba(242,240,236,.66) 100%),
              radial-gradient(100% 80% at 50% 48%, rgba(242,240,236,0) 0%, rgba(242,240,236,.34) 100%),
              rgba(242,240,236,.20)
            `
          }}
        />
        {/* Grain overlay */}
        <div
          className="absolute -inset-[50%] opacity-[0.13] mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/></filter><rect width='140' height='140' filter='url(%23n)' opacity='.5'/></svg>")`
          }}
        />
      </div>

      {/* Scrollable Container Container driving progress */}
      <div ref={containerRef} className="relative z-10 w-full h-full overflow-y-auto">
        {/* Panels Fixed Layer */}
        <div className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center">
          {/* Panel 1 */}
          <section
            data-panel
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 sm:px-12 py-24 opacity-0 will-change-transform"
          >
            <div className="flex items-center justify-center gap-2 text-[12.5px] tracking-[0.045em] text-[#0d0c0b]/65 mb-4">
              <span>Objects studio</span>
              <span>&middot;</span>
              <span>No. 112 Render Lane</span>
            </div>
            <h1 className="font-normal text-[34px] sm:text-[64px] lg:text-[96px] leading-[0.98] tracking-[-0.036em] max-w-[15ch]">
              Built at four.<br />Out by seven.
            </h1>
            <p className="mt-5 text-[15px] sm:text-[18px] leading-[1.5] tracking-[-0.008em] text-[#0d0c0b]/65 max-w-[46ch]">
              Six kinds of mesh, one render farm, and a queue that starts before the sun does.
            </p>
            <div className="mt-8 pointer-events-auto">
              <button
                onClick={() => {
                  const scrollEl = containerRef.current;
                  if (scrollEl) scrollEl.scrollTo({ top: scrollEl.clientHeight * 2, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-[#0a0908] text-[#ffffff] text-[15px] font-medium tracking-tight hover:-translate-y-0.5 hover:bg-black transition-all"
              >
                Scroll to scrub flacon
              </button>
            </div>
          </section>

          {/* Panel 2 */}
          <section
            data-panel
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 sm:px-12 py-24 opacity-0 will-change-transform"
          >
            <div className="flex items-center justify-center gap-2 text-[12.5px] tracking-[0.045em] text-[#0d0c0b]/65 mb-4">
              <span>Across the studio</span>
            </div>
            <h1 className="font-normal text-[34px] sm:text-[64px] lg:text-[96px] leading-[0.98] tracking-[-0.036em] max-w-[15ch]">
              Flat, never bent.
            </h1>
            <p className="mt-5 text-[15px] sm:text-[18px] leading-[1.5] tracking-[-0.008em] text-[#0d0c0b]/65 max-w-[46ch]">
              The mesh should still be clean when it reaches the viewport. We export to order, never before.
            </p>
            <div className="mt-8 pointer-events-auto">
              <button
                onClick={() => {
                  const scrollEl = containerRef.current;
                  if (scrollEl) scrollEl.scrollTo({ top: scrollEl.clientHeight * 4, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-[#0a0908] text-[#ffffff] text-[15px] font-medium tracking-tight hover:-translate-y-0.5 hover:bg-black transition-all"
              >
                Tour our space
              </button>
            </div>
          </section>

          {/* Panel 3 */}
          <section
            data-panel
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 sm:px-12 py-24 opacity-0 will-change-transform"
          >
            <div className="flex items-center justify-center gap-2 text-[12.5px] tracking-[0.045em] text-[#0d0c0b]/65 mb-4">
              <span>The surface</span>
            </div>
            <h1 className="font-normal text-[34px] sm:text-[64px] lg:text-[96px] leading-[0.98] tracking-[-0.036em] max-w-[15ch]">
              Smooth enough to<br />hold a light pass.
            </h1>
            <p className="mt-5 text-[15px] sm:text-[18px] leading-[1.5] tracking-[-0.008em] text-[#0d0c0b]/65 max-w-[46ch]">
              Custom surface shaders whipped every morning, spread to the edge and weighed by the quarter pound.
            </p>
            <div className="mt-8 pointer-events-auto">
              <button
                onClick={onClose}
                className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-[#0a0908] text-[#ffffff] text-[15px] font-medium tracking-tight hover:-translate-y-0.5 hover:bg-black transition-all"
              >
                Return to Fragrance House
              </button>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="fixed bottom-0 left-0 right-0 z-40 flex justify-center py-3.5 px-4 text-xs tracking-wider text-[#0d0c0b]/45 pointer-events-none bg-gradient-to-t from-[#f2f0ec]/90 via-[#f2f0ec]/70 to-transparent">
          112 Render Lane &nbsp;&middot;&nbsp; Tue–Sun, 9am till sold out
        </footer>

        {/* Track giving the height to scrub */}
        <div className="h-[560vh] min-h-[3200px]" />
      </div>
    </div>
  );
};
