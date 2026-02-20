// Handles business logic, calls repository, returns JSON (in and out)

//create draft
async function createDraft(userId, data) {
  const quoteNumber = await repo.getNextQuoteNumber(userId);

  return repo.create({
    user_id: userId,
    customer_id: data.customerId,
    quote_number: quoteNumber,
    notes: data.notes,
  });
}

//send quotation
async function sendQuotation(userId, quotationId) {
  const quotation = await repo.findById(quotationId);

  assertOwnership(quotation, userId);
  assertStatus(quotation, "draft");

  return repo.updateStatus(quotationId, "sent");
}

//assert status
function assertStatus(quotation, expected) {
  if (quotation.status !== expected) {
    throw new Error(`Invalid status transition from ${quotation.status}`);
  }
}

//accept quotation
async function acceptQuotation(userId, quotationId) {
  const quotation = await repo.findById(quotationId);

  assertOwnership(quotation, userId);
  assertStatus(quotation, "sent");

  return repo.updateStatus(quotationId, "accepted");
}

//clone quotation
async function cloneQuotation(userId, quotationId) {
  const quotation = await repo.findById(quotationId);

  assertOwnership(quotation, userId);
  assertClonable(quotation.status);

  return repo.cloneAsDraft(quotationId, userId);
}

//recalculate totals
async function recalculateTotals(quotationId) {
  const totals = await repo.aggregateItems(quotationId);

  await repo.updateTotals(
    quotationId,
    totals.subTotal,
    totals.taxTotal,
    totals.grandTotal,
  );
}

exports.updateQuotation = async (id, userId, data) => {
  const quotation = await quotationRepo.findById(id);
  if (!quotation) throw new NotFoundError();

  // 🔒 AUTHORIZATION
  if (quotation.user_id !== userId) {
    throw new ForbiddenError();
  }

  if (quotation.status !== "draft") {
    throw new Error("Only draft quotations can be edited");
  }

  return quotationRepo.update(id, data);
};
