Act as an Elite Design Engineer (following the principles of Emil Kowalski's @emil-design-eng skill) and a UI/UX visionary (applying the aesthetic sensibilities of @Leonxlnx/taste-skill). 

Your task is to build a breathtaking, ultra-premium, and highly animated demo website for a high-end restaurant named "Karachi Brasserie". The goal is to create a digital experience that feels like a luxury brand, completely free of paid component libraries.

### 🛠️ TECH STACK & ANIMATION LIBRARIES
1. Framework: Next.js 14+ (App Router, TypeScript).
2. Styling: Tailwind CSS.
3. Smooth Scrolling: Integrate `@studio-freight/lenis` for buttery smooth page scrolling.
4. Scroll Animations: Use `gsap` and `ScrollTrigger` for parallax hero effects, text-reveal on scroll, and staggered list animations.
5. Micro-interactions: Use `framer-motion` (with custom spring physics: mass, damping, stiffness).
6. UI Components: Implement `shadcn/ui` and `Radix UI Primitives`.
7. Icons: `lucide-react`.
8. Maps: Google Maps iframe embed for the location section.

### 📸 IMAGES & ASSETS SETUP (CRITICAL)
The final website will use real images scraped from the restaurant's Google Maps and Facebook pages. 
- Please set up Next.js `<Image />` components with clean local paths (e.g., `/images/hero-bg.jpg`, `/images/item-burger.jpg`, `/images/item-coffee.jpg`, `/images/ambience.jpg`).
- Add aesthetic image reveal animations (e.g., GSAP clip-path reveals or Framer Motion blur-to-clear effects).
- Ensure all image containers have modern treatments: rounded corners (where appropriate), subtle overlays for text readability, and `object-cover` so the real images look stunning regardless of their original aspect ratio.
- (Optional for you during coding: Use high-quality Unsplash URLs for food/restaurant interiors as temporary placeholders so the demo looks complete before I swap in the real local files).

### 🎨 DESIGN & "TASTE" PRINCIPLES
- Typography: Elegant, high-contrast typography (modern Serif for headings, clean Sans-serif for body). 
- Spacing & Layout: Impeccable whitespace, fluid grid layouts, and pixel-perfect alignment.
- Color Palette: Charcoal Dark (#131313) background, Warm Champagne Gold (#D4AF37) accents, and Off-White (#F9F9F6) text.
- Polish: Add subtle noise textures, glassmorphism (backdrop-blur), and custom cursors if possible.

### 🏢 BUSINESS DATA (Karachi Brasserie)
- Location: Hotel Excelsior, Opposite Atrium Mall, Saddar, Karachi.
- Rating: 4.5 Stars.
- Vibe: Premium all-day continental eatery.
- Phone: +92 330 8880773 (Link to WhatsApp).

### 📐 REQUIRED SECTIONS & BEHAVIORS

1. 🪄 The Hero Section (GSAP + Framer Motion)
- Full-screen immersive section with a dark overlay on the hero image (`/images/hero-bg.jpg`).
- Text reveal animation on load.
- Title: "Karachi's Premier All-Day Eatery."
- Subtitle: "Artisanal coffee, gourmet breakfast, and exquisite dining."
- Magnetic Call-to-Action button using Framer Motion.
- Parallax background image effect on scroll.

2. 📜 The Digital Menu (Radix UI Tabs + Framer Motion)
- Use Radix UI Tabs for filterable categories. 
- Include space for small thumbnail images next to premium items.
- Menu Items: Eggs Benedict (PKR 1,450), Smashed Avocado Toast (PKR 1,250), Truffle Parmesan Burger (PKR 1,650), Tuscan Chicken Pasta (PKR 1,750), Signature Iced Spanish Latte (PKR 850).

3. 💬 Floating WhatsApp Booking (Radix UI Dialog / Shadcn Drawer)
- Sticky WhatsApp icon linking to a booking modal.
- Submit button redirects to `https://wa.me/923308880773`.

4. 🗺️ Footer & Location (GSAP + Google Maps)
- Fade-in animation.
- Embed a dark-themed Google Maps iframe.
- Address, hours, and social icons.

Please generate the complete Next.js code (`app/page.tsx`, layout, and necessary components). Handle Lenis initialization correctly and wrap GSAP triggers properly.