import { Router } from "express";
import auth from "./auth.js";
import {
  createUser,
  getCurrentUser,
  login,
  updateUser,
} from "./auth.service.js";

const router = Router();

/**
 * Create an user
 * @auth none
 * @route {POST} /members
 * @bodyparam members MBR_TB
 * @returns members MBR_TB
 */

router.post("/members/create", async (req, res, next) => {
  try {
    const user = await createUser({ ...req.body, demo: false });
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
});

/**
 * Login
 * @auth none
 * @route {POST} /users/login
 * @bodyparam user User
 * @returns user User
 */
router.post("/members/login", async (req, res, next) => {
  try {
    const user = await login(req.body.user);
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

/**
 * Get current user
 * @auth required
 * @route {GET} /user
 * @returns user User
 */
router.get("/members", auth.required, async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.auth?.user?.id);
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

/**
 * Update user
 * @auth required
 * @route {PUT} /user
 * @bodyparam user User
 * @returns user User
 */
router.put("/members", auth.required, async (req, res, next) => {
  try {
    const user = await updateUser(req.body.user, req.auth?.user?.id);
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

export default router;
