import { Router } from "express";
import {
  generateNewShortURL,
  redirectURL,
  getAnalytics,
} from "../controllers/url.controller.js";

const router = Router();

router.route("/url").post(generateNewShortURL);
router.route("/analytics/:shortId").get(getAnalytics); // must be ABOVE /:shortId to avoid collisions
router.route("/:shortId").get(redirectURL);

export { router };
