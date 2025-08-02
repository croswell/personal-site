const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../images');
const webpDir = path.join(__dirname, '../images/webp');

function getDirectorySize(dir) {
  if (!fs.existsSync(dir)) return 0;
  
  const files = fs.readdirSync(dir);
  let totalSize = 0;
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      totalSize += stats.size;
    }
  });
  
  return totalSize;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

console.log('📊 Performance Analysis\n');

// Check original images
const originalSize = getDirectorySize(imagesDir);
console.log(`Original images: ${formatBytes(originalSize)}`);

// Check WebP images
const webpSize = getDirectorySize(webpDir);
console.log(`WebP images: ${formatBytes(webpSize)}`);

if (webpSize > 0) {
  const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
  console.log(`\n💾 Total savings: ${savings}%`);
  console.log(`📉 Size reduction: ${formatBytes(originalSize - webpSize)}`);
}

// List largest files
console.log('\n📁 Largest original files:');
const imageFiles = fs.readdirSync(imagesDir)
  .filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.png', '.jpg', '.jpeg'].includes(ext);
  })
  .map(file => {
    const filePath = path.join(imagesDir, file);
    const stats = fs.statSync(filePath);
    return { name: file, size: stats.size };
  })
  .sort((a, b) => b.size - a.size)
  .slice(0, 5);

imageFiles.forEach(file => {
  console.log(`   ${file.name}: ${formatBytes(file.size)}`);
});

console.log('\n✅ Performance check complete!'); 