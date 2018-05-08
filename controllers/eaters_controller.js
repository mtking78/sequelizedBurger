// *** Dependencies
// =============================================================
var express = require("express");
var db = require("../models");
var router = express.Router();

// *** Routes
// =============================================================

// Index Page (render all eaters to html)
router.get("/", function (req, res) {
    db.Eater.findAll({}).then(function(results) {
        var hbsObject = {
            eaters: results
        };
        // console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

// Add new eater to the db.
router.post("/api/eaters", function (req, res) {
    db.Eater.create({
        eater_name: req.body.eater_name
    }).then(function(results) {
        // Send back the ID of the new eater
        return res.json(results);
    });
});

module.exports = router;