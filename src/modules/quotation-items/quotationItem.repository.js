// quotationItem.repository.js
async function create(data) {
  return db.one(
    `
    INSERT INTO quotation_items
    (quotation_id, service_type, description, quantity, unit, unit_price, tax_rate)
    VALUES ($/quotation_id/, $/service_type/, $/description/, $/quantity/, $/unit/, $/unit_price/, $/tax_rate/)
    RETURNING *
    `,
    data,
  );
}
