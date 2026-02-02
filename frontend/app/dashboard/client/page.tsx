"use client";

import { useEffect, useState } from 'react';
import { MagnifyingGlass, CalendarBlank, X } from 'phosphor-react';
import { api } from '@/src/api';
import { NewAppointmentModal } from '@/src/components/NewAppointmentModal';

interface Appointment {
  id: number;
  date_time: string;
  status: 'pending' | 'approved' | 'canceled';
  room: {
    name: string;
  }
  client: {
    name: string;
  }
  user?: { // Adicionado como opcional para evitar erros de tipo
    name: string;
  }
}

export default function AgendamentosPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 1. ESTADOS DOS FILTROS
  const [searchName, setSearchName] = useState('');
  const [searchDate, setSearchDate] = useState('');

  async function fetchAppointments() {
    try {
      setLoading(true);
      const response = await api.get('/agendamentos/me');
      
      // LOG para você conferir a estrutura do nome no F12
      console.log("Primeiro agendamento recebido:", response.data[0]); 
      
      setAppointments(response.data);
    } catch (err) {
      console.log("Erro ao buscar dados:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  // 2. LÓGICA DE FILTRAGEM (Onde estava o problema)
  const filteredAppointments = appointments.filter(app => {
    // Tenta pegar o nome de 'client' ou de 'user' caso a API varie
    const clientName = app.client?.name || app.user?.name || "";
    
    const matchesName = clientName.toLowerCase().includes(searchName.toLowerCase());
    
    // Filtro de data: compara o YYYY-MM-DD
    const matchesDate = searchDate ? app.date_time.startsWith(searchDate) : true;

    return matchesName && matchesDate;
  });

  return (
    <div className="w-full">
      
      {/* CABEÇALHO */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Agendamento</h1>
        <p className="text-gray-500 text-xs mt-0.5">Acompanhe todos os seus agendamentos de forma simples</p>
      </div>

      {/* CARD PRINCIPAL */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 min-h-[500px] shadow-sm">
        
        {/* BARRA DE FERRAMENTAS */}
        <div className="flex flex-col md:flex-row gap-3 justify-between items-center mb-6 border-b border-gray-100 pb-5">
          
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto flex-1">
            
            {/* Input de Busca por Nome */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Filtre por nome"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded text-xs text-gray-700 focus:border-black transition-colors outline-none placeholder:text-gray-400"
              />
            </div>
            
            {/* Input de Busca por Data */}
            <div className="w-full md:w-40 relative">
               <input 
                 type="text" 
                 onFocus={(e) => e.target.type = 'date'}
                 onBlur={(e) => e.target.type = 'text'}
                 placeholder="Selecione"
                 value={searchDate}
                 onChange={(e) => setSearchDate(e.target.value)}
                 className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded text-xs text-gray-700 focus:border-black transition-colors outline-none placeholder:text-gray-400 cursor-pointer"
               />
               <CalendarBlank size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-black text-white px-5 py-2 rounded text-xs font-bold hover:bg-gray-900 transition-colors flex items-center gap-2 shadow-sm active:scale-95 transform duration-100"
          >
            Novo Agendamento
          </button>
        </div>

        {/* TABELA - USANDO LISTA FILTRADA */}
        <div className="overflow-x-auto"> 
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Data agendamento ↕</th>
                <th className="pb-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Nome</th>
                <th className="pb-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">Sala de agendamento</th>
                <th className="pb-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">Status transação</th>
                <th className="pb-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">Ação</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {loading ? (
                 <tr><td colSpan={5} className="py-10 text-center text-gray-400 text-xs">Carregando...</td></tr>
              ) : filteredAppointments.map((app) => (
                <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  
                  <td className="py-3 text-gray-600 font-medium">
                    {new Date(app.date_time).toLocaleDateString('pt-BR')} às {new Date(app.date_time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </td>

                  <td className="py-3">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-xs">
                        {app.client?.name || app.user?.name || 'Cliente'}
                      </span>
                      <span className="text-[10px] text-gray-400 uppercase mt-0.5">Cliente</span>
                    </div>
                  </td>

                  <td className="py-3 text-center">
                    <span className="bg-black text-white px-3 py-1 rounded-full text-[10px] font-bold inline-block shadow-sm">
                      {app.room.name}
                    </span>
                  </td>

                  <td className="py-3 text-center">
                    {app.status === 'pending' && (
                      <span className="border border-gray-200 text-gray-500 px-3 py-1 rounded-full text-[10px] font-medium bg-white">
                        Em análise
                      </span>
                    )}
                    {app.status === 'approved' && (
                      <span className="bg-green-50 text-green-700 border border-green-100 px-3 py-1 rounded-full text-[10px] font-bold">
                        Agendado
                      </span>
                    )}
                    {app.status === 'canceled' && (
                      <span className="bg-red-50 text-red-700 border border-red-100 px-3 py-1 rounded-full text-[10px] font-bold">
                        Cancelado
                      </span>
                    )}
                  </td>

                  <td className="py-3 text-center">
                    <button 
                      className="bg-black hover:bg-gray-800 text-white rounded-full p-1.5 transition-colors shadow-sm"
                    >
                      <X size={12} weight="bold" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredAppointments.length === 0 && !loading && (
             <div className="text-center py-12 text-gray-400 text-xs">
                Nenhum agendamento encontrado para os filtros aplicados.
             </div>
          )}
        </div>

      </div>

      <NewAppointmentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => fetchAppointments()} 
      />
    </div>
  );
}