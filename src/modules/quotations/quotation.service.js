const quotationRepository = require("./quotation.repository");
const ejs = require("ejs");

exports.generatePDF = async (quotationId) => {
  // 1. Fetch quotation + items from repository
  const quotation = await quotationRepository.getQuotationById(quotationId);
  if (!quotation) {
    throw new Error("Quotation not found");
  }

  // 2. Render EJS template into HTML
  const html = await ejs.renderFile("views/quotation.ejs", {
    quotation,
    formatCurrency: (amount, currency) =>
      new Intl.NumberFormat("en-NG", { style: "currency", currency }).format(
        amount,
      ),
  });

  // 3. Lazy-load puppeteer
  const puppeteer = require("puppeteer");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "10mm", right: "10mm", bottom: "10mm", left: "10mm" },
  });

  await browser.close();
  return pdfBuffer;
};
