const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../images');
const outputDir = path.join(__dirname, '../images/webp');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Only convert images that are actually used in the HTML
const usedImages = [
  'pfp.jpg',
  'dubclub-icon.png',
  'synadia-icon.png',
  'kajabi-icon.png',
  'dubclub-dashboard.png',
  'dubclub-discovery.png',
  'dubclub-mobile-dash.png',
  'synadia-auth.png',
  'synadia-dash.png',
  'synadia-stream.png',
  'kajabi-course.png',
  'kajabi-outline.png',
  'kajabi-community.png'
];

// Get only the used image files
const imageFiles = fs.readdirSync(imagesDir)
  .filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.png', '.jpg', '.jpeg'].includes(ext) && usedImages.includes(file);
  });

console.log('Converting images to WebP format...');

async function convertToWebP() {
  for (const file of imageFiles) {
    const inputPath = path.join(imagesDir, file);
    const outputPath = path.join(outputDir, path.parse(file).name + '.webp');
    
    try {
      await sharp(inputPath)
        .webp({ 
          quality: 80,
          effort: 6,
          nearLossless: false
        })
        .toFile(outputPath);
      
      // Get file sizes for comparison
      const originalSize = fs.statSync(inputPath).size;
      const webpSize = fs.statSync(outputPath).size;
      const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
      
      console.log(`✅ ${file} → ${path.basename(outputPath)} (${savings}% smaller)`);
    } catch (error) {
      console.error(`❌ Error converting ${file}:`, error.message);
    }
  }
}

convertToWebP().then(() => {
  console.log('\n🎉 WebP conversion complete!');
}); 