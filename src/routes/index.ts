import { Router } from "express";
import recipiesRoutes from "./recipiesRoutes";

const routes = Router();

routes.use("/recipies", recipiesRoutes);

export default routes;
