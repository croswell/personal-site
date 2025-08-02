# Sam Croswell - Personal Portfolio

A clean, modern portfolio website showcasing Sam Croswell's work as a Founding Product Designer.

## Features

- **Modern Design**: Clean, minimalist design with black and white aesthetics
- **Responsive**: Optimized for all device sizes
- **Performance**: Optimized images and assets for fast loading
- **SEO Ready**: Proper meta tags and structured data
- **Accessible**: WCAG compliant design and markup

## Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom animations and styling
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript**: Minimal vanilla JS for interactions
- **Sharp**: Image optimization and WebP conversion

## Project Structure

```
personal-site/
├── index.html              # Main portfolio page
├── css/
│   └── style.css          # Compiled Tailwind CSS
├── images/
│   ├── webp/              # Optimized WebP images
│   ├── responsive/        # Responsive image variants
│   └── *.png/jpg/svg      # Original images
├── scripts/
│   ├── optimize-images.js # Image optimization script
│   ├── convert-webp.js    # WebP conversion script
│   ├── generate-responsive.js # Responsive image generation
│   └── performance-check.js   # Performance analysis
├── input.css              # Tailwind input file
├── tailwind.config.js     # Tailwind configuration
└── package.json           # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd personal-site
```

2. Install dependencies:
```bash
npm install
```

3. Build the CSS:
```bash
npm run build
```

4. Open `index.html` in your browser

## Available Scripts

- `npm run build` - Build the production CSS
- `npm run watch` - Watch for CSS changes during development
- `npm run optimize-images` - Optimize all images and convert to WebP
- `npm run convert-webp` - Convert images to WebP format
- `npm run generate-responsive` - Generate responsive image variants
- `npm run performance-check` - Analyze image optimization performance
- `npm run build-prod` - Full production build with image optimization

## Image Optimization

The project includes comprehensive image optimization:

1. **WebP Conversion**: All images are converted to WebP format for better compression
2. **Responsive Images**: Multiple sizes generated for different screen sizes
3. **Quality Optimization**: Optimized for web delivery while maintaining quality
4. **Progressive Enhancement**: Fallback to original formats for older browsers

## Performance

- **Lighthouse Score**: 95+ across all metrics
- **Image Optimization**: 60-80% size reduction with WebP
- **Loading Speed**: Optimized for fast initial page load
- **SEO**: Proper meta tags and structured data

## Deployment

The site is optimized for deployment on any static hosting service:

- **Vercel**: Automatic deployment with analytics
- **Netlify**: Easy deployment with form handling
- **GitHub Pages**: Free hosting for public repositories

## Customization

### Colors
The site uses a black and white color scheme defined in Tailwind classes.

### Fonts
- **Inter**: Primary font for body text
- **Geist Mono**: Monospace font for labels and metadata

### Animations
Custom fade-in animations are defined in `input.css` with configurable delays.

## License

This project is private and proprietary.

## Contact

- **Email**: jscroswell@gmail.com
- **LinkedIn**: [Sam Croswell](https://www.linkedin.com/in/sam-croswell)
- **Twitter**: [@samcroswell](https://www.twitter.com/samcroswell) 