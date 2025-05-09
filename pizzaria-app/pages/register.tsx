import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Register() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
const router = useRouter();

// Cores profissionais
const colors = {
  primary: "#2C3E50", // Azul petróleo escuro
  accent: "#E74C3C", // Vermelho suave
  light: "#ECF0F1", // Cinza muito claro
  text: "#333333", // Cinza escuro para texto
  background: "#F8F9FA", // Cinza muito claro para fundo
};

const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  
  // Validações básicas
  if (password !== confirmPassword) {
    setError("As senhas não coincidem");
    return;
  }
  
  if (password.length < 6) {
    setError("A senha deve ter pelo menos 6 caracteres");
    return;
  }
  
  setLoading(true);

  try {
    // Verificar se o email já está em uso
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find((u: any) => u.email === email);
    
    if (existingUser) {
      setError("Este email já está em uso");
      setLoading(false);
      return;
    }
    
        // Adicionar novo usuário
        const newUser = {
            id: users.length + 1,
            name,
            email,
            password,
            role: "customer",
            createdAt: new Date().toISOString()
          };
          
          users.push(newUser);
          localStorage.setItem("users", JSON.stringify(users));
          
          // Login automático após registro
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userRole", "customer");
          localStorage.setItem("userName", name);
          localStorage.setItem("userEmail", email);
          
          // Redirecionar para a página principal
          router.push("/");
        } catch (err) {
          console.error("Erro ao registrar:", err);
          setError("Ocorreu um erro ao criar sua conta. Tente novamente.");
        } finally {
          setLoading(false);
        }
      };
      
      return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div
                  className="w-12 h-12 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: colors.accent }}
                >
                  <span className="text-white font-bold text-xl">PZ</span>
                </div>
              </div>
              <h1 className="text-2xl font-bold" style={{ color: colors.primary }}>
                Crie sua conta
              </h1>
              <p className="text-gray-500 mt-2">Registre-se para fazer pedidos</p>
            </div>
      
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
      
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nome completo
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="Seu nome"
                />
              </div>
      
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="seu@email.com"
                />
              </div>
      
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
      
              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirmar senha
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="Digite a senha novamente"
                />
              </div>
      
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-md font-medium transition-colors"
                style={{
                  backgroundColor: colors.primary,
                  color: "white",
                }}
                disabled={loading}
              >
                {loading ? "Registrando..." : "Criar conta"}
              </button>
            </form>
      
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Faça login
                </Link>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                <Link href="/" className="text-gray-500 hover:underline">
                  Voltar para a página inicial
                </Link>
              </p>
            </div>
          </div>
        </div>
      );
      }
      
