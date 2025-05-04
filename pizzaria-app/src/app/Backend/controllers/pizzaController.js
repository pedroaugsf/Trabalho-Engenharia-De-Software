const pizzas = require('../data/pizzas');

// Obter todas as pizzas
const getAllPizzas = (req, res) => {
res.json(pizzas);
};

// Obter pizza por ID
const getPizzaById = (req, res) => {
const id = parseInt(req.params.id);
const pizza = pizzas.find(p => p.id === id);

if (pizza) {
  res.json(pizza);
} else {
  res.status(404).json({ message: 'Pizza não encontrada' });
}
};

// Obter pizzas por categoria
const getPizzasByCategory = (req, res) => {
const { categoria } = req.params;

if (categoria.toLowerCase() === 'todas') {
  return res.json(pizzas);
}

const filteredPizzas = pizzas.filter(
  p => p.categoria.toLowerCase() === categoria.toLowerCase()
);

res.json(filteredPizzas);
};

module.exports = {
getAllPizzas,
getPizzaById,
getPizzasByCategory
};
