"use client";

import { useEffect, useState } from 'react';
import { MagnifyingGlass, CalendarBlank, CaretLeft, CaretRight } from 'phosphor-react';
import { api } from '@/src/api';
import { toast } from 'sonner'; // Importante para feedback

interface Client {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  status: boolean;
  address?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Paginação e Busca
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [searchTerm, setSearchTerm] = useState('');

  // 1. CARREGAR CLIENTES
  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await api.get('/clients'); // Ajuste se a rota for '/users' ou '/clients'
        setClients(response.data);
      } catch (err) {
        console.log("Erro ao buscar clientes", err);
        toast.error("Erro ao carregar lista de clientes.");
      } finally {
        setLoading(false);
      }
    }
    fetchClients();
  }, []);

  // Formatador de Endereço
  function formatAddress(client: Client) {
    if (!client.address) return "Endereço não cadastrado";
    return `${client.address}, n°${client.number || 'S/N'}, ${client.neighborhood || ''}, ${client.city || ''} - ${client.state || ''}`;
  }

  // 2. LÓGICA DE TROCAR STATUS (CORRIGIDA)
  async function handleToggleStatus(id: number, currentStatus: boolean) {
    const newStatus = !currentStatus; // Inverte o valor atual

    // Optimistic Update: Muda na tela imediatamente para parecer rápido
    setClients(prev => prev.map(client => 
      client.id === id ? { ...client, status: newStatus } : client
    ));

    try {
      // Chama o backend para salvar de verdade
      await api.put('/users/status', {
        user_id: id,
        status: newStatus
      });
      
      toast.success(`Usuário ${newStatus ? 'ativado' : 'desativado'} com sucesso!`);

    } catch (err) {
      console.error(err);
      toast.error("Erro ao alterar status no servidor.");
      
      // Se der erro, reverte a mudança visual
      setClients(prev => prev.map(client => 
        client.id === id ? { ...client, status: currentStatus } : client
      ));
    }
  }

  // 3. FILTRO E PAGINAÇÃO
  const filteredClients = clients.filter(client => 
    (client.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (client.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClients = filteredClients.slice(startIndex, endIndex);

  function handlePrevPage() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  function handleNextPage() {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  }

  return (
    <div className="w-full">
      
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
        <p className="text-gray-500 text-xs mt-1">Overview de todos os clientes</p>
      </div>

      {/* CARD PRINCIPAL */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 min-h-[600px] flex flex-col shadow-sm">
        
        {/* BARRA DE FILTRO */}
        <div className="flex gap-4 mb-8">
          
          <div className="relative w-full max-w-md">
            <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Filtre por nome"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded text-xs text-gray-700 focus:border-black outline-none transition-colors placeholder:text-gray-300"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          
          <div className="w-40 relative">
             <input 
               type="text" 
               onFocus={(e) => e.target.type = 'date'}
               onBlur={(e) => e.target.type = 'text'}
               placeholder="Selecione"
               className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded text-xs text-gray-700 focus:border-black outline-none cursor-pointer placeholder:text-gray-300"
             />
             <CalendarBlank size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

        </div>

        {/* TABELA */}
        <div className="flex-1 overflow-x-auto"> 
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-4 text-[11px] font-semibold text-gray-500 pl-2 w-[15%]">Data de cadastro ↕</th>
                <th className="pb-4 text-[11px] font-semibold text-gray-500 w-[20%]">Nome</th>
                <th className="pb-4 text-[11px] font-semibold text-gray-500 w-[30%]">Endereço</th>
                <th className="pb-4 text-[11px] font-semibold text-gray-500 text-center w-[20%]">Permissões</th>
                <th className="pb-4 text-[11px] font-semibold text-gray-500 text-right pr-4 w-[15%]">Status</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {loading ? (
                 <tr><td colSpan={5} className="py-10 text-center text-gray-400">Carregando clientes...</td></tr>
              ) : currentClients.length === 0 ? (
                 <tr><td colSpan={5} className="py-10 text-center text-gray-400">Nenhum cliente encontrado.</td></tr>
              ) : (
                currentClients.map((client) => (
                <tr key={client.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  
                  {/* DATA */}
                  <td className="py-4 pl-2 text-gray-600 font-medium">
                    {new Date(client.createdAt).toLocaleDateString('pt-BR')} às {new Date(client.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </td>

                  {/* NOME */}
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-xs">{client.name}</span>
                      <span className="text-[10px] text-gray-400 mt-0.5">Cliente</span>
                    </div>
                  </td>

                  {/* ENDEREÇO */}
                  <td className="py-4 pr-4">
                    <span className="text-gray-600 block max-w-[300px] truncate" title={formatAddress(client)}>
                      {formatAddress(client)}
                    </span>
                  </td>

                  {/* PERMISSÕES (Botoes fake por enquanto) */}
                  <td className="py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <span className="bg-black text-white px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer hover:bg-gray-800">
                        Agendamentos
                      </span>
                      <span className="bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-full text-[10px] font-medium shadow-sm cursor-pointer hover:bg-gray-50">
                        Logs
                      </span>
                    </div>
                  </td>

                  {/* BOTÃO DE STATUS (SWITCH) */}
                  <td className="py-4 text-right pr-2">
                    <div className="flex justify-end">
                      <button 
                        onClick={() => handleToggleStatus(client.id, client.status)}
                        className={`w-10 h-5 rounded-full p-1 transition-colors duration-300 ease-in-out relative focus:outline-none ${client.status ? 'bg-black' : 'bg-gray-200'}`}
                        title={client.status ? "Desativar acesso" : "Ativar acesso"}
                      >
                         <div className={`w-3 h-3 bg-white rounded-full shadow-md transform transition-transform duration-300 ${client.status ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  </td>

                </tr>
              )))}
            </tbody>
          </table>
        </div>

        {/* PAGINAÇÃO */}
        <div className="mt-auto pt-6 flex justify-center items-center gap-2">
          <button 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="p-2 rounded hover:bg-gray-100 text-gray-400 hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CaretLeft size={16} weight="bold" />
          </button>
          
          <button className="w-8 h-8 flex items-center justify-center bg-black text-white rounded text-xs font-bold shadow-md">
            {currentPage}
          </button>
          
          <button 
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 rounded hover:bg-gray-100 text-gray-400 hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CaretRight size={16} weight="bold" />
          </button>
        </div>

      </div>
    </div>
  );
}