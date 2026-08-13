"use client";

import { ArrowUpRight, Play } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type HeroVideoProps = {
  onReserve?: () => void;
};

/** Full-screen entrance gate and scroll-bound cinematic hero. */
export default function HeroVideo({ onReserve }: HeroVideoProps) {
  const wrapperRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const primaryCopyRef = useRef<HTMLDivElement>(null);
  const secondaryCopyRef = useRef<HTMLDivElement>(null);
  const gsapContextRef = useRef<gsap.Context | null>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const copyTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const targetTimeRef = useRef(0);
  const seekFrameRef = useRef<number | null>(null);
  const [entered, setEntered] = useState(false);

  const flushSeek = useCallback(() => {
    if (seekFrameRef.current !== null) return;
    seekFrameRef.current = requestAnimationFrame(() => {
      seekFrameRef.current = null;
      const video = videoRef.current;
      if (!video || video.seeking || !Number.isFinite(video.duration) || video.duration <= 0) return;
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.01) video.currentTime = targetTimeRef.current;
    });
  }, []);

  useEffect(() => {
    if (!entered) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
    document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [entered]);

  const initializeScrollTrigger = useCallback((video: HTMLVideoElement) => {
    const wrapper = wrapperRef.current;
    const pin = pinRef.current;
    if (!wrapper || !pin || !Number.isFinite(video.duration) || video.duration <= 0) return;

    triggerRef.current?.kill();
    gsapContextRef.current?.revert();
    copyTimelineRef.current = null;
    video.pause();
    video.currentTime = 0;

    gsapContextRef.current = gsap.context(() => {
      const primary = primaryCopyRef.current;
      const secondary = secondaryCopyRef.current;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mobile = window.matchMedia("(max-width: 640px)").matches;

      if (primary && secondary) {
        if (reduceMotion) {
          gsap.set(primary, { clearProps: "all" });
          gsap.set(secondary, { autoAlpha: 0 });
        } else {
          const distance = mobile ? 0.65 : 1;
          const openingEnd = mobile ? 0.2 : 0.25;
          const exitDuration = mobile ? 0.3 : 0.3;
          const secondStart = mobile ? 0.44 : 0.45;
          const secondDuration = mobile ? 0.32 : 0.35;
          const settleStart = mobile ? 0.8 : 0.8;
          const eyebrow = primary.querySelector<HTMLElement>(".kicker");
          const heading = primary.querySelector<HTMLElement>("h1");
          const description = primary.querySelector<HTMLElement>(".hero-video-description");
          const actions = primary.querySelector<HTMLElement>(".hero-video-actions");

          gsap.set(secondary, { autoAlpha: 0, y: 40 * distance, scale: 0.98 });
          copyTimelineRef.current = gsap.timeline({ paused: true, defaults: { ease: "none" } })
            .to(eyebrow, { y: -8 * distance, opacity: 0.98, duration: openingEnd }, 0)
            .to(heading, { y: -15 * distance, opacity: 0.99, scale: 0.995, duration: openingEnd }, 0)
            .to(description, { y: -10 * distance, opacity: 0.98, duration: openingEnd }, 0)
            .to(actions, { y: -5 * distance, opacity: 0.98, duration: openingEnd }, 0)
            .to(eyebrow, { y: -38 * distance, autoAlpha: 0, duration: exitDuration }, openingEnd)
            .to(heading, { y: -60 * distance, autoAlpha: 0, scale: 0.96, duration: exitDuration }, openingEnd)
            .to(description, { y: -30 * distance, autoAlpha: 0, duration: exitDuration }, openingEnd)
            .to(actions, { y: -20 * distance, autoAlpha: 0, duration: exitDuration }, openingEnd)
            .set(primary, { pointerEvents: "none" }, openingEnd + exitDuration)
            .to(secondary, { autoAlpha: 1, y: 0, scale: 1, duration: secondDuration }, secondStart)
            .to(secondary, { y: -4 * distance, duration: 0.2 }, settleStart);
        }
      }

      triggerRef.current = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: () => mobile ? `+=${Math.round(window.innerHeight * 1.15)}` : "+=3000",
        pin,
        pinSpacing: true,
        scrub: mobile ? 0.6 : 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const currentVideo = videoRef.current;
          if (!currentVideo || !Number.isFinite(currentVideo.duration) || currentVideo.duration <= 0) return;
          targetTimeRef.current = self.progress * currentVideo.duration;
          copyTimelineRef.current?.progress(self.progress);
          flushSeek();
        },
      });
    }, wrapper);

    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [flushSeek]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const initialize = () => initializeScrollTrigger(video);
    const continueSeeking = () => flushSeek();
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA && Number.isFinite(video.duration) && video.duration > 0) {
      initialize();
    } else {
      video.addEventListener("loadedmetadata", initialize, { once: true });
    }
    video.addEventListener("seeked", continueSeeking);

    return () => {
      video.removeEventListener("loadedmetadata", initialize);
      video.removeEventListener("seeked", continueSeeking);
      triggerRef.current?.kill();
      triggerRef.current = null;
      copyTimelineRef.current = null;
      gsapContextRef.current?.revert();
      gsapContextRef.current = null;
      if (seekFrameRef.current !== null) cancelAnimationFrame(seekFrameRef.current);
      seekFrameRef.current = null;
    };
  }, [flushSeek, initializeScrollTrigger]);

  const enter = () => {
    setEntered(true);
    videoRef.current?.focus({ preventScroll: true });
    window.setTimeout(() => ScrollTrigger.refresh(), 750);
  };

  return (
    <section ref={wrapperRef} className="hero-video-scroll" aria-label="Karachi Brasserie cinematic introduction">
      <div ref={pinRef} className="hero-video">
      <video
        ref={videoRef}
        className="hero-video-media"
        src="/videos/hero-scroll.mp4"
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
        aria-label="Cinematic view of Karachi Brasserie"
        onLoadedMetadata={(event) => initializeScrollTrigger(event.currentTarget)}
      >
        Your browser does not support the cinematic video.
      </video>
      <div className="hero-video-shade" aria-hidden="true" />
      <div ref={primaryCopyRef} className="hero-video-copy hero-video-copy-primary">
        <p className="kicker">ALL DAY EATERY · HOTEL EXCELSIOR</p>
        <h1>Karachi&apos;s <em>premier</em> all-day eatery.</h1>
        <p className="hero-video-description">Artisanal coffee, generous plates, and evenings worth lingering over.</p>
        <div className="hero-video-actions">
          <button type="button" className="gold-button" onClick={onReserve}>Book a table <ArrowUpRight size={16} /></button>
          <a className="text-button" href="#menu">Explore the menu <ArrowUpRight size={15} /></a>
        </div>
      </div>
      <div ref={secondaryCopyRef} className="hero-video-copy hero-video-copy-secondary">
        <p className="kicker">COME FOR THE COFFEE</p>
        <h1>Stay for <em>the story.</em></h1>
        <p className="hero-video-description">Good food, warm hospitality, and a table worth lingering at.</p>
      </div>
      <AnimatePresence>
        {!entered && (
          <motion.div className="hero-video-gate" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55, delay: 0.16 }}>
            <motion.div className="hero-video-door hero-video-door-left" initial={{ x: 0 }} exit={{ x: "-100%" }} transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }} />
            <motion.div className="hero-video-door hero-video-door-right" initial={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }} />
            <motion.button type="button" className="hero-video-enter" onClick={enter} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }}>
              <span><Play size={15} fill="currentColor" /> Enter the brasserie</span>
              <small>Scroll to experience</small>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </section>
  );
}
