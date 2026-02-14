const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const screenshotsDir = path.join(__dirname, '../playstore-assets/screenshots');

// Phone dimensions (1080x1920 for 9:16 ratio)
const PHONE_WIDTH = 1080;
const PHONE_HEIGHT = 1920;

// Tablet 7" dimensions (1200x1920 for 10:16 ratio, close to 9:16)
const TABLET7_WIDTH = 1200;
const TABLET7_HEIGHT = 1920;

// Tablet 10" dimensions (1920x1200 for 16:10, landscape)
const TABLET10_WIDTH = 1920;
const TABLET10_HEIGHT = 1200;

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateScreenshots() {
  // Create directories
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
  if (!fs.existsSync(path.join(screenshotsDir, 'phone'))) {
    fs.mkdirSync(path.join(screenshotsDir, 'phone'), { recursive: true });
  }
  if (!fs.existsSync(path.join(screenshotsDir, 'tablet-7'))) {
    fs.mkdirSync(path.join(screenshotsDir, 'tablet-7'), { recursive: true });
  }
  if (!fs.existsSync(path.join(screenshotsDir, 'tablet-10'))) {
    fs.mkdirSync(path.join(screenshotsDir, 'tablet-10'), { recursive: true });
  }

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // Generate phone screenshots
  await generatePhoneScreenshots(browser);

  // Generate tablet screenshots
  await generateTabletScreenshots(browser, 'tablet-7', TABLET7_WIDTH, TABLET7_HEIGHT);
  await generateTabletScreenshots(browser, 'tablet-10', TABLET10_WIDTH, TABLET10_HEIGHT);

  await browser.close();
  console.log('\n✅ All screenshots generated successfully!');
  console.log(`📁 Location: ${screenshotsDir}`);
}

async function generatePhoneScreenshots(browser) {
  const page = await browser.newPage();
  await page.setViewport({ width: PHONE_WIDTH, height: PHONE_HEIGHT, deviceScaleFactor: 1 });

  // Screenshot 1: Light mode - Home page clean
  console.log('📸 Phone 1: Home page (light mode)...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await delay(500);
  await page.screenshot({
    path: path.join(screenshotsDir, 'phone', '01-home-light.png'),
    type: 'png'
  });

  // Screenshot 2: Conversion 100 to 9 with result
  console.log('📸 Phone 2: Conversion 100→9...');
  await page.type('#\\31 00', '85');
  await delay(300);
  await page.screenshot({
    path: path.join(screenshotsDir, 'phone', '02-conversion-100.png'),
    type: 'png'
  });

  // Screenshot 3: Conversion 9 to 100 with result
  console.log('📸 Phone 3: Conversion 9→100...');
  await page.reload({ waitUntil: 'networkidle0' });
  await delay(300);
  await page.type('#\\39', '7.5');
  await delay(300);
  await page.screenshot({
    path: path.join(screenshotsDir, 'phone', '03-conversion-9.png'),
    type: 'png'
  });

  // Screenshot 4: Points calculator with data
  console.log('📸 Phone 4: Points calculator...');
  await page.reload({ waitUntil: 'networkidle0' });
  await delay(300);

  // Select 3 parciales
  await page.select('#notes', '3');
  await delay(200);

  // Fill first partial: 30% - 70 pts
  await page.type('#percent0', '30');
  await page.type('#note0', '70');
  await delay(200);

  // Fill second partial: 35% - 85 pts
  await page.type('#percent1', '35');
  await page.type('#note1', '85');
  await delay(500);

  // Scroll to show results
  await page.evaluate(() => {
    const element = document.querySelector('#totalRequired');
    if (element) element.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await delay(300);

  await page.screenshot({
    path: path.join(screenshotsDir, 'phone', '04-calculator-results.png'),
    type: 'png'
  });

  // Screenshot 5: Full page showing "Ya la tienes"
  console.log('📸 Phone 5: Results with "Ya la tienes"...');
  await page.reload({ waitUntil: 'networkidle0' });
  await delay(300);
  await page.select('#notes', '4');
  await delay(200);

  // High grades to show "Ya la tienes"
  await page.type('#percent0', '30');
  await page.type('#note0', '90');
  await page.type('#percent1', '25');
  await page.type('#note1', '85');
  await page.type('#percent2', '25');
  await page.type('#note2', '80');
  await delay(500);

  await page.evaluate(() => {
    const element = document.querySelector('#totalRequired');
    if (element) element.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await delay(300);

  await page.screenshot({
    path: path.join(screenshotsDir, 'phone', '05-ya-la-tienes.png'),
    type: 'png'
  });

  // Screenshot 6: Dark mode
  console.log('📸 Phone 6: Dark mode...');
  await page.reload({ waitUntil: 'networkidle0' });
  await delay(300);

  // Enable dark mode
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  });
  await delay(500);

  await page.screenshot({
    path: path.join(screenshotsDir, 'phone', '06-dark-mode.png'),
    type: 'png'
  });

  // Screenshot 7: Dark mode with conversion
  console.log('📸 Phone 7: Dark mode with data...');
  await page.type('#\\31 00', '75');
  await delay(300);
  await page.screenshot({
    path: path.join(screenshotsDir, 'phone', '07-dark-conversion.png'),
    type: 'png'
  });

  await page.close();
}

async function generateTabletScreenshots(browser, folder, width, height) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });

  // Screenshot 1: Home page light
  console.log(`📸 ${folder} 1: Home page (light)...`);
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await delay(500);
  await page.screenshot({
    path: path.join(screenshotsDir, folder, '01-home-light.png'),
    type: 'png'
  });

  // Screenshot 2: With conversions
  console.log(`📸 ${folder} 2: Conversions...`);
  await page.type('#\\31 00', '88');
  await delay(300);
  await page.screenshot({
    path: path.join(screenshotsDir, folder, '02-conversions.png'),
    type: 'png'
  });

  // Screenshot 3: Calculator with results
  console.log(`📸 ${folder} 3: Calculator...`);
  await page.reload({ waitUntil: 'networkidle0' });
  await delay(300);
  await page.select('#notes', '3');
  await delay(200);
  await page.type('#percent0', '35');
  await page.type('#note0', '78');
  await page.type('#percent1', '35');
  await page.type('#note1', '82');
  await delay(500);

  await page.screenshot({
    path: path.join(screenshotsDir, folder, '03-calculator.png'),
    type: 'png'
  });

  // Screenshot 4: Dark mode
  console.log(`📸 ${folder} 4: Dark mode...`);
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  });
  await delay(500);
  await page.screenshot({
    path: path.join(screenshotsDir, folder, '04-dark-mode.png'),
    type: 'png'
  });

  await page.close();
}

generateScreenshots().catch(console.error);
