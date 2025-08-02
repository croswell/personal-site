const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../images');
const responsiveDir = path.join(__dirname, '../images/responsive');

// Create output directory if it doesn't exist
if (!fs.existsSync(responsiveDir)) {
  fs.mkdirSync(responsiveDir, { recursive: true });
}

// Define responsive breakpoints
const sizes = [
  { width: 640, suffix: 'sm' },
  { width: 768, suffix: 'md' },
  { width: 1024, suffix: 'lg' },
  { width: 1280, suffix: 'xl' },
  { width: 1920, suffix: '2xl' }
];

// Get all image files (excluding already processed ones)
const imageFiles = fs.readdirSync(imagesDir)
  .filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.png', '.jpg', '.jpeg', '.webp'].includes(ext) && 
           !file.includes('sm-') && 
           !file.includes('md-') && 
           !file.includes('lg-') && 
           !file.includes('xl-') && 
           !file.includes('2xl-');
  });

console.log('Generating responsive images...');

async function generateResponsiveImages() {
  for (const file of imageFiles) {
    const inputPath = path.join(imagesDir, file);
    const baseName = path.parse(file).name;
    const ext = path.extname(file);
    
    try {
      const image = sharp(inputPath);
      const metadata = await image.metadata();
      
      // Only process images that are larger than our smallest size
      if (metadata.width < 640) {
        console.log(`⏭️  Skipping ${file} (too small: ${metadata.width}px)`);
        continue;
      }
      
      for (const size of sizes) {
        const outputFileName = `${baseName}-${size.suffix}${ext}`;
        const outputPath = path.join(responsiveDir, outputFileName);
        
        await image
          .resize(size.width, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .toFile(outputPath);
        
        console.log(`✅ Generated ${outputFileName} (${size.width}px)`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }
}

generateResponsiveImages().then(() => {
  console.log('\n🎉 Responsive image generation complete!');
}); 