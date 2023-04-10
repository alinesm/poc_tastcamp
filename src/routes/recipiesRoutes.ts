import { Router } from "express";
import {
  createRecipie,
  deleteRecipie,
  listRecipies,
  updateRecipie,
} from "../controllers/recipiesControllers";
import { validateSchema } from "../middlewares/validateSchema";
import { receitaSchema } from "../schemas/recipieSchema";

const recipiesRouter = Router();

recipiesRouter.post("/", validateSchema(receitaSchema), createRecipie);
recipiesRouter.get("/", listRecipies);
recipiesRouter.put("/:id", updateRecipie);
recipiesRouter.delete("/:id", deleteRecipie);

export default recipiesRouter;
