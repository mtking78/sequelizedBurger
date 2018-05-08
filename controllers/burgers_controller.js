// *** Dependencies
// =============================================================
var express = require("express");
var db = require("../models");
var router = express.Router();

// *** Routes
// =============================================================

// Index Page (render all burgers to html)
router.get("/", function (req, res) {
    db.Burger.findAll({
        include: [{
            model: db.Eater
        }]
    }).then(function(results) {
        // ***** Use "index" AND events.js MUST be included in main.handlebars
        // ***** Use "indexMO" will not require events.js
        // res.render("index", {burgers: results});
        res.render("indexMO", {burgers: results});
    });
});

// Add new burger to the db.
router.post("/burgers/create", function (req, res) {
    db.Burger.create({
        burger_name: req.body.burger_name
    }).then(function(results) {
        // Send back the ID of the new burger
        // return res.json(results);
        res.redirect("/");
    });
});

// Set burger devoured status to true.
// router.put("/api/burgers/:id", function(req, res) {
router.put("/burgers/update", function(req, res) {
    db.Burger.update({
        devoured: true
    }, {where: {
        // id: req.params.id
        id: req.body.burger_id
    }}).then(function(dbBurger) {
        if (dbBurger.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404.
            return res.status(404).end();
        } else {
            // res.json(dbBurger);
            res.redirect("/");
            // res.status(200).end();
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
// router.delete("/api/burgers/:id", function(req, res) {
router.delete("/burgers/delete", function(req, res) {
    // db.Burger.destroy({where: {id: req.params.id}}).then(function(results) {
    db.Burger.destroy({
        where: {
            id: req.body.burger_id
        }}).then(function(results) {
        if (results.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404.
            return res.status(404).end();
        } else {
            // return res.json(results);
            res.redirect("/");
            // res.status(200).end();
        }
    });
});

// // Set burger devoured status to true WITH eater included.
// router.put("/:id", function(req, res) {
//     var id = req.params.id;
//     db.Eater.findOne({
//         where: {
//             eater_name: req.body.eater
//         }
//     }).then(function(eater) {
//         if (eater) {
//             updateBurger(eater, id, req, res);
//         } else {
//             db.Eater.create({
//                 eater_name: req.body.eater
//             }).then(function(eater) {
//                 updateBurger(eater, id, req, res);
//             });
//         };
//     });
// });

// function updateBurger(eater, id, req, res) {
//     db.Burger.update({
//         devoured: req.body.devoured,
//         EaterId: eater.id
//     }, {
//         where: {
//             id: id
//         }
//     }).then(function(results) {
//         if (results.changedRows === 0) {
//             // If no rows were changed, then the ID must not exist, so 404.
//             return res.status(404).end();
//         } else {
//             return res.json(results);
//             res.status(200).end();
//         }
//     });
// }

module.exports = router;