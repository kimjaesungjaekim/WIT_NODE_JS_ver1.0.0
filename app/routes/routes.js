import { Router } from "express";
import authController from "./auth/auth.controller.js";
import boardController from "./board/board.controller.js";
const api = Router().use(authController).use(boardController);

export default Router().use("/api", api);
