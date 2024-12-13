import express from 'express';
import { assignSupport, createSupport, deleteSupportById, getAllSupport, getSupportById, upadateSupportStatus, updateSupportById } from '../controllers/supportController.js';

const supportRouter = express.Router();

supportRouter.post("/", createSupport);
supportRouter.get("/", getAllSupport);
supportRouter.get("/:id", getSupportById);
supportRouter.put("/:id", updateSupportById);
supportRouter.delete("/:id", deleteSupportById);
supportRouter.put("/:id/assign", assignSupport);
supportRouter.put("/:id/status", upadateSupportStatus);



export default supportRouter;