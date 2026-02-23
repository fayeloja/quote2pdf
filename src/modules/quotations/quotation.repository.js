const db = require("../../utils/db");

exports.getQuotationById = async (quotationId) => {
  const result = await db.query(
    `SELECT q.*, c.first_name AS customer_first_name, c.last_name AS customer_last_name
     FROM quotations q
     LEFT JOIN customers c ON q.customer_id = c.id
     WHERE q.id = $1`,
    [quotationId],
  );

  if (result.rows.length === 0) return null;

  const quotation = result.rows[0];

  // Optionally fetch line items
  const items = await db.query(
    `SELECT * FROM quotation_items WHERE quotation_id = $1`,
    [quotationId],
  );

  quotation.lineItems = items.rows;
  return quotation;
};
