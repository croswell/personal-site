const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../images');
const webpDir = path.join(__dirname, '../images/webp');
const responsiveDir = path.join(__dirname, '../images/responsive');

// Create output directories if they don't exist
[webpDir, responsiveDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Define responsive breakpoints
const sizes = [
  { width: 640, suffix: 'sm' },
  { width: 768, suffix: 'md' },
  { width: 1024, suffix: 'lg' },
  { width: 1280, suffix: 'xl' },
  { width: 1920, suffix: '2xl' }
];

// Get all image files
const imageFiles = fs.readdirSync(imagesDir)
  .filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.png', '.jpg', '.jpeg'].includes(ext);
  });

console.log('🚀 Starting comprehensive image optimization...\n');

async function optimizeImages() {
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  
  for (const file of imageFiles) {
    const inputPath = path.join(imagesDir, file);
    const baseName = path.parse(file).name;
    
    try {
      const originalSize = fs.statSync(inputPath).size;
      totalOriginalSize += originalSize;
      
      // Convert to WebP
      const webpPath = path.join(webpDir, `${baseName}.webp`);
      await sharp(inputPath)
        .webp({ 
          quality: 80,
          effort: 6,
          nearLossless: false
        })
        .toFile(webpPath);
      
      const webpSize = fs.statSync(webpPath).size;
      totalOptimizedSize += webpSize;
      
      const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
      console.log(`✅ ${file} → ${path.basename(webpPath)} (${savings}% smaller)`);
      
      // Generate responsive images for larger images
      const metadata = await sharp(inputPath).metadata();
      if (metadata.width >= 640) {
        for (const size of sizes) {
          const responsivePath = path.join(responsiveDir, `${baseName}-${size.suffix}.webp`);
          await sharp(inputPath)
            .resize(size.width, null, {
              withoutEnlargement: true,
              fit: 'inside'
            })
            .webp({ quality: 80 })
            .toFile(responsivePath);
        }
        console.log(`   📱 Generated responsive versions (${sizes.length} sizes)`);
      }
      
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }
  
  const totalSavings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
  const totalOriginalMB = (totalOriginalSize / 1024 / 1024).toFixed(1);
  const totalOptimizedMB = (totalOptimizedSize / 1024 / 1024).toFixed(1);
  
  console.log(`\n📊 Optimization Summary:`);
  console.log(`   Original size: ${totalOriginalMB} MB`);
  console.log(`   Optimized size: ${totalOptimizedMB} MB`);
  console.log(`   Total savings: ${totalSavings}%`);
  console.log(`\n🎉 Image optimization complete!`);
}

optimizeImages(); 