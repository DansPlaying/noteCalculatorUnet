const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const androidResPath = path.join(__dirname, '../android/app/src/main/res');

// Splash screen sizes
const splashScreens = [
  { folder: 'drawable', width: 480, height: 800 },
  { folder: 'drawable-port-mdpi', width: 320, height: 480 },
  { folder: 'drawable-port-hdpi', width: 480, height: 800 },
  { folder: 'drawable-port-xhdpi', width: 720, height: 1280 },
  { folder: 'drawable-port-xxhdpi', width: 960, height: 1600 },
  { folder: 'drawable-port-xxxhdpi', width: 1280, height: 1920 },
  { folder: 'drawable-land-mdpi', width: 480, height: 320 },
  { folder: 'drawable-land-hdpi', width: 800, height: 480 },
  { folder: 'drawable-land-xhdpi', width: 1280, height: 720 },
  { folder: 'drawable-land-xxhdpi', width: 1600, height: 960 },
  { folder: 'drawable-land-xxxhdpi', width: 1920, height: 1280 },
];

async function generateSplashScreens() {
  const svgBuffer = fs.readFileSync(path.join(__dirname, '../public/logo.svg'));

  for (const splash of splashScreens) {
    const outputPath = path.join(androidResPath, splash.folder, 'splash.png');
    const logoSize = Math.min(splash.width, splash.height) * 0.4;

    console.log(`Generating ${splash.folder}/splash.png (${splash.width}x${splash.height})...`);

    // Create gradient background
    const bgSvg = `
      <svg width="${splash.width}" height="${splash.height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#3B82F6"/>
            <stop offset="50%" style="stop-color:#0EA5E9"/>
            <stop offset="100%" style="stop-color:#06B6D4"/>
          </linearGradient>
        </defs>
        <rect width="${splash.width}" height="${splash.height}" fill="url(#bg)"/>
      </svg>
    `;

    const logo = await sharp(svgBuffer)
      .resize(Math.round(logoSize), Math.round(logoSize))
      .png()
      .toBuffer();

    const left = Math.round((splash.width - logoSize) / 2);
    const top = Math.round((splash.height - logoSize) / 2);

    await sharp(Buffer.from(bgSvg))
      .composite([{ input: logo, left, top }])
      .png()
      .toFile(outputPath);
  }

  console.log('\n✅ All splash screens generated!');
}

generateSplashScreens().catch(console.error);
