
function initMongoose() {
    const mongoose = require("mongoose");
    mongoose.Promise = require("bluebird");
    mongoose.set("debug", true);
    return mongoose;
}

function initUserModel(mongoose) {
    return mongoose.model("Users", {
        google_id: String
    });
}

function initPassport(User) {
    const passport = require("passport");
    const GoogleStrategy = require("passport-google-oauth20").Strategy;

    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_REDIRECT_URI
        },
        function(accessToken, refreshToken, profile, done) {
            console.log("user: " + profile.id);
            User.findOne({ "google_id": profile.id })
                .select("_id google_id")
                .exec(function(err, user) {
                    done(err, user);
                });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    return passport;
}

module.exports = {
    "init": function () {

        const mongoose = initMongoose();
        const User = initUserModel(mongoose);
        const passport = initPassport(User);

        return function (app) {
            mongoose.connect(process.env.MONGODB_URI);

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

            app.get("/auth/logout", function(req, res) {
                req.logout();
                res.redirect("/");
            });
        }
    },

    "enforceAuthentication": function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/");
    },

    "forwardIfAuthenticated": function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect("/app");
        } else {
            return next();
        }
    }
};
