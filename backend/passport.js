import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config(); 

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refershToken, profile, callback) {
      callback(null, profile);
    }
  )
);

passport.serializeUser((user,done)=>{
    done(null,user);
})
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});
