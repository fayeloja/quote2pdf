// src/modules/quotations/quotation.routes.js
import Router from "express";
import controller from "./quotation.controller.js";
import authMiddleware from "../../middlewares/auth.js";
// handles URL + middleware

Router.post(
  "/quotations/:quotationId/items",
  authMiddleware,
  controller.create,
);

Router.get("/quotations/:quotationId/items", authMiddleware, controller.getAll);

Router.put(
  "/quotations/:quotationId/items/:itemId",
  authMiddleware,
  controller.update,
);

Router.delete(
  "/quotations/:quotationId/items/:itemId",
  authMiddleware,
  controller.remove,
);
