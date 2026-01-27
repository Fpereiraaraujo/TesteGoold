"use client";

import { useState, useEffect, FormEvent } from 'react';

import { Eye, EyeSlash, CircleNotch } from 'phosphor-react';
import axios from 'axios';
import { api } from '@/src/api';

export default function ProfileClientPage() {
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);


  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

 
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');


  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await api.get('/me');
        const user = response.data;

        setName(user.name || '');
        setSurname(user.surname || '');
        setEmail(user.email || '');
        setZipCode(user.zip_code || '');
        setAddress(user.address || '');
        setNumber(user.number || '');
        setComplement(user.complement || '');
        setNeighborhood(user.neighborhood || '');
        setCity(user.city || '');
        setState(user.state || '');

      } catch (err) {
        console.log("Erro ao carregar perfil", err);
      } finally {
        setDataLoading(false);
      }
    }
    loadProfile();
  }, []);


  async function handleBlurCep() {
    if (zipCode.replace(/\D/g, '').length !== 8) return;

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
      if (!response.data.erro) {
        setAddress(response.data.logradouro);
        setNeighborhood(response.data.bairro);
        setCity(response.data.localidade);
        setState(response.data.uf);
        document.getElementById('numberInput')?.focus();
      }
    } catch (error) {
      console.log("Erro ao buscar CEP");
    }
  }

 
  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSend: any = {
        name,
        surname,
        zip_code: zipCode,
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

      await api.put('/me', dataToSend);
      alert("Dados atualizados com sucesso!");
      setPassword('');

    } catch (err) {
      console.log(err);
      alert("Erro ao atualizar perfil.");
    } finally {
      setLoading(false);
    }
  }

  if (dataLoading) {
    return <div className="p-8 text-gray-500 text-sm">Carregando informações...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      
     
      <div className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-2xl font-bold text-gray-900">Minha conta</h1>
        <p className="text-gray-500 text-sm mt-1">Ajuste informações da sua conta de forma simples</p>
      </div>

    
      <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-[600px] mx-auto shadow-sm">
        
        <form onSubmit={handleSave} className="flex flex-col gap-5">
          
     
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 mb-1.5 block">
                Nome <span className="text-gray-400 font-normal">(Obrigatório)</span>
              </label>
              <input 
                type="text"
                className="w-full border border-gray-200 rounded p-2.5 text-xs text-gray-700 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 mb-1.5 block">
                Sobrenome <span className="text-gray-400 font-normal">(Obrigatório)</span>
              </label>
              <input 
                type="text"
                className="w-full border border-gray-200 rounded p-2.5 text-xs text-gray-700 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors"
                value={surname}
                onChange={e => setSurname(e.target.value)}
              />
            </div>
          </div>

          
          <div>
            <label className="text-xs font-bold text-gray-700 mb-1.5 block">
              E-mail <span className="text-gray-400 font-normal">(Obrigatório)</span>
            </label>
            <input 
              type="email"
              disabled
              className="w-full border border-gray-200 bg-white rounded p-2.5 text-xs text-gray-500 cursor-not-allowed"
              value={email}
            />
          </div>

         
          <div>
            <label className="text-xs font-bold text-gray-700 mb-1.5 block">
              Senha de acesso <span className="text-gray-400 font-normal">(Obrigatório)</span>
            </label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="***************"
                className="w-full border border-gray-200 rounded p-2.5 text-xs text-gray-700 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors pr-10"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
              >
                {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

       
          <div className="h-px bg-gray-100 my-1"></div>

         
          <div>
            <label className="text-xs font-bold text-gray-700 mb-1.5 block">
              CEP <span className="text-gray-400 font-normal">(Obrigatório)</span>
            </label>
            <input 
              type="text"
              maxLength={9}
              className="w-full border border-gray-200 rounded p-2.5 text-xs text-gray-700 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors"
              value={zipCode}
              onChange={e => setZipCode(e.target.value)}
              onBlur={handleBlurCep}
            />
          </div>

        
          <div>
            <label className="text-xs font-bold text-gray-700 mb-1.5 block">Endereço</label>
            <input 
              type="text"
              disabled
              className="w-full bg-[#f3f4f6] border border-gray-200 rounded p-2.5 text-xs text-gray-600"
              value={address}
            />
          </div>

       
          <div>
            <label className="text-xs font-bold text-gray-700 mb-1.5 block">Número</label>
            <input 
              id="numberInput"
              type="text"
              className="w-full border border-gray-200 rounded p-2.5 text-xs text-gray-700 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors"
              value={number}
              onChange={e => setNumber(e.target.value)}
            />
          </div>

         
          <div>
            <label className="text-xs font-bold text-gray-700 mb-1.5 block">Complemento</label>
            <input 
              type="text"
              className="w-full border border-gray-200 rounded p-2.5 text-xs text-gray-700 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors"
              value={complement}
              onChange={e => setComplement(e.target.value)}
            />
          </div>

          
          <div>
            <label className="text-xs font-bold text-gray-700 mb-1.5 block">Bairro</label>
            <input 
              type="text"
              disabled
              className="w-full bg-[#f3f4f6] border border-gray-200 rounded p-2.5 text-xs text-gray-600"
              value={neighborhood}
            />
          </div>

         
          <div>
            <label className="text-xs font-bold text-gray-700 mb-1.5 block">Cidade</label>
            <input 
              type="text"
              disabled
              className="w-full bg-[#f3f4f6] border border-gray-200 rounded p-2.5 text-xs text-gray-600"
              value={city}
            />
          </div>

       
          <div>
            <label className="text-xs font-bold text-gray-700 mb-1.5 block">Estado</label>
            <input 
              type="text"
              disabled
              className="w-full bg-[#f3f4f6] border border-gray-200 rounded p-2.5 text-xs text-gray-600"
              value={state}
            />
          </div>

        
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white font-bold text-xs py-3 rounded mt-4 hover:bg-gray-900 transition-transform active:scale-95 flex items-center justify-center shadow-sm"
          >
            {loading ? <CircleNotch size={18} className="animate-spin" /> : "Salvar"}
          </button>

        </form>

      </div>
    </div>
  );
}