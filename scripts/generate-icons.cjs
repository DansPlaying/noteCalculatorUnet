const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../public/logo.svg');
const androidResPath = path.join(__dirname, '../android/app/src/main/res');
const playStorePath = path.join(__dirname, '../playstore-assets');

// Create playstore-assets directory if it doesn't exist
if (!fs.existsSync(playStorePath)) {
  fs.mkdirSync(playStorePath, { recursive: true });
}

// Android icon sizes (mipmap)
const androidIcons = [
  { folder: 'mipmap-mdpi', size: 48 },
  { folder: 'mipmap-hdpi', size: 72 },
  { folder: 'mipmap-xhdpi', size: 96 },
  { folder: 'mipmap-xxhdpi', size: 144 },
  { folder: 'mipmap-xxxhdpi', size: 192 },
];

// Foreground icon sizes (for adaptive icons, slightly larger)
const foregroundIcons = [
  { folder: 'mipmap-mdpi', size: 108 },
  { folder: 'mipmap-hdpi', size: 162 },
  { folder: 'mipmap-xhdpi', size: 216 },
  { folder: 'mipmap-xxhdpi', size: 324 },
  { folder: 'mipmap-xxxhdpi', size: 432 },
];

async function generateIcons() {
  console.log('Generating icons from:', svgPath);

  const svgBuffer = fs.readFileSync(svgPath);

  // Generate Play Store icon (512x512)
  console.log('Generating Play Store icon (512x512)...');
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(playStorePath, 'icon-512.png'));

  // Generate Feature Graphic (1024x500) with gradient background and centered logo
  console.log('Generating Feature Graphic (1024x500)...');
  const logoForFeature = await sharp(svgBuffer)
    .resize(300, 300)
    .png()
    .toBuffer();

  // Create a gradient background
  const featureGraphicSvg = `
    <svg width="1024" height="500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3B82F6"/>
          <stop offset="50%" style="stop-color:#0EA5E9"/>
          <stop offset="100%" style="stop-color:#06B6D4"/>
        </linearGradient>
      </defs>
      <rect width="1024" height="500" fill="url(#bg)"/>
      <text x="680" y="200" font-family="system-ui, sans-serif" font-size="48" font-weight="700" fill="white">Calculadora</text>
      <text x="680" y="260" font-family="system-ui, sans-serif" font-size="48" font-weight="700" fill="white">de Notas</text>
      <text x="680" y="340" font-family="system-ui, sans-serif" font-size="32" fill="rgba(255,255,255,0.8)">UNET</text>
    </svg>
  `;

  await sharp(Buffer.from(featureGraphicSvg))
    .composite([{ input: logoForFeature, left: 100, top: 100 }])
    .png()
    .toFile(path.join(playStorePath, 'feature-graphic-1024x500.png'));

  // Generate Android launcher icons
  for (const icon of androidIcons) {
    const outputPath = path.join(androidResPath, icon.folder, 'ic_launcher.png');
    console.log(`Generating ${icon.folder}/ic_launcher.png (${icon.size}x${icon.size})...`);
    await sharp(svgBuffer)
      .resize(icon.size, icon.size)
      .png()
      .toFile(outputPath);

    // Round icon
    const roundOutputPath = path.join(androidResPath, icon.folder, 'ic_launcher_round.png');
    console.log(`Generating ${icon.folder}/ic_launcher_round.png (${icon.size}x${icon.size})...`);

    // Create circular mask
    const circleMask = Buffer.from(
      `<svg><circle cx="${icon.size/2}" cy="${icon.size/2}" r="${icon.size/2}" fill="white"/></svg>`
    );

    await sharp(svgBuffer)
      .resize(icon.size, icon.size)
      .composite([{ input: circleMask, blend: 'dest-in' }])
      .png()
      .toFile(roundOutputPath);
  }

  // Generate foreground icons (for adaptive icons)
  for (const icon of foregroundIcons) {
    const outputPath = path.join(androidResPath, icon.folder, 'ic_launcher_foreground.png');
    console.log(`Generating ${icon.folder}/ic_launcher_foreground.png (${icon.size}x${icon.size})...`);

    // The foreground needs padding, so we resize to ~70% of the canvas
    const innerSize = Math.round(icon.size * 0.7);
    const padding = Math.round((icon.size - innerSize) / 2);

    await sharp(svgBuffer)
      .resize(innerSize, innerSize)
      .extend({
        top: padding,
        bottom: padding,
        left: padding,
        right: padding,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(outputPath);
  }

  console.log('\n✅ All icons generated successfully!');
  console.log('\nPlay Store assets location:', playStorePath);
  console.log('- icon-512.png (App icon for Play Store)');
  console.log('- feature-graphic-1024x500.png (Feature graphic)');
}

generateIcons().catch(console.error);
