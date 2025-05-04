const express = require('express');
const router = express.Router();
const pizzaController = require('../controllers/pizzaController');

// Rotas para pizzas
router.get('/', pizzaController.getAllPizzas);
router.get('/:id', pizzaController.getPizzaById);
router.get('/categoria/:categoria', pizzaController.getPizzasByCategory);

module.exports = router;
