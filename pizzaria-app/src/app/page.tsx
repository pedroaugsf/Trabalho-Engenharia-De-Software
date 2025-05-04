"use client";

import { useState, useEffect } from "react";
import axios from "axios";

// Componentes de Ícones SVG
const IconCart = () => (
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

const IconUser = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const IconStar = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
  </svg>
);

const IconClock = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const IconMapPin = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

interface Pizza {
  id: number;
  nome: string;
  descricao: string;
  ingredientes: string[];
  preco: number;
  tamanhos: { nome: string; preco: number }[];
  imagem: string;
  categoria: string;
  tempoPreparo: number;
  avaliacao: number;
}

export default function Home() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [carrinho, setCarrinho] = useState<
    { pizza: Pizza; tamanho: string; quantidade: number }[]
  >([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");
  const [busca, setBusca] = useState("");
  const [endereco, setEndereco] = useState("");
  const [enderecoValido, setEnderecoValido] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pedidoStatus, setPedidoStatus] = useState<string | null>(null);

  // URL base da API
  const API_URL = "http://localhost:5000/api";

  // Cores profissionais atualizadas
  const colors = {
    primary: "#2C3E50", // Azul petróleo escuro
    secondary: "#34495E", // Azul petróleo
    accent: "#E74C3C", // Vermelho suave (para calls-to-action)
    light: "#ECF0F1", // Cinza muito claro
    dark: "#2C3E50", // Azul petróleo escuro
    text: "#333333", // Cinza escuro para texto
    background: "#F8F9FA", // Cinza muito claro para fundo
    success: "#27AE60", // Verde para sucesso
    warning: "#F39C12", // Amarelo/laranja para avisos
    icon: "#FFFFFF", // Branco para ícones (novo)
  };

  // Validação do endereço
  useEffect(() => {
    setEnderecoValido(endereco.trim().length >= 10);
  }, [endereco]);

  // Buscar pizzas da API
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        setLoading(true);
        setError(null);

        // Tenta buscar as pizzas da API
        const response = await axios.get(`${API_URL}/pizzas`);
        setPizzas(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar pizzas da API:", err);
        setError("Não foi possível carregar as pizzas. Usando dados locais.");

        // Fallback para dados mockados em caso de erro
        const pizzasMock: Pizza[] = [
          // Tradicionais
          {
            id: 1,
            nome: "Margherita Classica",
            descricao:
              "Molho de tomate San Marzano, mussarela de búfala e manjericão fresco",
            ingredientes: [
              "Molho de tomate premium",
              "Mussarela de búfala",
              "Manjericão fresco",
              "Azeite extra virgem",
            ],
            preco: 59.9,
            tamanhos: [
              { nome: "Pequena (25cm)", preco: 49.9 },
              { nome: "Média (30cm)", preco: 59.9 },
              { nome: "Grande (35cm)", preco: 69.9 },
            ],
            imagem:
              "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
            categoria: "Tradicionais",
            tempoPreparo: 12,
            avaliacao: 4.8,
          },
          // ... outros dados mockados (mantidos para fallback)
          {
            id: 2,
            nome: "Pepperoni Supreme",
            descricao: "Pepperoni de primeira qualidade com extra de queijo",
            ingredientes: [
              "Molho de tomate",
              "Mussarela",
              "Pepperoni",
              "Orégano",
            ],
            preco: 65.9,
            tamanhos: [
              { nome: "Pequena (25cm)", preco: 55.9 },
              { nome: "Média (30cm)", preco: 65.9 },
              { nome: "Grande (35cm)", preco: 75.9 },
            ],
            imagem: "https://images.unsplash.com/photo-1555072956-7758afb20e8f",
            categoria: "Tradicionais",
            tempoPreparo: 15,
            avaliacao: 4.7,
          },
          // ... adicione as outras pizzas do mock aqui
        ];
        setPizzas(pizzasMock);
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  // Buscar pizzas por categoria
  useEffect(() => {
    const fetchPizzasByCategory = async () => {
      if (categoriaAtiva === "Todas") {
        try {
          const response = await axios.get(`${API_URL}/pizzas`);
          setPizzas(response.data);
        } catch (err) {
          console.error("Erro ao buscar todas as pizzas:", err);
          // Não alteramos o estado das pizzas em caso de erro aqui
        }
      } else {
        try {
          const response = await axios.get(
            `${API_URL}/pizzas/categoria/${categoriaAtiva}`
          );
          setPizzas(response.data);
        } catch (err) {
          console.error(
            `Erro ao buscar pizzas da categoria ${categoriaAtiva}:`,
            err
          );
          // Filtramos localmente em caso de erro na API
          const pizzasFiltradas = pizzas.filter(
            (p) => p.categoria === categoriaAtiva
          );
          setPizzas(pizzasFiltradas);
        }
      }
    };

    // Só fazemos a chamada se já tivermos carregado as pizzas inicialmente
    if (!loading && pizzas.length > 0) {
      fetchPizzasByCategory();
    }
  }, [categoriaAtiva]);

  const categorias = [
    "Todas",
    "Tradicionais",
    "Premium",
    "Vegetarianas",
    "Doces",
    "Especiais",
  ];

  const adicionarAoCarrinho = (pizza: Pizza, tamanho: string) => {
    setCarrinho((prev) => {
      const existingItem = prev.find(
        (item) => item.pizza.id === pizza.id && item.tamanho === tamanho
      );

      if (existingItem) {
        return prev.map((item) =>
          item.pizza.id === pizza.id && item.tamanho === tamanho
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        const precoTamanho =
          pizza.tamanhos.find((t) => t.nome === tamanho)?.preco || pizza.preco;
        return [
          ...prev,
          {
            pizza: { ...pizza, preco: precoTamanho },
            tamanho,
            quantidade: 1,
          },
        ];
      }
    });
    setCarrinhoAberto(true);
  };

  const removerDoCarrinho = (id: number, tamanho: string) => {
    setCarrinho((prev) =>
      prev.filter((item) => !(item.pizza.id === id && item.tamanho === tamanho))
    );
  };

  const atualizarQuantidade = (
    id: number,
    tamanho: string,
    quantidade: number
  ) => {
    if (quantidade < 1) return;

    setCarrinho((prev) =>
      prev.map((item) =>
        item.pizza.id === id && item.tamanho === tamanho
          ? { ...item, quantidade }
          : item
      )
    );
  };

  const calcularTotal = () => {
    return carrinho.reduce(
      (total, item) => total + item.pizza.preco * item.quantidade,
      0
    );
  };

  const calcularFrete = () => {
    if (!enderecoValido) return 0;
    return calcularTotal() > 80 ? 0 : 8;
  };

  const calcularTotalComFrete = () => {
    return calcularTotal() + calcularFrete();
  };

  // Função para finalizar o pedido
  const finalizarPedido = async () => {
    if (calcularTotal() === 0 || !enderecoValido) return;

    try {
      setPedidoStatus("enviando");

      const orderData = {
        items: carrinho,
        endereco: endereco,
        total: calcularTotalComFrete(),
      };

      const response = await axios.post(`${API_URL}/orders`, orderData);

      setPedidoStatus("sucesso");
      alert(`Pedido #${response.data.order.id} realizado com sucesso!`);

      // Limpar o carrinho após o pedido bem-sucedido
      setCarrinho([]);
      setCarrinhoAberto(false);

      // Resetar o status após 3 segundos
      setTimeout(() => {
        setPedidoStatus(null);
      }, 3000);
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
      setPedidoStatus("erro");
      alert("Erro ao finalizar pedido. Tente novamente.");

      // Resetar o status após 3 segundos
      setTimeout(() => {
        setPedidoStatus(null);
      }, 3000);
    }
  };

  // Filtra as pizzas por busca
  const pizzasFiltradas = pizzas.filter((pizza) => {
    const correspondeBusca =
      pizza.nome.toLowerCase().includes(busca.toLowerCase()) ||
      pizza.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      pizza.ingredientes.join(" ").toLowerCase().includes(busca.toLowerCase());
    return correspondeBusca;
  });

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      {/* Header com ícones mais visíveis */}
      <header
        className="sticky top-0 z-50 shadow-sm"
        style={{ backgroundColor: colors.primary }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-md flex items-center justify-center"
                style={{ backgroundColor: colors.accent }}
              >
                <span className="text-white font-bold">PZ</span>
              </div>
              <h1 className="text-xl font-semibold text-white">
                Pizzaria Artesanal
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                className="p-2 rounded-md hover:bg-opacity-20 hover:bg-white transition-colors"
                style={{ color: colors.icon }}
              >
                <IconUser />
              </button>
              <button
                className="p-2 rounded-md hover:bg-opacity-20 hover:bg-white transition-colors relative"
                onClick={() => setCarrinhoAberto(!carrinhoAberto)}
                style={{ color: colors.icon }}
              >
                <IconCart />
                {carrinho.length > 0 && (
                  <span
                    className="absolute -top-1 -right-1 bg-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                    style={{ color: colors.accent }}
                  >
                    {carrinho.reduce(
                      (total, item) => total + item.quantidade,
                      0
                    )}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Barra de endereço melhorada */}
      <div className="bg-white py-3 px-6 border-b border-gray-100">
        <div className="container mx-auto">
          <div className="flex items-center">
            <IconMapPin className="mr-2" style={{ color: colors.primary }} />
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Informe seu endereço completo para entrega"
                className="w-full outline-none text-sm placeholder-gray-400 pr-10"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                style={{ color: colors.text }}
              />
              {endereco && (
                <button
                  className="absolute right-0 top-0 text-gray-400 hover:text-gray-600"
                  onClick={() => setEndereco("")}
                >
                  ×
                </button>
              )}
            </div>
          </div>
          {endereco && !enderecoValido && (
            <p className="text-xs text-red-500 mt-1 ml-6">
              Por favor, informe um endereço completo (mínimo 10 caracteres)
            </p>
          )}
          {enderecoValido && (
            <p className="text-xs text-green-600 mt-1 ml-6">
              Endereço válido! Frete:{" "}
              {calcularFrete() === 0
                ? "Grátis"
                : `R$ ${calcularFrete().toFixed(2)}`}
            </p>
          )}
        </div>
      </div>

      {/* Destaque */}
      <div
        className="py-3 px-6 text-center text-sm"
        style={{ backgroundColor: colors.light, color: colors.primary }}
      >
        <p>
          Frete grátis para pedidos acima de R$ 80 • Entrega em até 45 minutos
        </p>
      </div>

      {/* Mensagem de erro da API */}
      {error && (
        <div className="py-2 px-6 text-center text-sm bg-red-100 text-red-700">
          <p>{error}</p>
        </div>
      )}

      {/* Filtros */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-wrap gap-2">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                categoriaAtiva === categoria
                  ? "text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setCategoriaAtiva(categoria)}
              style={{
                backgroundColor:
                  categoriaAtiva === categoria ? colors.primary : "transparent",
              }}
            >
              {categoria}
            </button>
          ))}
        </div>
      </div>

      {/* Barra de busca */}
      <div className="container mx-auto px-6 pb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar pizzas..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{ color: colors.text }}
          />
          <div className="absolute left-3 top-2.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#95A5A6"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
      </div>

      {/* Listagem de produtos */}
      <main className="container mx-auto px-6 pb-16">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Carregando pizzas...</p>
          </div>
        ) : pizzasFiltradas.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Nenhuma pizza encontrada para os filtros selecionados
            </p>
            <button
              className="mt-4 px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: colors.primary,
                color: "white",
              }}
              onClick={() => {
                setCategoriaAtiva("Todas");
                setBusca("");
              }}
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pizzasFiltradas.map((pizza) => (
              <div
                key={pizza.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={pizza.imagem}
                    alt={pizza.nome}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                  <div className="absolute bottom-3 left-3 text-white text-sm font-medium">
                    <span className="flex items-center">
                      <IconStar className="mr-1 text-yellow-400" />
                      {pizza.avaliacao}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 text-white text-sm font-medium flex items-center">
                    <IconClock className="mr-1" />
                    {pizza.tempoPreparo} min
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3
                      className="font-semibold text-gray-800"
                      style={{ color: colors.text }}
                    >
                      {pizza.nome}
                    </h3>
                    <span
                      className="font-bold"
                      style={{ color: colors.primary }}
                    >
                      R$ {pizza.preco.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">
                    {pizza.descricao}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Ingredientes selecionados
                    </h4>
                    <p className="text-sm text-gray-600">
                      {pizza.ingredientes.join(", ")}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Tamanhos disponíveis
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {pizza.tamanhos.map((tamanho) => (
                        <button
                          key={tamanho.nome}
                          className="px-3 py-1 rounded-full text-xs border transition-colors hover:border-gray-400"
                          style={{
                            borderColor: colors.light,
                            color: colors.text,
                          }}
                          onClick={() =>
                            adicionarAoCarrinho(pizza, tamanho.nome)
                          }
                        >
                          {tamanho.nome} - R$ {tamanho.preco.toFixed(2)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    className="w-full py-2 rounded-lg font-medium text-sm transition-colors"
                    style={{
                      backgroundColor: colors.accent,
                      color: "white",
                    }}
                    onClick={() =>
                      adicionarAoCarrinho(pizza, pizza.tamanhos[1].nome)
                    }
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Carrinho lateral */}
      {carrinhoAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col">
            <div className="p-4 border-b sticky top-0 bg-white z-10">
              <div className="flex justify-between items-center">
                <h2
                  className="text-lg font-semibold"
                  style={{ color: colors.text }}
                >
                  Seu Pedido
                </h2>
                <button
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setCarrinhoAberto(false)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Mostra o endereço no carrinho */}
              {endereco && (
                <div className="mt-2 flex items-start">
                  <IconMapPin
                    className="mt-0.5 mr-1 flex-shrink-0"
                    style={{ color: colors.primary }}
                  />
                  <p className="text-sm text-gray-600 break-words">
                    {endereco}
                    {!enderecoValido && (
                      <span className="text-red-500 text-xs block mt-1">
                        (Endereço incompleto)
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>

            <div className="flex-grow overflow-y-auto p-4">
              {carrinho.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Seu carrinho está vazio</p>
                  <button
                    className="px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: colors.primary,
                      color: "white",
                    }}
                    onClick={() => setCarrinhoAberto(false)}
                  >
                    Explorar Cardápio
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {carrinho.map((item, index) => (
                    <div key={index} className="py-4">
                      <div className="flex justify-between">
                        <div>
                          <h3
                            className="font-medium"
                            style={{ color: colors.text }}
                          >
                            {item.pizza.nome}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.tamanho}
                          </p>
                        </div>
                        <p
                          className="font-medium"
                          style={{ color: colors.text }}
                        >
                          R$ {(item.pizza.preco * item.quantidade).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center border rounded-full overflow-hidden">
                          <button
                            className="px-3 py-1 text-gray-500 hover:text-gray-700 transition-colors"
                            onClick={() => {
                              const newQuantity = item.quantidade - 1;
                              if (newQuantity > 0) {
                                atualizarQuantidade(
                                  item.pizza.id,
                                  item.tamanho,
                                  newQuantity
                                );
                              } else {
                                removerDoCarrinho(item.pizza.id, item.tamanho);
                              }
                            }}
                          >
                            -
                          </button>
                          <span
                            className="px-2 text-sm"
                            style={{ color: colors.text }}
                          >
                            {item.quantidade}
                          </span>
                          <button
                            className="px-3 py-1 text-gray-500 hover:text-gray-700 transition-colors"
                            onClick={() => {
                              atualizarQuantidade(
                                item.pizza.id,
                                item.tamanho,
                                item.quantidade + 1
                              );
                            }}
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                          onClick={() => {
                            removerDoCarrinho(item.pizza.id, item.tamanho);
                          }}
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t sticky bottom-0 bg-white">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium" style={{ color: colors.text }}>
                    R$ {calcularTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxa de entrega</span>
                  <span
                    className="font-medium"
                    style={{
                      color: enderecoValido ? colors.text : colors.warning,
                    }}
                  >
                    {enderecoValido
                      ? calcularFrete() === 0
                        ? "Grátis"
                        : `R$ ${calcularFrete().toFixed(2)}`
                      : "Informe o endereço"}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold" style={{ color: colors.text }}>
                  Total
                </span>
                <span
                  className="text-lg font-bold"
                  style={{
                    color: enderecoValido ? colors.primary : colors.warning,
                  }}
                >
                  {enderecoValido
                    ? `R$ ${calcularTotalComFrete().toFixed(2)}`
                    : "Informe o endereço"}
                </span>
              </div>
              <button
                className="w-full py-3 rounded-lg font-semibold transition-colors"
                style={{
                  backgroundColor:
                    calcularTotal() > 0 && enderecoValido && !pedidoStatus
                      ? colors.accent
                      : pedidoStatus === "enviando"
                      ? colors.warning
                      : pedidoStatus === "sucesso"
                      ? colors.success
                      : pedidoStatus === "erro"
                      ? colors.accent
                      : colors.light,
                  color:
                    (calcularTotal() > 0 && enderecoValido) || pedidoStatus
                      ? "white"
                      : colors.text,
                }}
                disabled={
                  calcularTotal() === 0 ||
                  !enderecoValido ||
                  pedidoStatus === "enviando"
                }
                onClick={finalizarPedido}
              >
                {pedidoStatus === "enviando"
                  ? "Processando..."
                  : pedidoStatus === "sucesso"
                  ? "Pedido Realizado!"
                  : pedidoStatus === "erro"
                  ? "Tentar Novamente"
                  : calcularTotal() > 0 && !enderecoValido
                  ? "Informe um endereço válido"
                  : "Finalizar Pedido"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
