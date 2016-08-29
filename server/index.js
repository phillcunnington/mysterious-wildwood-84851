const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const logger = require("morgan");

const fallback = require("express-history-api-fallback");
const root = `${__dirname}/../public`;

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_REDIRECT_URI
    },
    function(accessToken, refreshToken, profile, done) {
        done(null, profile.id);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.use(logger(process.env.HTTP_LOGGING_FORMAT));

// Express authentication setup
const session = require("express-session");

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile"] }));

app.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/loginFailed" }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect("/app");
    });

function authenticate(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

app.get("/", function (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect("/app");
    } else {
        return next();
    }
});

app.use(express.static("public"));

app.all("/app", authenticate);

app.use(fallback("index.html", { root }));

app.listen(port);
