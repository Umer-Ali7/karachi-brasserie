Act as an expert Next.js developer and UI/UX designer. Build a modern, high-converting, mobile-first demo website for a premium restaurant named "Karachi Brasserie". 

Here is the complete scraped brand data and specifications to build the site:

---
### 1. BRAND & BUSINESS OVERVIEW
* Business Name: Karachi Brasserie (All Day Eatery)
* Location: Hotel Excelsior, Opposite Atrium Mall, Saddar, Karachi, Sindh, Pakistan
* Rating: 4.5 Stars (Google Reviews)
* Contact Phone / WhatsApp: +92 330 8880773
* Operating Hours: 8:00 AM – 12:00 AM (Daily)
* Vibe & Ambience: Modern continental brass-style eatery, aesthetic indoor/outdoor seating, high-end colonial building facade.

---
### 2. CORE FEATURES TO IMPLEMENT
1. Hero Section:
   - Catchy tagline: "Karachi's Premier All-Day Eatery"
   - Subtitle: "Experience artisanal coffee, gourmet breakfast, and exquisite continental dining in the heart of Saddar."
   - Call to Actions (CTAs): "View Digital Menu" and "Reserve a Table / Order on WhatsApp"

2. Interactive Digital Menu (Filterable Tabs):
   - Categories: All Day Breakfast, Gourmet Burgers & Sandwiches, Pasta & Mains, Artisanal Coffee & Desserts, Refreshers.
   - Items to Include (Sample Data):
     * Brasserie Special Eggs Benedict (PKR 1,450) - Poached eggs, smoked turkey, hollandaise on sourdough.
     * Smashed Avocado Toast (PKR 1,250) - Fresh avocado, feta, chili flakes, sourdough.
     * Truffle Parmesan Burger (PKR 1,650) - Smash beef patty, truffle mayo, aged cheddar, brioche bun.
     * Creamy Tuscan Chicken Pasta (PKR 1,750) - Fettuccine, sundried tomatoes, spinach, parmesan sauce.
     * Signature Iced Spanish Latte (PKR 850) - Espresso, condensed milk, chilled milk.
     * Classic French Toast (PKR 1,150) - Brioche, berry compote, maple syrup, vanilla cream.

3. Features & Highlights:
   - "All Day Dining" - From morning coffee to late-night dinners.
   - "Prime Saddar Location" - Located right at Hotel Excelsior, next to Atrium Mall.
   - "Dine-In, Takeaway & Delivery" - Direct WhatsApp integration.

4. Direct WhatsApp Ordering & Table Reservation Form:
   - Floating WhatsApp button linking to: `https://wa.me/923308880773?text=Hi%20Karachi%20Brasserie,%20I%20would%20like%20to%20place%20an%20order%20/%20reserve%20a%20table`
   - Interactive booking modal (Name, Guests, Date, Time, Special Requests) that formats a clean message to WhatsApp.

5. Footer & Location:
   - Embedded Google Maps location reference.
   - Address, Contact, and Social Media links (Instagram / Facebook).

---
### 3. TECHNICAL & DESIGN REQUIREMENTS
* Framework: Next.js (App Router, TypeScript)
* Styling: Tailwind CSS (Aesthetic color palette: Charcoal Dark (#1E1E1E), Warm Beige/Gold accent (#D4AF37 / #C5A880), Off-White (#F9F9F6)).
* Animations: Smooth transitions using Framer Motion (or CSS animations).
* Layout: Fully responsive with mobile-first menu drawer and sticky navbar.

Generate a clean, modular Next.js page (`app/page.tsx`) along with reusable components for Menu, Hero, and Reservation.