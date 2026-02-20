// quotationItem.routes.js
router.post(
  "/quotations/:quotationId/items",
  authMiddleware,
  controller.create,
);

router.get("/quotations/:quotationId/items", authMiddleware, controller.list);

router.put(
  "/quotations/:quotationId/items/:itemId",
  authMiddleware,
  controller.update,
);

router.delete(
  "/quotations/:quotationId/items/:itemId",
  authMiddleware,
  controller.remove,
);
