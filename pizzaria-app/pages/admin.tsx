import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// Componentes de Ícones SVG
const IconLogout = () => (
<svg
  width="20"
  height="20"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
>
  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
  <polyline points="16 17 21 12 16 7"></polyline>
  <line x1="21" y1="12" x2="9" y2="12"></line>
</svg>
);

const IconDashboard = () => (
<svg
  width="20"
  height="20"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
>
  <rect x="3" y="3" width="7" height="7"></rect>
  <rect x="14" y="3" width="7" height="7"></rect>
  <rect x="14" y="14" width="7" height="7"></rect>
  <rect x="3" y="14" width="7" height="7"></rect>
</svg>
);

const IconOrders = () => (
<svg
  width="20"
  height="20"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
>
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
  <polyline points="14 2 14 8 20 8"></polyline>
  <line x1="16" y1="13" x2="8" y2="13"></line>
  <line x1="16" y1="17" x2="8" y2="17"></line>
  <polyline points="10 9 9 9 8 9"></polyline>
</svg>
);

const IconProducts = () => (
<svg
  width="20"
  height="20"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
>
  <circle cx="9" cy="21" r="1"></circle>
  <circle cx="20" cy="21" r="1"></circle>
  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
</svg>
);

const IconUsers = () => (
<svg
  width="20"
  height="20"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
>
  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
  <circle cx="9" cy="7" r="4"></circle>
  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
</svg>
);

interface Order {
id: number;
items: {
  pizza: {
    id: number;
    nome: string;
    preco: number;
  };
  tamanho: string;
  quantidade: number;
}[];
endereco: string;
total: number;
status: string;
data: string;
}

export default function AdminPanel() {
const [activeTab, setActiveTab] = useState("dashboard");
const [orders, setOrders] = useState<Order[]>([]);
const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
const [statusFilter, setStatusFilter] = useState("todos");
const [dateFilter, setDateFilter] = useState("todos");
const [loading, setLoading] = useState(true);
const router = useRouter();

// Cores profissionais
const colors = {
  primary: "#2C3E50", // Azul petróleo escuro
  secondary: "#34495E", // Azul petróleo
  accent: "#E74C3C", // Vermelho suave
  light: "#ECF0F1", // Cinza muito claro
  dark: "#2C3E50", // Azul petróleo escuro
  text: "#333333", // Cinza escuro para texto
  background: "#F8F9FA", // Cinza muito claro para fundo
  success: "#27AE60", // Verde para sucesso
  warning: "#F39C12", // Amarelo/laranja para avisos
  danger: "#C0392B", // Vermelho para perigo
};

// Verificar autenticação
useEffect(() => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole");

  if (!isLoggedIn || userRole !== "admin") {
    router.push("/login");
  } else {
    // Carregar pedidos do localStorage
    loadOrders();
  }
}, [router]);

// Carregar pedidos
const loadOrders = () => {
  try {
    const savedOrders = localStorage.getItem("pedidos");
    const parsedOrders = savedOrders ? JSON.parse(savedOrders) : [];
    setOrders(parsedOrders);
    setFilteredOrders(parsedOrders);
    setLoading(false);
  } catch (error) {
    console.error("Erro ao carregar pedidos:", error);
    setOrders([]);
    setFilteredOrders([]);
    setLoading(false);
  }
};

// Aplicar filtros
useEffect(() => {
  let result = [...orders];

  // Filtrar por status
  if (statusFilter !== "todos") {
    result = result.filter(order => order.status === statusFilter);
  }

  // Filtrar por data
  if (dateFilter !== "todos") {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    if (dateFilter === "hoje") {
      result = result.filter(order => {
        const orderDate = new Date(order.data);
        return orderDate >= today;
      });
    } else if (dateFilter === "semana") {
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      result = result.filter(order => {
        const orderDate = new Date(order.data);
        return orderDate >= weekAgo;
      });
    } else if (dateFilter === "mes") {
      const monthAgo = new Date(today);
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      
      result = result.filter(order => {
        const orderDate = new Date(order.data);
        return orderDate >= monthAgo;
      });
    }
  }

  // Ordenar por data (mais recente primeiro)
  result.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  setFilteredOrders(result);
}, [orders, statusFilter, dateFilter]);

// Atualizar status do pedido
const updateOrderStatus = (orderId: number, newStatus: string) => {
  const updatedOrders = orders.map(order => 
    order.id === orderId ? { ...order, status: newStatus } : order
  );
  
  setOrders(updatedOrders);
  localStorage.setItem("pedidos", JSON.stringify(updatedOrders));
};

// Logout
const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userName");
  router.push("/login");
};

// Estatísticas para o dashboard
const totalOrders = orders.length;
const pendingOrders = orders.filter(order => order.status === "pendente").length;
const completedOrders = orders.filter(order => order.status === "concluído").length;
const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

// Renderizar conteúdo com base na aba ativa
const renderContent = () => {
  switch (activeTab) {
    case "dashboard":
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4" style={{ borderLeftColor: colors.primary }}>
            <h3 className="text-lg font-semibold text-gray-500">Total de Pedidos</h3>
            <p className="text-3xl font-bold mt-2" style={{ color: colors.primary }}>{totalOrders}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4" style={{ borderLeftColor: colors.warning }}>
            <h3 className="text-lg font-semibold text-gray-500">Pedidos Pendentes</h3>
            <p className="text-3xl font-bold mt-2" style={{ color: colors.warning }}>{pendingOrders}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4" style={{ borderLeftColor: colors.success }}>
            <h3 className="text-lg font-semibold text-gray-500">Pedidos Concluídos</h3>
            <p className="text-3xl font-bold mt-2" style={{ color: colors.success }}>{completedOrders}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4" style={{ borderLeftColor: colors.accent }}>
            <h3 className="text-lg font-semibold text-gray-500">Receita Total</h3>
            <p className="text-3xl font-bold mt-2" style={{ color: colors.accent }}>
              R$ {totalRevenue.toFixed(2)}
            </p>
          </div>
        </div>
      );
    
    case "orders":
      return (
        <div>
          <div className="flex flex-wrap gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todos">Todos</option>
                <option value="pendente">Pendente</option>
                <option value="preparando">Preparando</option>
                <option value="a caminho">A caminho</option>
                <option value="concluído">Concluído</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todos">Todos</option>
                <option value="hoje">Hoje</option>
                <option value="semana">Última semana</option>
                <option value="mes">Último mês</option>
              </select>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Carregando pedidos...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">Nenhum pedido encontrado</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pedido
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Endereço
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                        <div className="text-sm text-gray-500">
                          {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(order.data).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(order.data).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {order.endereco}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          R$ {order.total.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${order.status === 'concluído' ? 'bg-green-100 text-green-800' : 
                            order.status === 'cancelado' ? 'bg-red-100 text-red-800' : 
                            order.status === 'a caminho' ? 'bg-blue-100 text-blue-800' : 
                            order.status === 'preparando' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded-md text-sm"
                        >
                          <option value="pendente">Pendente</option>
                          <option value="preparando">Preparando</option>
                          <option value="a caminho">A caminho</option>
                          <option value="concluído">Concluído</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
    
    case "products":
      return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Gerenciamento de Produtos</h2>
          <p className="text-gray-500">
            Esta funcionalidade estará disponível em breve. Aqui você poderá adicionar, editar e remover produtos do cardápio.
          </p>
        </div>
      );
    
    case "users":
      return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Gerenciamento de Usuários</h2>
          <p className="text-gray-500">
            Esta funcionalidade estará disponível em breve. Aqui você poderá gerenciar usuários e permissões.
          </p>
        </div>
      );
    
    default:
      return null;
  }
};

return (
  <div className="min-h-screen flex" style={{ backgroundColor: colors.background }}>
    {/* Sidebar */}
    <div className="w-64 bg-white shadow-md">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div
            className="w-10 h-10 rounded-md flex items-center justify-center"
            style={{ backgroundColor: colors.accent }}
          >
            <span className="text-white font-bold">PZ</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold" style={{ color: colors.primary }}>
              Pizzaria Artesanal
            </h1>
            <p className="text-xs text-gray-500">Painel de Controle</p>
          </div>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <button
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md transition-colors ${
                activeTab === "dashboard"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              <IconDashboard />
              <span>Dashboard</span>
            </button>
          </li>
          <li>
            <button
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md transition-colors ${
                activeTab === "orders"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              <IconOrders />
              <span>Pedidos</span>
            </button>
          </li>
          <li>
            <button
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md transition-colors ${
                activeTab === "products"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("products")}
            >
              <IconProducts />
              <span>Produtos</span>
            </button>
          </li>
          <li>
            <button
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md transition-colors ${
                activeTab === "users"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("users")}
            >
              <IconUsers />
              <span>Usuários</span>
            </button>
          </li>
        </ul>
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t">
        <button
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={handleLogout}
        >
          <IconLogout />
          <span>Sair</span>
        </button>
      </div>
    </div>

    {/* Main Content */}
    <div className="flex-1 p-8 overflow-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold" style={{ color: colors.primary }}>
          {activeTab === "dashboard" && "Dashboard"}
          {activeTab === "orders" && "Gerenciamento de Pedidos"}
          {activeTab === "products" && "Gerenciamento de Produtos"}
          {activeTab === "users" && "Gerenciamento de Usuários"}
        </h1>
        
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            Ver site
          </Link>
          <div className="text-sm text-gray-700">
            Olá, <span className="font-medium">Administrador</span>
          </div>
        </div>
      </div>

      {renderContent()}
    </div>
  </div>
);
}
