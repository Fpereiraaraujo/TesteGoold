"use client";

import { useState, useEffect, FormEvent } from 'react';
import { Eye, EyeSlash, CircleNotch } from 'phosphor-react';
import axios from 'axios';
import { api } from '@/src/api';

export default function ProfileClientPage() {
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  // Estados dos campos
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Estados de Endereço
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  // 1. CARREGAR DADOS DO PERFIL
  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await api.get('/me');
        const user = response.data;

        console.log("Perfil carregado:", user); // Verifique no F12 se os dados chegaram

        setName(user.name || '');
        setSurname(user.surname || '');
        setEmail(user.email || '');
        
        // BLINDAGEM: Tenta ler snake_case (banco) OU camelCase (API padrão)
        // Se vier vazio, deixa string vazia para o input não quebrar
        setZipCode(user.zip_code || user.zipCode || '');
        setAddress(user.address || '');
        setNumber(user.number || '');
        setComplement(user.complement || '');
        setNeighborhood(user.neighborhood || '');
        setCity(user.city || '');
        setState(user.state || '');

      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
        // Se der erro 401, o token expirou ou não existe
        // alert("Sessão expirada. Faça login novamente.");
      } finally {
        setDataLoading(false);
      }
    }
    loadProfile();
  }, []);

  // 2. BUSCA DE CEP (VIA CEP)
  async function handleBlurCep() {
    const cleanCep = zipCode.replace(/\D/g, '');
    if (cleanCep.length !== 8) return;

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);
      
      if (!response.data.erro) {
        setAddress(response.data.logradouro || address); // Mantém o atual se a API não trouxer
        setNeighborhood(response.data.bairro || neighborhood);
        setCity(response.data.localidade || city);
        setState(response.data.uf || state);

        if (response.data.logradouro) {
          document.getElementById('numberInput')?.focus();
        }
      } else {
        alert("CEP não encontrado.");
      }
    } catch (error) {
      console.error("Erro na busca do CEP");
    }
  }

  // 3. SALVAR ALTERAÇÕES
  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // Envia os dados com tratamento de CEP limpo
      const dataToSend: any = {
        name,
        surname,
        zip_code: zipCode.replace(/\D/g, ''), // Garante apenas números
        address,
        number,
        complement,
        neighborhood,
        city,
        state,
      };

      if (password) {
        dataToSend.password = password;
      }

      console.log("Enviando atualização:", dataToSend);
      await api.put('/me', dataToSend);
      alert("Perfil atualizado com sucesso!");
      setPassword('');

    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert("Erro ao salvar. Tente fazer login novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (dataLoading) {
    return (
      <div className="p-8 flex items-center gap-2 text-gray-500 text-sm">
        <CircleNotch size={20} className="animate-spin" /> Carregando informações...
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      
      <div className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-2xl font-bold text-gray-900">Minha conta</h1>
        <p className="text-gray-500 text-sm mt-1">Ajuste informações da sua conta de forma simples</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-[600px] mx-auto shadow-sm">
        <form onSubmit={handleSave} className="flex flex-col gap-5">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 mb-1.5 block">Nome</label>
              <input 
                type="text"
                required
                className="w-full border border-gray-200 rounded p-2.5 text-xs text-gray-700 focus:border-black outline-none transition-colors"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 mb-1.5 block">Sobrenome</label>
              <input 
                type="text"
                required
                className="w-full border border-gray-200 rounded p-2.5 text-xs text-gray-700 focus:border-black outline-none transition-colors"
                value={surname}
                onChange={e => setSurname(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 mb-1.5 block">E-mail</label>
            <input 
              type="email"
              disabled
              className="w-full border border-gray-200 bg-gray-50 rounded p-2.5 text-xs text-gray-400 cursor-not-allowed"
              value={email}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 mb-1.5 block">Nova senha (opcional)</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="***************"
                className="w-full border border-gray-200 rounded p-2.5 text-xs text-gray-700 focus:border-black outline-none transition-colors pr-10"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="h-px bg-gray-100 my-1"></div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="text-xs font-bold text-gray-700 mb-1.5 block">CEP</label>
              <input 
                type="text"
                required
                maxLength={9}
                className="w-full border border-gray-200 rounded p-2.5 text-xs text-gray-700 focus:border-black outline-none"
                value={zipCode}
                onChange={e => setZipCode(e.target.value)}
                onBlur={handleBlurCep}
              />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-bold text-gray-700 mb-1.5 block">Endereço</label>
              <input 
                type="text"
                // REMOVIDO DISABLED: Permite editar se veio vazio do banco
                placeholder="Rua, Avenida..."
                className="w-full border border-gray-200 rounded p-2.5 text-xs text-gray-700 focus:border-black outline-none"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 mb-1.5 block">Número</label>
              <input 
                id="numberInput"
                type="text"
                required
                className="w-full border border-gray-200 rounded p-2.5 text-xs text-gray-700 focus:border-black outline-none"
                value={number}
                onChange={e => setNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 mb-1.5 block">Bairro</label>
              <input 
                type="text"
                // REMOVIDO DISABLED: Permite editar
                className="w-full border border-gray-200 rounded p-2.5 text-xs text-gray-700 focus:border-black outline-none"
                value={neighborhood}
                onChange={e => setNeighborhood(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 mb-1.5 block">Complemento</label>
            <input 
              type="text"
              className="w-full border border-gray-200 rounded p-2.5 text-xs text-gray-700 focus:border-black outline-none"
              value={complement}
              onChange={e => setComplement(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <label className="text-xs font-bold text-gray-700 mb-1.5 block">Cidade</label>
              <input 
                type="text"
                // REMOVIDO DISABLED: Permite editar se a API do CEP falhar
                className="w-full bg-white border border-gray-200 rounded p-2.5 text-xs text-gray-700"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <label className="text-xs font-bold text-gray-700 mb-1.5 block">UF</label>
              <input 
                type="text"
                maxLength={2}
                className="w-full bg-white border border-gray-200 rounded p-2.5 text-xs text-gray-700 text-center"
                value={state}
                onChange={e => setState(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white font-bold text-xs py-3 rounded mt-4 hover:bg-gray-900 transition-all active:scale-95 flex items-center justify-center shadow-sm disabled:opacity-50"
          >
            {loading ? <CircleNotch size={18} className="animate-spin" /> : "SALVAR ALTERAÇÕES"}
          </button>

        </form>
      </div>
    </div>
  );
}