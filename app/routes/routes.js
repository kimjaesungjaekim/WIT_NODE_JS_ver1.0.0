import { Router } from "express";
import authController from "./auth/auth.controller.js";
import boardController from "./board/board.controller.js";
import commentsController from "./comments/comments.controller.js";
const api = Router().use(authController).use(boardController).use(commentsController);

export default Router().use("/api", api);
