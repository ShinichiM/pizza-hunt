const { Pizza } = require('../models');

const pizzaController = {
    // get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one pizza by id
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(400).json({ message: 'No pizza found with this id' });
                }
                res.json(dbPizzaData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    createPizza({ body }, res) {
        Pizza.create(body)
            .then(pizzaData => res.json(pizzaData))
            .catch(err => res.status(400).json(err))
    },
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id}, body, { new: true })
            .then(dbPizzaData => {
                if(!dbPizzaData) {
                    res.status(400).json({ message: 'No Pizza found with this ID' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err))
    },
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if(!dbPizzaData) {
                    res.status(400).json({ message: 'No Pizza found with this ID' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;