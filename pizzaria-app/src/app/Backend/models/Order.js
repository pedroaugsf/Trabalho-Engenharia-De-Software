class Order {
constructor(id, items, endereco, total, status = 'pendente') {
  this.id = id;
  this.items = items;
  this.endereco = endereco;
  this.total = total;
  this.status = status;
  this.createdAt = new Date();
}
}

module.exports = Order;
