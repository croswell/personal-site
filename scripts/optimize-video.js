const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const inputVideo = path.join(__dirname, '../images/dubclub-recap-hq.mp4');
const outputVideo = path.join(__dirname, '../images/dubclub-recap-optimized.mp4');

// Check if ffmpeg is available
exec('ffmpeg -version', (error) => {
  if (error) {
    console.log('❌ ffmpeg not found. Please install ffmpeg to optimize video.');
    console.log('   Alternative: Consider removing the video or using a smaller file.');
    return;
  }

  // Optimize video with ffmpeg
  const command = `ffmpeg -i "${inputVideo}" -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 128k -movflags +faststart "${outputVideo}"`;
  
  console.log('🎬 Optimizing video...');
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Error optimizing video:', error.message);
      return;
    }
    
    const originalSize = fs.statSync(inputVideo).size;
    const optimizedSize = fs.statSync(outputVideo).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ Video optimized: ${(originalSize / 1024 / 1024).toFixed(1)}MB → ${(optimizedSize / 1024 / 1024).toFixed(1)}MB (${savings}% smaller)`);
    console.log('💡 Update your HTML to use dubclub-recap-optimized.mp4');
  });
}); 