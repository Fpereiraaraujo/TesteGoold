"use client";

import { useState, useContext, FormEvent } from 'react';
import { Eye, EyeSlash, CircleNotch, List } from 'phosphor-react';
import Link from 'next/link';
import { AuthContext } from '@/src/contexts/AuthContext';
import { toast } from 'sonner'; // <--- 1. IMPORTANTE: Importe o toast

export default function Login() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    if (!email || !password) {
        toast.warning("Preencha todos os campos");
        return;
    }

    setLoading(true);

    // 2. IMPORTANTE: Adicione o try/catch para pegar o erro de "Conta Desativada"
    try {
      await signIn({ email, password });
      // Se der certo, o AuthContext redireciona o usuário
    } catch (err: any) {
      console.log(err);
      // Aqui vai aparecer a mensagem que configuramos no backend:
      // "Acesso negado: Sua conta foi desativada pelo administrador."
      toast.error(err.response?.data?.error || "Erro ao acessar a conta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col">
      <header className="w-full h-20 bg-[#f3f4f6] flex items-center justify-between px-8 border-b border-gray-200/50">
        <div className="flex items-center gap-2">
           <List size={32} weight="bold" className="text-black transform -rotate-45" />
        </div>
        <Link 
          href="/cadastro"
          className="bg-black text-white px-6 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Cadastre-se
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Entre na sua conta</h1>
      
        <div className="w-full max-w-[500px] bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">
                E-mail <span className="text-gray-400 font-normal">(Obrigatório)</span>
              </label>
              <input 
                type="email"
                placeholder="Insira seu e-mail"
                className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">
                Senha de acesso <span className="text-gray-400 font-normal">(Obrigatório)</span>
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Insira sua senha"
                  className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-gray-300 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white font-medium py-3 rounded mt-2 hover:bg-gray-800 transition-colors flex items-center justify-center disabled:opacity-70"
            >
              {loading ? <CircleNotch size={24} className="animate-spin" /> : "Acessar conta"}
            </button>

            <div className="text-center text-xs text-gray-600 mt-2">
              Ainda não tem um cadastro?{' '}
              <Link href="/cadastro" className="font-bold text-black underline hover:no-underline">
                Cadastre-se
              </Link>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}