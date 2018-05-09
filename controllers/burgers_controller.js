// *** Dependencies
// =============================================================
var express = require("express");
var db = require("../models");
var router = express.Router();

// *** Routes
// =============================================================

// Index Page (render all burgers to html)
router.get("/", function (req, res) {
    // Pull all burger data from its table,
    db.Burger.findAll({
        include: [{
            model: db.Eater
        }]
    }).then(function(burgers) {
        // Now pull all eater data from its table,
        db.Eater.findAll({}).then(function(eaters){
            // Display from both tables simultaneously
            res.render("indexMO", {burgers: burgers, eaters:eaters});
        });
    });
});

// Add new burger to the db.
router.post("/burgers/create", function (req, res) {
    db.Burger.create({
        burger_name: req.body.burger_name
    }).then(function(results) {
        // Reload page with new data
        res.redirect("/");
    });
});

// Add new eater to the db.
router.post("/eaters/create", function (req, res) {
    db.Eater.create({
        eater_name: req.body.eater_name
    }).then(function(results) {
        // Reload page with new data
        res.redirect("/");
    });
});

// Set burger devoured status to true.
router.post("/burgers/update", function(req, res) {
    console.log(req.body);
    db.Burger.update({
        devoured: true,
        EaterId: req.body.eaterID
    }, {where: {
        // Update foreign key to whichever eater was selected.
        id: req.body.burger_id
    }}).then(function(dbBurger) {
        if (dbBurger.changedRows === 0) {
            return res.status(404).end();
        } else {
            // Reload page with new data
            res.redirect("/");
        }
    });
});

router.get("/api/:eatername", function (req, res) {
    console.log(req.body);
    db.Eater.findOne({
        where: {
            eater_name: req.params.eatername
        },
        include: [{
            model: db.Burger
        }]
    }).then(function(results) {
        res.json(results);
    });
});

// Delete burger from db.
router.delete("/burgers/delete", function(req, res) {
    db.Burger.destroy({
        where: {
            id: req.body.burger_id
        }}).then(function(results) {
        if (results.changedRows === 0) {
            return res.status(404).end();
        } else {
            // // Reload page with new data
            res.redirect("/");
        }
    });
});

module.exports = router;