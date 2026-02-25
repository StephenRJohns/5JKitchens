Build a full ecommerce website for "5JKitchen" using Next.js with the App Router, TypeScript, and Tailwind CSS.

## Design Reference
Use the image(s) in the `/images` directory as the style guide for the site's visual design — match the color palette, typography feel, layout patterns, and overall aesthetic as closely as possible.

## Site Overview
5JKitchen is an artisan food brand selling handcrafted butters, buttermilk, and ranch dressing. The site should feel premium, warm, and inviting — like a high-end farmer's market brand.

## Products
Each product should have a name, description, price, and placeholder product image. Create compelling descriptions for each:

1. **Butter** – Classic creamy butter
2. **Miso Butter** – Umami-rich miso-infused butter
3. **Herb Butter** – Fresh herb compound butter
4. **Chimichurri Butter** – Bold, herbaceous chimichurri-infused butter
5. **Berry Butter** – Sweet mixed berry butter
6. **Cinnamon Butter** – Warm cinnamon-spiced butter
7. **Buttermilk** – Rich, tangy cultured buttermilk
8. **Ranch Dressing** – Homemade-style ranch dressing

## Pages & Features

### Home Page
- Hero section with brand tagline and CTA to shop
- Featured products grid (show all 8 products as cards with image, name, price, and "Add to Cart" button)
- "Our Story" section — brief brand narrative about handcrafted, small-batch kitchen products
- Newsletter signup section at the bottom with email input and subscribe button

### Shop Page
- Full product grid with filtering/sorting options
- Each product card links to a product detail page

### Product Detail Page
- Large product image area
- Product name, price, full description
- Quantity selector and "Add to Cart" button
- "You might also like" section showing 3 related products

### Cart
- Slide-out cart drawer or dedicated cart page
- Line items with quantity adjustment and remove option
- Subtotal, and "Proceed to Checkout" button
- Checkout can be a placeholder/dummy page

### Newsletter
- Reusable newsletter signup component used on the home page and optionally in the footer
- Email validation
- Success/error state feedback

### Header & Footer
- Header: Logo ("5JKitchen"), nav links (Home, Shop, About), cart icon with item count badge
- Footer: Brand info, quick links, social media icon placeholders, newsletter signup

## Technical Requirements
- Use React Context or Zustand for cart state management
- Responsive design — mobile-first, looks great on all screen sizes
- Smooth animations/transitions (hover effects on product cards, cart interactions)
- All product data stored in a local JSON/TypeScript file (no backend needed)
- Use placeholder images for products (solid colored boxes or SVG illustrations styled to match the brand)
- SEO-friendly with proper meta tags and semantic HTML
- Accessible (proper ARIA labels, keyboard navigation, color contrast)

## Style Guidelines
- Match the visual style from the reference image(s) in `/images`
- Clean, modern layout with generous whitespace
- Warm, appetizing color palette
- Typography should feel premium but approachable
- Subtle hover animations and micro-interactions

