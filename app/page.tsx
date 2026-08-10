"use client";

import * as Tabs from "@radix-ui/react-tabs";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, MapPin, Clock3, Star, X, MessageCircle } from "lucide-react";
import { RiFacebookFill, RiInstagramLine } from "react-icons/ri";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const dishes = [
  ["eggs", "Brasserie Special Eggs Benedict", "Poached eggs, smoked turkey, hollandaise on sourdough.", "PKR 1,450", "All Day Breakfast"],
  ["avocado", "Smashed Avocado Toast", "Fresh avocado, feta, chili flakes, sourdough.", "PKR 1,250", "All Day Breakfast"],
  ["burger", "Truffle Parmesan Burger", "Smash beef, truffle mayo, aged cheddar, brioche.", "PKR 1,650", "Gourmet Burgers"],
  ["pasta", "Creamy Tuscan Chicken Pasta", "Fettuccine, sundried tomatoes, spinach, parmesan.", "PKR 1,750", "Pasta & Mains"],
  ["coffee", "Signature Iced Spanish Latte", "Espresso, condensed milk, chilled milk.", "PKR 850", "Coffee & Desserts"],
];
const tabs = ["All", "All Day Breakfast", "Gourmet Burgers", "Pasta & Mains", "Coffee & Desserts"];

function MagneticButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 }), sy = useSpring(y, { stiffness: 300, damping: 20 });
  return <motion.button style={{ x: sx, y: sy }} onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * .12); y.set((e.clientY - r.top - r.height / 2) * .12); }} onMouseLeave={() => { x.set(0); y.set(0); }} onClick={onClick} className="magnetic">{children}</motion.button>;
}

function Reservation({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const submit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); const d = new FormData(e.currentTarget); const msg = `Hi Karachi Brasserie, I'd like to reserve a table.%0AName: ${d.get("name")}%0AGuests: ${d.get("guests")}%0ADate: ${d.get("date")}%0ATime: ${d.get("time")}`; window.open(`https://wa.me/923308880773?text=${msg}`, "_blank"); };
  return <Dialog.Root open={open} onOpenChange={setOpen}><Dialog.Portal><Dialog.Overlay className="overlay" /><Dialog.Content data-lenis-prevent data-lenis-prevent-wheel className="dialog"><Dialog.Close className="dialog-close" aria-label="Close"><X size={18} /></Dialog.Close><p className="kicker">MAKE IT A DATE</p><Dialog.Title>Reserve a table</Dialog.Title><p>Leave the details, we&apos;ll confirm on WhatsApp.</p><form onSubmit={submit}><label>Name<input name="name" required placeholder="Your name" /></label><div className="two"><label>Guests<select name="guests" defaultValue="2"><option>1</option><option>2</option><option>3</option><option>4+</option></select></label><label>Date<input name="date" type="date" required /></label></div><label>Time<select name="time" defaultValue="8:00 PM"><option>8:00 AM</option><option>12:00 PM</option><option>4:00 PM</option><option>8:00 PM</option><option>10:00 PM</option></select></label><label>Special requests<textarea name="requests" placeholder="Optional" /></label><button className="gold-button full" type="submit">Continue on WhatsApp <ArrowUpRight size={15} /></button></form></Dialog.Content></Dialog.Portal></Dialog.Root>;
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return <motion.a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} whileHover={{ scale: 1.1, color: "#D4AF37" }} whileTap={{ scale: .96 }} transition={{ type: "spring", stiffness: 420, damping: 24 }}>{children}</motion.a>;
}

function ReelCard({ src, poster, views }: { src: string; poster: string; views: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const play = () => videoRef.current?.play().catch(() => undefined);
  const stop = () => { if (!videoRef.current) return; videoRef.current.pause(); videoRef.current.currentTime = 0; };
  return <motion.article className="reel-card" whileHover={{ scale: 1.035 }} transition={{ type: "spring", stiffness: 320, damping: 24 }} onMouseEnter={play} onMouseLeave={stop}><video ref={videoRef} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={`Karachi Brasserie Instagram reel with ${views} views`} /><motion.div className="reel-overlay" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: .2 }}><RiInstagramLine size={24} /><span>{views} views</span></motion.div></motion.article>;
}

function SocialProof() {
  return <section className="social-proof reveal" aria-labelledby="social-proof-title"><p className="kicker">FROM OUR TABLES</p><h2 id="social-proof-title">Loved by 10,000+ Foodies.</h2><div className="reels-grid"><ReelCard src="/videos/video-1.mp4" poster="/images/dish.jpg" views="18.4K" /><ReelCard src="/videos/video-2.mp4" poster="/images/cofee.jpg" views="24.7K" /><ReelCard src="/videos/video-3.mp4" poster="/images/sendwich.jpg" views="12.9K" /><ReelCard src="/videos/video-4.mp4" poster="/images/Pepperoni-pizza.jpg" views="21.3K" /></div></section>;
}

export default function Home() {
  const hero = useRef<HTMLElement>(null); const [active, setActive] = useState("All"); const [open, setOpen] = useState(false);
  useEffect(() => { const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches; const lenis = new Lenis({ lerp: reduce ? 1 : .14, smoothWheel: !reduce, wheelMultiplier: 1.1 }); lenis.on("scroll", ScrollTrigger.update); const tick = (time: number) => lenis.raf(time * 1000); gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0); const ctx = gsap.context(() => { if (reduce) return; gsap.from(".hero-copy h1", { y: 50, opacity: 0, clipPath: "inset(0 0 100% 0)", duration: .78, ease: "power4.out" }); gsap.from(".hero-copy > *:not(h1)", { y: 16, opacity: 0, duration: .46, stagger: .06, delay: .12, ease: "power3.out" }); gsap.to(".hero-photo", { yPercent: 8, ease: "none", scrollTrigger: { trigger: hero.current, start: "top top", end: "bottom top", scrub: .25 } }); gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => gsap.from(el, { y: 20, opacity: 0, duration: .46, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%" } })); gsap.utils.toArray<HTMLElement>("h2").forEach((el) => gsap.from(el, { y: 42, opacity: 0, clipPath: "inset(0 0 100% 0)", duration: .66, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 91%" } })); gsap.utils.toArray<HTMLElement>(".intro-new > p:last-child, .menu-head > p:last-child, .experience-copy > p, .visit-meta").forEach((el) => gsap.from(el, { y: 15, opacity: 0, duration: .45, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 93%" } })); }, hero); return () => { ctx.revert(); gsap.ticker.remove(tick); lenis.destroy(); }; }, []);
  const visible = active === "All" ? dishes : dishes.filter((d) => d[4] === active);
  return <div className="site-shell"><header className="topbar"><a className="brand" href="#top"><span>KB</span><b>KARACHI<br /><i>BRASSERIE</i></b></a><nav><a href="#menu">Menu</a><a href="#story">The brasserie</a><a href="#visit">Visit</a></nav><button className="nav-reserve" onClick={() => setOpen(true)}>Reserve <ArrowUpRight size={14} /></button></header>
    <main id="top"><section ref={hero} className="hero-new"><div className="hero-copy"><p className="kicker">ALL DAY EATERY · HOTEL EXCELSIOR</p><h1>Karachi&apos;s<br /><em>premier</em><br />all-day eatery.</h1><p className="hero-lede">Artisanal coffee, generous plates, and evenings worth lingering over.</p><div className="hero-ctas"><MagneticButton onClick={() => document.getElementById("menu")?.scrollIntoView()}><span>Explore the menu</span><ArrowUpRight size={16} /></MagneticButton><button className="text-button" onClick={() => setOpen(true)}>Reserve a table <ArrowUpRight size={15} /></button></div><div className="review"><Star size={14} fill="currentColor" /><strong>4.5</strong><span>Google Reviews</span></div></div><div className="hero-visual"><div className="hero-photo" /><div className="hero-note">Breakfast<br />until midnight</div><div className="hero-coordinates">24°51&apos; N<br />67°01&apos; E</div></div></section>
      <section className="intro-new reveal" id="story"><p className="kicker">THE BRASSERIE WAY</p><h2>Come for the coffee.<br /><em>Stay for the story.</em></h2><p>Set inside Karachi&apos;s historic Hotel Excelsior, we bring a little European ease to the heart of Saddar.</p></section>
      <section className="menu-new reveal" id="menu"><div className="menu-head"><div><p className="kicker">THE GOOD STUFF</p><h2>The menu</h2></div><p>From first coffee to late-night plates.</p></div><Tabs.Root value={active} onValueChange={setActive}><Tabs.List className="tab-list" aria-label="Menu categories">{tabs.map((t) => <Tabs.Trigger key={t} value={t} className="tab-trigger">{t}</Tabs.Trigger>)}</Tabs.List><Tabs.Content value={active} className="dish-grid">{visible.map((d) => <article className="dish-row" key={d[1]}><div className={`dish-thumb ${d[0]}`} /><div><p className="dish-category">{d[4]}</p><h3>{d[1]}</h3><p>{d[2]}</p></div><strong>{d[3]}</strong></article>)}</Tabs.Content></Tabs.Root></section>
      <section className="experience reveal"><div className="experience-image" /><div className="experience-copy"><p className="kicker">A PLACE TO RETURN TO</p><h2>Good food.<br /><em>Good company.</em></h2><p>Indoor tables, open-air corners, and a bar that knows your order. Dine in, take away, or message us directly.</p><a className="text-button" href="https://wa.me/923308880773" target="_blank" rel="noopener noreferrer">Order on WhatsApp <ArrowUpRight size={15} /></a></div></section>
      <section className="visit-new reveal" id="visit"><div className="visit-copy"><p className="kicker">COME SAY HELLO</p><h2>Find us in<br /><em>the heart of it.</em></h2><div className="visit-meta"><p><MapPin size={15} /> Hotel Excelsior, Opposite Atrium Mall<br />Saddar, Karachi</p><p><Clock3 size={15} /> Open daily<br />8:00 AM - 12:00 AM</p></div></div><div className="map-frame"><iframe title="Karachi Brasserie location" src="https://www.google.com/maps?q=Hotel%20Excelsior%20Karachi&output=embed" loading="lazy" /></div></section><SocialProof /></main>
    <footer className="footer-new"><a className="brand" href="#top"><span>KB</span><b>KARACHI<br /><i>BRASSERIE</i></b></a><p>Hotel Excelsior, Saddar, Karachi<br /><a href="tel:+923308880773">+92 330 8880773</a></p><div><SocialLink href="https://www.instagram.com/karachibrasserie/" label="Instagram"><RiInstagramLine size={20} /></SocialLink><SocialLink href="https://www.facebook.com/karachibrasserie/" label="Facebook"><RiFacebookFill size={20} /></SocialLink></div><small>© 2024 Karachi Brasserie</small></footer><a className="whatsapp-fab" href="https://wa.me/923308880773" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={23} /></a><Reservation open={open} setOpen={setOpen} /></div>;
}
