const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  console.log('🚀 Generating CV PDF...');

  // Try to find Chrome/Chromium on Windows
  const chromePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Users\\' + process.env.USERNAME + '\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  ];

  let executablePath = null;
  for (const p of chromePaths) {
    if (fs.existsSync(p)) {
      executablePath = p;
      console.log(`✓ Found browser at: ${p}`);
      break;
    }
  }

  if (!executablePath) {
    console.error('❌ Chrome/Edge not found. Please install Chrome or Edge.');
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();

  const htmlPath = path.join(__dirname, '..', 'CV.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

  await page.setContent(htmlContent, {
    waitUntil: 'networkidle0',
    timeout: 60000
  });

  await page.emulateMediaType('print');

  await page.pdf({
    path: path.join(__dirname, '..', 'CV.pdf'),
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      right: '0mm',
      bottom: '0mm',
      left: '0mm'
    },
    preferCSSPageSize: true,
    displayHeaderFooter: false
  });

  await browser.close();

  console.log('✅ CV.pdf generated successfully!');
}

generatePDF().catch(err => {
  console.error('❌ Error generating PDF:', err);
  process.exit(1);
});
