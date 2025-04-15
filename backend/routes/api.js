// routes/api.js
import { Router } from "express";

const router = Router();

function isLoggedIn(req, res, next) {
  if (req.user) return next();
  res.status(401).send({ error: "Not authenticated" });
}

router.get("/dashboard", isLoggedIn, (req, res) => {
  res.send({ message: `Welcome ${req.user.name}` });
});

export default router;
