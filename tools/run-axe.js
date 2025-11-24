const puppeteer = require('puppeteer');
const axeSource = require('axe-core').source;

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:4300/', { waitUntil: 'networkidle0' });
  await page.addScriptTag({ content: axeSource });
  const results = await page.evaluate(async () => {
    return await axe.run();
  });
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
