import { Router } from "express";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config(); 
const router = Router();

router.get("/login/success", (req, res) => {
  if (req.user) {
    res
      .status(200)
      .json({ error: false, message: "Successfully Loged In", user: req.user });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_URL}/dashboard`,
    failureRedirect: "/login/failed",
  })
);

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect(process.env.CLIENT_URL);
});

export default router;
