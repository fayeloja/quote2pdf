// version 1.0 is suppose to be bad.
const PDFDocument = require("pdfkit");
const ejs = require("ejs");
const path = require("path");
const puppeteer = require("puppeteer");
const express = require("express");
const morgan = require("morgan");
const quotationData = require("./quotationData");
const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page!");
});

app.get("/quotation", (req, res) => {
  res.send(quotationData);
});

// Format currency
const formatCurrency = (amount, currency) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency.code,
  }).format(amount);
};

// download pdf Quotation
app.get("/download-pdf", async (req, res) => {
  //1. Fetch data from quotationData.js
  const quoteData = quotationData[0];

  if (!quoteData) {
    return res.status(404).send("Quotation data not found");
  }

  // 2. Render EJS template into HTML
  const html = await ejs.renderFile(
    path.join(__dirname, "views", "quotation.ejs"),
    {
      quotation: quoteData,
      formatCurrency,
    },
  );

  // 3. Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // 4. Set the page content to the HTML
  await page.setContent(html, {
    waitUntil: "networkidle0",
  });

  // 5. Generate PDF
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "40mm", bottom: "30mm", left: "10mm", right: "10mm" },
    displayHeaderFooter: true,
    headerTemplate: `
    <header style="width:100%; text-align:center; font-size:10px; color:#555; font-weight:bold;">
  <img src="logo.png" style="height:20px; vertical-align:middle;" />
  Quotation - ${quoteData.quotationId}
</header>
    
  `,
    footerTemplate: `
    <footer style="width:100%; font-size:10px; text-align:center; color:#555;">
  Page <span class="pageNumber"></span> of <span class="totalPages"></span>
</footer>
  `,
  });

  // 6. Close the browser
  await browser.close();

  // 7. Send the PDF to the client
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=quotation_${quoteData.quotationId}.pdf`,
  );
  res.send(pdfBuffer);
});

// download pdf Quotation by id
app.get("/download-pdf/:id", async (req, res) => {
  //1. Fetch data from quotationData.js
  const quotationId = req.params.id;

  // find the quotation data by id
  const quoteData = quotationData.find(
    (quote) => quote.quotationId === quotationId,
  );

  // check if the id is valid
  if (!quoteData) {
    return res
      .status(404)
      .send(`Quotation with ID ${quotationId} cannot be found`);
  }

  // 2. Render EJS template into HTML
  const html = await ejs.renderFile(
    path.join(__dirname, "views", "quotation.ejs"),
    {
      quotation: quoteData,
      formatCurrency,
    },
  );

  // 3. Generate PDF with Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // 4. Set the page content to the HTML
  await page.setContent(html, {
    waitUntil: "networkidle0",
  });

  // 5. Generate PDF
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "40mm", bottom: "30mm", left: "10mm", right: "10mm" },
    displayHeaderFooter: true,
    headerTemplate: `
    <header style="width:100%; text-align:center; font-size:10px; color:#555; font-weight:bold;">
  <img src="logo.png" style="height:20px; vertical-align:middle;" />
  Quotation - ${quoteData.quotationId}
</header>
    
  `,
    footerTemplate: `
    <footer style="width:100%; font-size:10px; text-align:center; color:#555;">
  Page <span class="pageNumber"></span> of <span class="totalPages"></span>
</footer>
  `,
  });

  // 6. Close the browser
  await browser.close();

  // 7. Send the PDF to the client
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=quotation_${quoteData.quotationId}.pdf`,
  );
  res.send(pdfBuffer);
});

///////////////////////////////////////////////////////////////////////////////////
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
