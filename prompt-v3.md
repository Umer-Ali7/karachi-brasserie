You are a senior UI/UX designer and frontend engineer. I want you to refine the existing Karachi Brasserie restaurant website based on the current implementation.

IMPORTANT:
- Do NOT redesign the website from scratch.
- Preserve the current visual identity, typography, dark luxury aesthetic, gold accent color, editorial restaurant feel, and existing components.
- Do NOT make it look like a generic AI-generated restaurant template.
- Make the improvements feel intentional, premium, elegant, and production-ready.
- Keep the existing responsive behavior and improve mobile UX where needed.

CURRENT DESIGN DIRECTION:
Dark editorial luxury restaurant website.
Black/charcoal backgrounds, warm white typography, muted gold/yellow accents, premium food photography, serif display typography, minimal UI.

MAIN GOAL:
Take the current website from approximately 8/10 to 9.5/10 through spacing, hierarchy, CTA, menu presentation, location section, storytelling, and reservation UX improvements.

==================================================
1. RESERVATION CTA — HIGH PRIORITY
==================================================

The website already has a "Reserve a Table" CTA.

IMPORTANT:
The reservation form should NOT be permanently visible on the page.

It must open ONLY when the user clicks:
- "Reserve a Table"
- "Book a Table"
- Any primary reservation CTA

Use the existing reservation modal/form behavior if already implemented.

The reservation modal should feel like a premium restaurant booking experience.

Reference design:
- Full-screen dark translucent backdrop with strong backdrop blur
- Centered premium modal
- Dark charcoal/black surface
- Thin subtle border
- Elegant serif heading
- Gold accent CTA
- Minimal form styling
- Smooth open/close animation
- Close button in the top-right
- Modal should be responsive on mobile

Reservation modal content:

Small eyebrow:
"MAKE IT A DATE"

Main heading:
"Reserve a table"

Supporting text:
"Leave the details, we'll confirm on WhatsApp."

Fields:
1. Name
2. Guests
3. Date
4. Time
5. Special Requests

Primary button:
"CONTINUE ON WHATSAPP"

The button should generate a WhatsApp reservation message using the entered information.

Do NOT expose or hardcode fake reservation details as if they are real business data.

If a WhatsApp number already exists in the project, reuse it.
If no number exists, keep the current configured placeholder/config mechanism rather than inventing a real number.

Validation:
- Name required
- Guests required
- Date required
- Time required
- Special requests optional
- Prevent empty submission
- Show subtle inline validation
- Keep the experience elegant and minimal

After successful validation:
- Build a readable WhatsApp message
- Encode the message safely
- Open WhatsApp in a new tab/window
- Do not submit to a fake backend

==================================================
2. HERO CTA HIERARCHY
==================================================

Make the primary CTA clearly:

"BOOK A TABLE"

Secondary CTA:

"VIEW MENU"

Primary CTA should have stronger visual hierarchy.

Do not add excessive buttons.

The reservation CTA should be the most visually important action on the website.

==================================================
3. MENU SECTION
==================================================

Improve the menu section without changing its overall identity.

Current problem:
Food cards feel too small and text-heavy.

Make food imagery more prominent.

Each featured dish should have:
- Larger food image
- Dish name
- Short description
- Price
- Elegant hover interaction

The image should visually sell the food.

Keep the menu editorial and premium.

Avoid excessive card shadows, gradients, glassmorphism, or generic SaaS-style cards.

If the current menu uses a grid, refine the grid rather than replacing it unnecessarily.

Maintain excellent responsive behavior on mobile.

==================================================
4. LOCATION SECTION
==================================================

The current "Find us in the heart of it." section has too much empty vertical space.

Reduce unnecessary whitespace.

Create a stronger two-column editorial layout:

LEFT:
"FIND US"
"Find us in the heart of it."

Short location description.

Location information:
- Restaurant address from the existing project/business data
- Opening hours if already available in the project
- "GET DIRECTIONS" CTA

RIGHT:
A premium location/map visual area.

If an actual map integration already exists, preserve it.
If not, create a visually refined map/location placeholder without inventing geographic information.

The section should feel intentional, not like empty space.

==================================================
5. STORYTELLING / CONTENT RHYTHM
==================================================

Improve the vertical rhythm between sections.

The current page has some sections with large empty spaces.

Do NOT simply reduce every section's padding.

Instead, create a more intentional editorial rhythm.

Use short storytelling moments such as:

"Come for the coffee.
Stay for the story."

"Good food.
Good company."

Keep this style consistent.

Do not add random filler content.

==================================================
6. ABOUT / GOOD FOOD SECTION
==================================================

Keep the existing "Good food. Good company." section.

Improve its composition:

- Let the photography dominate slightly more.
- Keep typography elegant and editorial.
- Improve text/image balance.
- Reduce unnecessary empty space.
- Add subtle reveal/hover animation only if it fits the existing design.

Do not over-animate.

==================================================
7. GALLERY
==================================================

The current gallery direction is strong.

Keep the existing visual style.

Improve:
- Image cropping consistency
- Hover interaction
- Spacing
- Mobile layout

Images should remain the visual focus.

Do NOT add heavy borders or excessive UI.

==================================================
8. NAVIGATION / MOBILE
==================================================

Keep desktop navigation minimal.

For mobile:
- Use a clean hamburger menu
- Full-screen or elegant slide-down navigation
- Clear "BOOK A TABLE" CTA inside the menu
- Good spacing
- Smooth open/close animation
- Prevent body scroll while menu is open

Do not make the mobile navigation overly complicated.

==================================================
9. TYPOGRAPHY
==================================================

Typography is one of the strongest parts of the current design.

Preserve the editorial serif + clean sans-serif combination.

Improve:
- Heading hierarchy
- Line height
- Letter spacing
- Section eyebrow styling
- Mobile typography scaling

Do NOT replace the current typography with a generic modern SaaS font.

Large headlines should feel like a premium restaurant / hospitality brand.

==================================================
10. SPACING
==================================================

Audit the entire page for:

- Excessive empty vertical areas
- Inconsistent section padding
- Uneven card spacing
- Text/image alignment
- Mobile spacing

The goal is not "less whitespace everywhere."

The goal is intentional whitespace.

Luxury design needs breathing room, but every large empty area should feel purposeful.

==================================================
11. COLORS
==================================================

Preserve the existing palette.

Primary:
- Deep black / charcoal

Text:
- Warm white

Accent:
- Muted champagne/gold/yellow

Do NOT introduce:
- Bright blue
- Purple
- Neon gradients
- Excessive gold
- Glassmorphism

Gold should remain an accent, not dominate the UI.

==================================================
12. ANIMATION
==================================================

Use subtle premium motion only.

Examples:
- Fade/slide reveal on scroll
- Image scale on hover
- Button hover transition
- Modal fade/scale
- Navigation transition

Avoid:
- Excessive parallax
- Bouncy animations
- Overly flashy effects
- Constant movement

The website should feel like a premium hospitality brand, not a tech startup.

==================================================
13. ACCESSIBILITY + UX
==================================================

Make sure:

- Buttons have clear labels
- Inputs have accessible labels
- Keyboard navigation works
- Modal can be closed with Escape
- Focus is handled correctly
- Mobile touch targets are large enough
- Contrast remains readable
- Forms have proper validation
- Images have meaningful alt text

==================================================
14. PERFORMANCE
==================================================

Do not sacrifice performance for visual effects.

- Optimize images where appropriate
- Avoid unnecessary client-side JavaScript
- Avoid unnecessary dependencies
- Preserve existing architecture
- Keep components reusable
- Do not introduce a new UI framework unless absolutely necessary

==================================================
15. FINAL QUALITY CHECK
==================================================

After implementing the changes:

1. Run lint/type checks.
2. Check desktop layout.
3. Check mobile layout.
4. Test the reservation modal.
5. Test form validation.
6. Test WhatsApp CTA.
7. Test navigation.
8. Check all buttons/links.
9. Check for horizontal overflow.
10. Check spacing consistency.
11. Check image loading.
12. Make sure no fake business information was introduced.

IMPORTANT FINAL RULE:

Do not make the website "more complicated."

The target is:

Premium
Editorial
Elegant
Warm
Minimal
Restaurant-focused
Conversion-focused

The existing design direction is already strong. Refine it rather than replacing it.

Before changing any component, inspect the existing codebase and reuse the current components, styles, assets, data, and functionality wherever possible. Only modify what is necessary to achieve the requested improvements.