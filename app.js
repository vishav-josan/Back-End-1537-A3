const express = require('express');
const cors = require('cors');
const app = express();



app.use(cors());

app.use(express.json());

const unicornModel = require('./models/unicorns.js');
var selectionArgument = {};
app.post('/search', async (req, res) => {
    var result = {};

    var projectionArgument = {};
    console.log(req.body);
    if (req.body.type === 'nameSearch') {

        selectionArgument = {}
        if (req.body.name) {
            selectionArgument = {
                name: req.body.name
            }
        }

        result = await unicornModel.find(selectionArgument);

        // var projectionArgument = {};
        // if(req.body.projectionFilters.name == true && req.body.projectionFilters.weight == false) {
        //     projectionArgument = {"name" : 1, "_id" : 0};
        // } else {
        //     //todo
        // }


        res.json(result);


    } else if (req.body.type === 'weightSearch') {

        var minWeight = parseInt(req.body.minWeight);
        var maxWeight = parseInt(req.body.maxWeight);
        selectionArgument = {};

        if (req.body.minWeight && req.body.maxWeight) {
            selectionArgument = {
                weight: {
                    $gte: minWeight,
                    $lte: maxWeight
                }
            }
        } else if (req.body.minWeight) {
            selectionArgument = {
                weight: {
                    $gte: minWeight
                }
            }
        } else if (req.body.maxWeight) {
            selectionArgument = {
                weight: {
                    $lte: maxWeight
                }
            }
        } else {
            selectionArgument = {};
        }

        console.log(req.body.minWeight);
        console.log(selectionArgument);
        result = await unicornModel.find(selectionArgument);
        res.json(result);


    } else if (req.body.type === 'foodSearch') {
        selectionArgument = {};

        if (req.body.loves.length == 2) {
            selectionArgument = {
                loves: { $all: req.body.loves }
            }
        } else if (req.body.loves) {
            selectionArgument = {
                loves: req.body.loves
            }
        } else {
            selectionArgument = {};
        }

        result = await unicornModel.find(selectionArgument);
        res.json(result);
    }

    if (req.body.type === 'nameFilter') {

        projectionArgument = req.body.projectionFilters;
        result = await unicornModel.find(selectionArgument, projectionArgument);
        res.json(result);

    } else if (req.body.type === 'weightFilter') {

        console.log("this definitely works")
        projectionArgument = req.body.projectionFilters;
        result = await unicornModel.find(selectionArgument, projectionArgument);
        res.json(result);
    } else if (req.body.type === 'nameAndWeightFilter') {
        console.log("this definitely works")
        projectionArgument = req.body.projectionFilters;
        result = await unicornModel.find(selectionArgument, projectionArgument);
        res.json(result);
    } else if (req.body.type === 'noFilter') {
        console.log("this definitely works")
        result = await unicornModel.find(selectionArgument);
        res.json(result);
    }




});

module.exports = app;