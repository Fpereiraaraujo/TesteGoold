"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeSlash, CircleNotch } from 'phosphor-react';
import axios from 'axios'; 
import { api } from '@/src/api';
import { HeaderAuth } from '@/src/components/HeaderAuth';

export default function Cadastro() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Estados dos campos
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');

  // Busca de CEP
  async function handleBlurCep() {
    const cleanCep = zipCode.replace(/\D/g, '');
    if (cleanCep.length !== 8) return;

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);
      if (!response.data.erro) {
        // Preenche o que vier, se vier vazio o usuário poderá digitar
        setAddress(response.data.logradouro || '');
        setNeighborhood(response.data.bairro || '');
        setCity(response.data.localidade || '');
        setState(response.data.uf || '');
    
        // Foca no número automaticamente
        document.getElementById('numberInput')?.focus();
      } else {
        alert("CEP não encontrado.");
      }
    } catch (error) {
      console.log("Erro ao buscar CEP", error);
    }
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (!name || !email || !password || !zipCode) {
        alert("Preencha os campos obrigatórios");
        return;
    }

    setLoading(true);

    try {
      await api.post('/users', {
        name,
        surname,
        email,
        password,
        zip_code: zipCode,
        address,
        number,
        complement,
        neighborhood,
        city,
        state
      });

      alert("Cadastro realizado com sucesso!");
      router.push('/'); 

    } catch (err) {
      console.log(err);
      alert("Erro ao cadastrar. Verifique se o e-mail já existe.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col pb-10">
      <HeaderAuth buttonLabel="Login" buttonLink="/" />

      <main className="flex-1 flex flex-col items-center justify-center px-4 mt-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Cadastre-se</h1>

        <div className="w-full max-w-[500px] bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Nome</label>
                <input 
                  type="text"
                  required
                  placeholder="ex: Jose"
                  className="w-full border border-gray-300 rounded p-3 text-sm focus:border-black outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Sobrenome</label>
                <input 
                  type="text"
                  required
                  placeholder="ex: Lima"
                  className="w-full border border-gray-300 rounded p-3 text-sm focus:border-black outline-none"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">E-mail</label>
              <input 
                type="email"
                required
                placeholder="Insira seu e-mail"
                className="w-full border border-gray-300 rounded p-3 text-sm focus:border-black outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Senha</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Insira sua senha"
                  className="w-full border border-gray-300 rounded p-3 text-sm focus:border-black outline-none pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">CEP</label>
              <input 
                type="text"
                required
                maxLength={8}
                placeholder="00000000"
                className="w-full border border-gray-300 rounded p-3 text-sm focus:border-black outline-none"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))} 
                onBlur={handleBlurCep} 
              />
            </div>

            {/* Campos de endereço agora editáveis */}
            {(zipCode.length === 8) && (
              <>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Endereço</label>
                  <input 
                    type="text"
                    placeholder="Rua, Avenida..."
                    className={`w-full border border-gray-300 rounded p-3 text-sm focus:border-black outline-none ${address ? 'bg-gray-50' : 'bg-white'}`}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Número</label>
                    <input 
                      id="numberInput"
                      type="text"
                      required
                      className="w-full border border-gray-300 rounded p-3 text-sm focus:border-black outline-none"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Bairro</label>
                    <input 
                      type="text"
                      className={`w-full border border-gray-300 rounded p-3 text-sm focus:border-black outline-none ${neighborhood ? 'bg-gray-50' : 'bg-white'}`}
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Complemento</label>
                  <input 
                    type="text"
                    placeholder="Opcional"
                    className="w-full border border-gray-300 rounded p-3 text-sm focus:border-black outline-none"
                    value={complement}
                    onChange={(e) => setComplement(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Cidade</label>
                    <input 
                      type="text"
                      disabled
                      className="w-full bg-gray-100 border border-gray-200 rounded p-3 text-sm text-gray-500"
                      value={city}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Estado</label>
                    <input 
                      type="text"
                      disabled
                      className="w-full bg-gray-100 border border-gray-200 rounded p-3 text-sm text-gray-500"
                      value={state}
                    />
                  </div>
                </div>
              </>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white font-medium py-3 rounded mt-4 hover:bg-gray-800 flex items-center justify-center disabled:opacity-50"
            >
              {loading ? <CircleNotch size={24} className="animate-spin" /> : "Cadastrar-se"}
            </button>

          </form>
        </div>
      </main>
    </div>
  );
}