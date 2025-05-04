const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Importar rotas
const pizzaRoutes = require('./routes/pizzaRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/api/pizzas', pizzaRoutes);
app.use('/api/orders', orderRoutes);

// Rota base
app.get('/', (req, res) => {
res.send('API da Pizzaria Artesanal está funcionando!');
});

// Iniciar servidor
app.listen(PORT, () => {
console.log(`Servidor rodando na porta ${PORT}`);
});
