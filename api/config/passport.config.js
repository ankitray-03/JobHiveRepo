// Google authentication logic

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
// import generateToken from "../utils/generateTokenAndSetCookies.js";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists in our db with the given profile ID
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // If not, create a new user
          const randomPassword = crypto.randomBytes(16).toString("hex");
          const hashedPassword = await bcrypt.hash(randomPassword, 10);
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            password: hashedPassword,
          });

          await user
            .save()
            .then(() => {})
            .catch((err) => console.log(err));
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7D",
        });
        // const token = generateToken(user._id);

        done(null, { id: user._id, token, user });
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// serialize user
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// deserialize user
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
