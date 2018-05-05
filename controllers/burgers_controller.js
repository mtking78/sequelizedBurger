// *** Dependencies
// =============================================================
var express = require("express");
var db = require("../models");
var router = express.Router();

// *** Routes
// =============================================================

// Index Redirect
// router.get("/", function (req, res) {
//     res.redirect("/index");
// })

// Index Page (render all burgers to html)
router.get("/", function (req, res) {
    db.Burger.findAll({}).then(function(results) {
        var hbsObject = {
            burgers: results
        };
        // console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

// Add new burger to the db.
router.post("/api/burgers", function (req, res) {
    db.Burger.create({
        burger_name: req.body.burger_name, 
        devoured: req.body.devoured
    }).then(function(results) {
        // Send back the ID of the new burger
        return res.json(results);
    });
});

// Set burger devoured status to true.
router.put("/api/burgers/:id", function(req, res) {
    db.Burger.update({
        devoured: req.body.devoured
    }, {where: {
        id: req.params.id
    }}).then(function(dbBurger) {
        if (dbBurger.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404.
            return res.status(404).end();
        } else {
            res.json(dbBurger);
            res.status(200).end();
        }
    });
});

// Delete burger from db.
router.delete("/api/burgers/:id", function(req, res) {
    db.Burger.destroy({where: {id: req.params.id}}).then(function(results) {
        if (results.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404.
            return res.status(404).end();
        } else {
            return res.json(results);
            res.status(200).end();
        }
    });
});

module.exports = router;