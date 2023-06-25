const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const filePath = path.join(__dirname, 'index.html'); // Ruta al archivo HTML
  const outputFilePath = path.join(__dirname, '..', 'cv_franc.pdf'); // Ruta para guardar el archivo PDF

  const browser = await puppeteer.launch({
    args: ['--allow-file-access-from-files'],
  });
  const page = await browser.newPage();

  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });
  await page.pdf({ path: outputFilePath, format: 'A4' });
  await page.pdf({
    path: 'cv_franc.pdf',
    width: '1920px', // Ancho de página deseado
    height: '1080px', // Alto de página deseado
  });
  await page.waitForSelector('.photo');

  await page.addStyleTag({ content: 'style.css' });


  await browser.close();

  console.log('PDF generado exitosamente.');
})();
