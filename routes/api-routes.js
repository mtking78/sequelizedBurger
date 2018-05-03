// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Burger model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

    // GET route for getting all of the burgers
    app.get("/api/burgers", function(req, res) {
        // Retrieve all of the burgers from the database and res.json them back to the user
        db.Burger.findAll({}).then(function(results) {
        return res.json(results);
        });
    });

    // POST route for saving a new burger. We can create a burger with the data in req.body
    app.post("/api/burgers", function(req, res) {
        // Create a new burger and save it to the database and then res.json back the new burger to the user
        db.Burger.create({burger_name: req.body.burger_name, devoured: req.body.devoured}).then(function(results) {
        return res.json(results);
        });
    });

    // DELETE route for deleting burgers. We can get the id of the burger to be deleted from req.params.id
    app.delete("/api/burgers/:id", function(req, res) {
        db.Burger.destroy({ where: { id: req.params.id } }).then(function(results) {
        return res.json(results);
        });
    });

    // PUT route for updating burgers. We can get the updated burger data from req.body
    app.put("/api/burgers", function(req, res) {
        db.Burger.update({
                burger_name: req.body.burger_name, 
                devoured: req.body.devoured
        }, {where: {
                id: req.body.id
        }}).then(function(dbBurger) {
                res.json(dbBurger);
        });
    });
};