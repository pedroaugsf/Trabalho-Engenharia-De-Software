import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
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

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    // Simulação de autenticação (em produção, isso seria uma chamada à API)
    if (email === "admin@pizzaria.com" && password === "admin123") {
      // Salvar informações de login no localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("userName", "Administrador");
      
      // Redirecionar para o painel de controle
      router.push("/admin");
    } else {
      // Verificar se é um cliente registrado (simulação)
      const registeredUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const user = registeredUsers.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "customer");
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userEmail", user.email);
        
        // Redirecionar para a página principal
        router.push("/");
      } else {
        setError("Email ou senha incorretos");
      }
    }
  } catch (err) {
    console.error("Erro ao fazer login:", err);
    setError("Ocorreu um erro ao fazer login. Tente novamente.");
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
          Pizzaria Artesanal
        </h1>
        <p className="text-gray-500 mt-2">Faça login para continuar</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin}>
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

        <div className="mb-6">
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
            placeholder="••••••••"
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
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Não tem uma conta?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Registre-se
          </Link>
        </p>
        <p className="text-sm text-gray-500 mt-2">
          <Link href="/" className="text-gray-500 hover:underline">
            Voltar para a página inicial
          </Link>
        </p>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Para fins de demonstração:<br />
          Email: admin@pizzaria.com<br />
          Senha: admin123
        </p>
      </div>
    </div>
  </div>
);
}
