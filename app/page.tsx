"use client";

import * as Tabs from "@radix-ui/react-tabs";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, MapPin, Clock3, X, MessageCircle, Menu, Play, Pause } from "lucide-react";
import { RiFacebookFill, RiInstagramLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";
import HeroVideo from "./components/HeroVideo";

gsap.registerPlugin(ScrollTrigger);

const dishes = [
  ["eggs", "Brasserie Special Eggs Benedict", "Poached eggs, smoked turkey, hollandaise on sourdough.", "PKR 1,450", "All Day Breakfast", "/images/dish.jpg"],
  ["avocado", "Smashed Avocado Toast", "Fresh avocado, feta, chili flakes, sourdough.", "PKR 1,250", "All Day Breakfast", "/images/sendwich.jpg"],
  ["burger", "Truffle Parmesan Burger", "Smash beef, truffle mayo, aged cheddar, brioche.", "PKR 1,650", "Gourmet Burgers", "/images/sendwich.jpg"],
  ["pasta", "Creamy Tuscan Chicken Pasta", "Fettuccine, sundried tomatoes, spinach, parmesan.", "PKR 1,750", "Pasta & Mains", "/images/Pepperoni-pizza.jpg"],
  ["coffee", "Signature Iced Spanish Latte", "Espresso, condensed milk, chilled milk.", "PKR 850", "Coffee & Desserts", "/images/cofee.jpg"],
];
const tabs = ["All", "All Day Breakfast", "Gourmet Burgers", "Pasta & Mains", "Coffee & Desserts"];

function Reservation({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [error, setError] = useState("");
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const name = String(d.get("name") || "").trim();
    const guests = String(d.get("guests") || "").trim();
    const date = String(d.get("date") || "").trim();
    const time = String(d.get("time") || "").trim();
    const requests = String(d.get("requests") || "").trim();
    if (!name || !guests || !date || !time) { setError("Please complete the required details."); return; }
    setError("");
    const message = [`Hi Karachi Brasserie, I'd like to reserve a table.`, `Name: ${name}`, `Guests: ${guests}`, `Date: ${date}`, `Time: ${time}`, requests ? `Special requests: ${requests}` : ""].filter(Boolean).join("\n");
    window.open(`https://wa.me/923308880773?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };
  return <Dialog.Root open={open} onOpenChange={(value) => { setOpen(value); if (!value) setError(""); }}><Dialog.Portal><Dialog.Overlay className="overlay" /><Dialog.Content data-lenis-prevent data-lenis-prevent-wheel className="dialog" aria-describedby="reservation-description"><Dialog.Close className="dialog-close" aria-label="Close reservation form"><X size={18} /></Dialog.Close><p className="kicker">MAKE IT A DATE</p><Dialog.Title>Reserve a table</Dialog.Title><p id="reservation-description">Leave the details, we&apos;ll confirm on WhatsApp.</p><form onSubmit={submit} noValidate><label>Name<input name="name" required autoComplete="name" aria-required="true" placeholder="Your name" /></label><div className="two"><label>Guests<select name="guests" required defaultValue="2" aria-required="true"><option>1</option><option>2</option><option>3</option><option>4+</option></select></label><label>Date<input name="date" type="date" required aria-required="true" /></label></div><label>Time<select name="time" required defaultValue="8:00 PM" aria-required="true"><option>8:00 AM</option><option>12:00 PM</option><option>4:00 PM</option><option>8:00 PM</option><option>10:00 PM</option></select></label><label>Special requests<textarea name="requests" placeholder="Optional" /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="gold-button full" type="submit">Continue on WhatsApp <ArrowUpRight size={15} /></button></form></Dialog.Content></Dialog.Portal></Dialog.Root>;
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return <motion.a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} whileHover={{ scale: 1.1, color: "#D4AF37" }} whileTap={{ scale: .96 }} transition={{ type: "spring", stiffness: 420, damping: 24 }}>{children}</motion.a>;
}

function Brand({ priority = false }: { priority?: boolean }) {
  return <a className="brand" href="#top" aria-label="Karachi Brasserie home"><Image src="/images/logo-kb.png" alt="" width={44} height={44} quality={80} priority={priority} loading={priority ? "eager" : "lazy"} className="brand-logo" /><b>KARACHI<br /><i>BRASSERIE</i></b></a>;
}

function ReelCard({ src, label }: { src: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const play = () => videoRef.current?.play().then(() => setPlaying(true)).catch(() => undefined);
  const stop = (reset = false) => { if (!videoRef.current) return; videoRef.current.pause(); if (reset) videoRef.current.currentTime = 0; setPlaying(false); };
  const toggle = () => playing ? stop() : play();
  return <motion.button type="button" className={`reel-card${playing ? " is-playing" : ""}`} aria-label={`${playing ? "Pause" : "Play"} ${label}`} aria-pressed={playing} whileHover={{ scale: 1.035 }} transition={{ type: "spring", stiffness: 320, damping: 24 }} onClick={toggle} onMouseEnter={play} onMouseLeave={() => stop(true)}><video ref={videoRef} src={src} muted loop playsInline preload="metadata" aria-hidden="true" /><div className="reel-overlay"><RiInstagramLine size={24} /><span>{playing ? "Pause reel" : "Play reel"}</span>{playing ? <Pause size={17} /> : <Play size={17} fill="currentColor" />}</div></motion.button>;
}

function SocialProof() {
  return <section className="social-proof reveal" aria-labelledby="social-proof-title"><p className="kicker">FROM OUR TABLES</p><h2 id="social-proof-title">A taste of Karachi Brasserie.</h2><div className="reels-grid"><ReelCard src="/videos/video-1.mp4" label="Karachi Brasserie reel one" /><ReelCard src="/videos/video-2.mp4" label="Karachi Brasserie reel two" /><ReelCard src="/videos/video-3.mp4" label="Karachi Brasserie reel three" /><ReelCard src="/videos/video-4.mp4" label="Karachi Brasserie reel four" /></div></section>;
}

function ReservationMoment({ onReserve }: { onReserve: () => void }) {
  return <section className="reservation-moment reveal"><div className="reservation-moment-image"><Image src="/images/CTA-bg.jpg" alt="Karachi Brasserie dining interior" fill quality={80} sizes="100vw" className="cover-image" /></div><div className="reservation-moment-copy"><p className="kicker">MAKE IT A DATE</p><h2>Your table is waiting.</h2><p>Good food tastes better when shared.</p><button className="gold-button" onClick={onReserve}>Reserve a table <ArrowUpRight size={16} /></button></div></section>;
}

export default function Home() {
  const [active, setActive] = useState("All"); const [open, setOpen] = useState(false); const [mobileOpen, setMobileOpen] = useState(false); const [footerVisible, setFooterVisible] = useState(false); const footerRef = useRef<HTMLElement>(null);
  useEffect(() => { if (!mobileOpen) return; const previousOverflow = document.body.style.overflow; document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = previousOverflow; }; }, [mobileOpen]);
  useEffect(() => { const footer = footerRef.current; if (!footer) return; const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), { threshold: .04 }); observer.observe(footer); return () => observer.disconnect(); }, []);
  useEffect(() => { const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches; const lenis = new Lenis({ lerp: reduce ? 1 : .14, smoothWheel: !reduce, wheelMultiplier: 1.1 }); lenis.on("scroll", ScrollTrigger.update); const tick = (time: number) => lenis.raf(time * 1000); gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0); const ctx = gsap.context(() => { if (reduce) return; gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => gsap.from(el, { y: 20, opacity: 0, duration: .46, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%" } })); gsap.utils.toArray<HTMLElement>("h2").forEach((el) => gsap.from(el, { y: 42, opacity: 0, clipPath: "inset(0 0 100% 0)", duration: .66, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 91%" } })); gsap.utils.toArray<HTMLElement>(".intro-new > p:last-child, .menu-head > p:last-child, .experience-copy > p, .visit-meta").forEach((el) => gsap.from(el, { y: 15, opacity: 0, duration: .45, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 93%" } })); }); return () => { ctx.revert(); gsap.ticker.remove(tick); lenis.destroy(); }; }, []);
  const visible = active === "All" ? dishes : dishes.filter((d) => d[4] === active);
  return <div className="site-shell"><header className={`topbar${footerVisible ? " topbar-hidden" : ""}`}><Brand priority /><nav aria-label="Primary navigation"><a href="#menu">Menu</a><a href="#story">The brasserie</a><a href="#social-proof-title">Gallery</a><a href="#visit">Visit</a></nav><button className="menu-toggle" aria-label="Open navigation" aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen(true)}><Menu size={20} /></button><button className="nav-reserve" onClick={() => setOpen(true)}>Book a table <ArrowUpRight size={14} /></button></header><Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}><Dialog.Portal><Dialog.Content id="mobile-navigation" className="mobile-nav" aria-describedby={undefined}><Dialog.Title className="sr-only">Navigation</Dialog.Title><Dialog.Close className="mobile-nav-close" aria-label="Close navigation"><X size={22} /></Dialog.Close><a href="#top" onClick={() => setMobileOpen(false)}>Home</a><a href="#menu" onClick={() => setMobileOpen(false)}>Menu</a><a href="#story" onClick={() => setMobileOpen(false)}>Our story</a><a href="#social-proof-title" onClick={() => setMobileOpen(false)}>Gallery</a><a href="#visit" onClick={() => setMobileOpen(false)}>Location</a><button className="gold-button" onClick={() => { setMobileOpen(false); setOpen(true); }}>Book a table <ArrowUpRight size={15} /></button></Dialog.Content></Dialog.Portal></Dialog.Root>
    <main id="top"><HeroVideo onReserve={() => setOpen(true)} />
      <section className="intro-new reveal" id="story"><p className="kicker">THE BRASSERIE WAY</p><h2>Come for the coffee.<br /><em>Stay for the story.</em></h2><p>Set inside Karachi&apos;s historic Hotel Excelsior, we bring a little European ease to the heart of Saddar.</p></section>
      <section className="menu-new reveal" id="menu"><div className="menu-head"><div><p className="kicker">THE GOOD STUFF</p><h2>The menu</h2></div><p>From first coffee to late-night plates.</p></div><Tabs.Root value={active} onValueChange={setActive}><Tabs.List className="tab-list" aria-label="Menu categories">{tabs.map((t) => <Tabs.Trigger key={t} value={t} className="tab-trigger">{t}</Tabs.Trigger>)}</Tabs.List><Tabs.Content value={active} className="dish-grid">{visible.map((d) => <article className="dish-row" key={d[1]}><div className={`dish-thumb ${d[0]}`}><Image src={d[5]} alt={d[1]} fill quality={80} sizes="(max-width: 850px) 126px, 168px" className="cover-image" /></div><div><p className="dish-category">{d[4]}</p><h3>{d[1]}</h3><p>{d[2]}</p></div><strong>{d[3]}</strong></article>)}</Tabs.Content></Tabs.Root></section>
      <section className="experience reveal"><div className="experience-image"><Image src="/images/outside.jpg" alt="Karachi Brasserie storefront at Hotel Excelsior" fill quality={80} sizes="(max-width: 850px) 100vw, 60vw" className="cover-image" /></div><div className="experience-copy"><p className="kicker">A PLACE TO RETURN TO</p><h2>Good food.<br /><em>Good company.</em></h2><p>Indoor tables, open-air corners, and a bar that knows your order. Dine in, take away, or message us directly.</p><a className="text-button" href="https://wa.me/923308880773" target="_blank" rel="noopener noreferrer">Order on WhatsApp <ArrowUpRight size={15} /></a></div></section>
      <section className="visit-new reveal" id="visit"><div className="visit-copy"><p className="kicker">FIND US</p><h2>Find us in<br /><em>the heart of it.</em></h2><p className="visit-description">A calm corner in the middle of Saddar, made for coffee, dinner, and everything between.</p><div className="visit-meta"><p><MapPin size={15} /> Hotel Excelsior, Opposite Atrium Mall<br />Saddar, Karachi</p><p><Clock3 size={15} /> Open daily<br />8:00 AM - 12:00 AM</p></div><a className="directions-link" href="https://maps.google.com/?q=Hotel+Excelsior+Karachi" target="_blank" rel="noopener noreferrer">Get directions <ArrowUpRight size={15} /></a></div><div className="map-frame"><iframe title="Karachi Brasserie location" src="https://www.google.com/maps?q=Hotel%20Excelsior%20Karachi&output=embed" loading="lazy" /></div></section><SocialProof /><ReservationMoment onReserve={() => setOpen(true)} /></main>
    <footer ref={footerRef} className="footer-new"><div className="footer-brand"><Brand /><p>All day coffee, plates, and good company in the heart of Saddar.</p></div><div className="footer-column"><p className="footer-label">EXPLORE</p><a href="#top">Home</a><a href="#menu">Menu</a><a href="#story">Our story</a><a href="#social-proof-title">Gallery</a><a href="#visit">Location</a></div><div className="footer-column"><p className="footer-label">VISIT</p><span>Hotel Excelsior, Opposite Atrium Mall<br />Saddar, Karachi</span><span>Open daily<br />8:00 AM - 12:00 AM</span><a href="tel:+923308880773">+92 330 8880773</a></div><div className="footer-column footer-follow"><p className="footer-label">FOLLOW</p><SocialLink href="https://www.instagram.com/karachibrasserie/" label="Instagram"><RiInstagramLine size={18} /> Instagram</SocialLink><SocialLink href="https://www.facebook.com/karachibrasserie/" label="Facebook"><RiFacebookFill size={18} /> Facebook</SocialLink><a href="https://wa.me/923308880773" target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> WhatsApp</a></div><small>© {new Date().getFullYear()} Karachi Brasserie</small></footer><a className="whatsapp-fab" href="https://wa.me/923308880773" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={23} /></a><Reservation open={open} setOpen={setOpen} /></div>;
}
