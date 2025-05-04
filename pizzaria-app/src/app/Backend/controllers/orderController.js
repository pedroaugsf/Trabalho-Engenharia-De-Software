const Order = require('../models/Order');

// Armazenamento em memória para pedidos
let orders = [];
let nextOrderId = 1;

// Criar um novo pedido
const createOrder = (req, res) => {
try {
  const { items, endereco, total } = req.body;
  
  // Validação básica
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Itens do pedido são obrigatórios' });
  }
  
  if (!endereco || endereco.trim().length < 10) {
    return res.status(400).json({ message: 'Endereço válido é obrigatório' });
  }
  
  // Criar novo pedido
  const newOrder = new Order(nextOrderId++, items, endereco, total);
  orders.push(newOrder);
  
  res.status(201).json({
    message: 'Pedido criado com sucesso',
    order: newOrder
  });
} catch (error) {
  res.status(500).json({ message: 'Erro ao criar pedido', error: error.message });
}
};

// Obter todos os pedidos
const getAllOrders = (req, res) => {
res.json(orders);
};

// Obter pedido por ID
const getOrderById = (req, res) => {
const id = parseInt(req.params.id);
const order = orders.find(o => o.id === id);

if (order) {
  res.json(order);
} else {
  res.status(404).json({ message: 'Pedido não encontrado' });
}
};

// Atualizar status do pedido
const updateOrderStatus = (req, res) => {
const id = parseInt(req.params.id);
const { status } = req.body;

const orderIndex = orders.findIndex(o => o.id === id);

if (orderIndex === -1) {
  return res.status(404).json({ message: 'Pedido não encontrado' });
}

// Validar status
const validStatus = ['pendente', 'preparando', 'a caminho', 'entregue', 'cancelado'];
if (!validStatus.includes(status)) {
  return res.status(400).json({ message: 'Status inválido' });
}

// Atualizar status
orders[orderIndex].status = status;

res.json({
  message: 'Status do pedido atualizado',
  order: orders[orderIndex]
});
};

module.exports = {
createOrder,
getAllOrders,
getOrderById,
updateOrderStatus
};
