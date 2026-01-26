# Gymtegrity Website

A production-ready website for Gymtegrity, North Denver's premier kids gymnastics academy.

## Quick Start

1. Open `index.html` in a browser to view the site
2. Replace placeholder content with your actual content
3. Deploy to your hosting provider

## File Structure

```
Gym-Website/
├── index.html          # Homepage
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   └── main.js         # JavaScript functionality
├── images/             # Image assets
│   └── logo-placeholder.svg
├── assets/             # Other assets (fonts, icons)
└── README.md
```

## Customization Checklist

### Branding & Images

Replace these placeholder items with your actual content:

- [ ] **Logo**: Replace `images/logo-placeholder.svg` with your actual logo
- [ ] **Favicon**: Add favicon files to `/assets` folder
- [ ] **Hero Background**: Add high-quality hero image (recommended: 1920x1080px)
- [ ] **Program Images**: Add photos for each program (recommended: 800x500px)
- [ ] **About Section Images**: Add facility/team photos
- [ ] **Google Maps**: Replace map placeholder with your Google Maps embed code

### Content to Update

Search for `[PLACEHOLDER` in the HTML file to find all items needing your input:

1. **Business Information**
   - [ ] Address
   - [ ] Phone number
   - [ ] Email address
   - [ ] Business hours

2. **About Section**
   - [ ] Founder name and background
   - [ ] Facility square footage
   - [ ] Years of experience
   - [ ] Number of happy families

3. **Testimonials**
   - [ ] Real parent testimonials (minimum 3)
   - [ ] Parent names
   - [ ] Child details

4. **Social Media**
   - [ ] Facebook URL
   - [ ] Instagram URL
   - [ ] YouTube URL

5. **SEO**
   - [ ] Update meta descriptions
   - [ ] Add Open Graph image

### Form Integration

The trial class form needs to be connected to your backend. Options:

1. **Formspree** (easiest): Change form action to your Formspree endpoint
2. **Netlify Forms**: Add `data-netlify="true"` to the form
3. **Custom Backend**: Update the form submission handler in `js/main.js`

## Technical Features

- **Responsive Design**: Mobile-first, works on all screen sizes
- **Accessibility**: WCAG 2.1 compliant with proper ARIA labels
- **Performance**: Optimized CSS, minimal JavaScript
- **SEO Ready**: Semantic HTML, meta tags, Open Graph
- **Modern CSS**: CSS Custom Properties for easy theming

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment Options

### Static Hosting (Recommended)
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages

### Traditional Hosting
Upload all files via FTP to your web host's public directory.

## Color Customization

Edit the CSS custom properties in `css/styles.css`:

```css
:root {
    --color-primary: #7C3AED;        /* Main brand purple */
    --color-primary-dark: #6D28D9;
    --color-primary-light: #A78BFA;
    --color-secondary: #10B981;       /* Green accent */
}
```

## Adding New Pages

1. Copy `index.html` as a template
2. Update the `<title>` and content
3. Keep the header and footer consistent
4. Add navigation links in both files

## Contact

For questions about this website, contact [your email here].

---

Built with care for Gymtegrity.
