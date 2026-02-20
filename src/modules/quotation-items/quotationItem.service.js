async function addItem(userId, quotationId, data) {
  const quotation = await quotationRepo.findById(quotationId);

  assertExists(quotation);
  assertOwnership(quotation, userId);
  assertEditable(quotation);

  const item = await itemRepo.create({
    quotation_id: quotationId,
    ...data,
  });

  await quotationService.recalculateTotals(quotationId);

  return item;
}

async function updateItem(userId, quotationId, itemId, data) {
  const quotation = await quotationRepo.findById(quotationId);

  assertOwnership(quotation, userId);
  assertEditable(quotation);

  const item = await itemRepo.update(itemId, quotationId, data);

  await quotationService.recalculateTotals(quotationId);

  return item;
}

async function removeItem(userId, quotationId, itemId) {
  const quotation = await quotationRepo.findById(quotationId);

  assertOwnership(quotation, userId);
  assertEditable(quotation);

  await itemRepo.remove(itemId, quotationId);

  await quotationService.recalculateTotals(quotationId);
}

async function listItems(userId, quotationId) {
  const quotation = await quotationRepo.findById(quotationId);

  assertOwnership(quotation, userId);

  return itemRepo.findByQuotationId(quotationId);
}

async function listItems(userId, quotationId) {
  const quotation = await quotationRepo.findById(quotationId);

  assertOwnership(quotation, userId);

  return itemRepo.findByQuotationId(quotationId);
}

function assertOwnership(entity, userId) {
  if (entity.user_id !== userId) {
    throw new ForbiddenError();
  }
}
