"use client";

import { useEffect, useState } from 'react';
import { MagnifyingGlass, CalendarBlank, X, Check, CaretLeft, CaretRight } from 'phosphor-react';
import { toast } from 'sonner'; 
import { api } from '@/src/api';
import { ScheduleSettingsModal } from '@/src/components/ScheduleSettingsModal';

interface Appointment {
  id: number;
  date_time: string;
  status: 'pending' | 'approved' | 'canceled';
  room: { name: string; };
  client: { name: string; email: string; };
}

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  

  const [searchName, setSearchName] = useState('');
  const [searchDate, setSearchDate] = useState('');

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false); 

  async function fetchAppointments() {
    try {
      setLoading(true);
      const response = await api.get('/agendamentos'); 
      setAppointments(response.data);
    } catch (err) {
      console.log(err);
      toast.error("Erro ao carregar agendamentos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

 
  const filteredAppointments = appointments.filter(app => {
   
    const clientName = app.client?.name || '';
    const matchesName = clientName.toLowerCase().includes(searchName.toLowerCase());


    const matchesDate = searchDate ? app.date_time.startsWith(searchDate) : true;

    return matchesName && matchesDate;
  });

  async function handleStatusChange(id: number, newStatus: 'approved' | 'canceled') {
    const promise = api.put('/agendamentos/status', {
      appointment_id: Number(id),
      status: newStatus
    });

    toast.promise(promise, {
      loading: 'Atualizando status...',
      success: () => {
        setAppointments(prev => prev.map(app => 
          app.id === id ? { ...app, status: newStatus } : app
        ));
        return `Agendamento ${newStatus === 'approved' ? 'aprovado' : 'cancelado'} com sucesso!`;
      },
      error: 'Erro ao atualizar o status. Tente novamente.'
    });
  }

  return (
    <div className="w-full">
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Agendamentos</h1>
        <p className="text-gray-500 text-xs mt-1">Acompanhe todos os agendamentos de clientes de forma simples</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 min-h-[600px] flex flex-col shadow-sm">
        
        
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          
          <div className="flex gap-4 w-full md:w-auto flex-1">
            
          
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Filtre por nome"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)} 
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded text-xs text-gray-700 focus:border-black outline-none transition-colors placeholder:text-gray-300"
              />
            </div>
            
          
            <div className="w-40 relative">
               <input 
                 type="text" 
                 onFocus={(e) => e.target.type = 'date'}
                 onBlur={(e) => e.target.type = 'text'}
                 placeholder="Selecione"
                 value={searchDate} 
                 onChange={(e) => setSearchDate(e.target.value)}
                 className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded text-xs text-gray-700 focus:border-black outline-none cursor-pointer placeholder:text-gray-300"
               />
               <CalendarBlank size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <button 
            onClick={() => setIsSettingsModalOpen(true)}
            className="bg-black text-white px-6 py-2.5 rounded text-xs font-bold hover:bg-gray-800 transition-colors shadow-sm"
          >
            Ajustes de agendamento
          </button>
        </div>

     
        <div className="flex-1 overflow-x-auto"> 
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-4 text-[11px] font-semibold text-gray-500 pl-2">Data agendamento ↕</th>
                <th className="pb-4 text-[11px] font-semibold text-gray-500">Nome</th>
                <th className="pb-4 text-[11px] font-semibold text-gray-500 text-center">Sala de agendamento</th>
                <th className="pb-4 text-[11px] font-semibold text-gray-500 text-center">Status</th>
                <th className="pb-4 text-[11px] font-semibold text-gray-500 text-right pr-4">Ação</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {loading ? (
                 <tr><td colSpan={5} className="py-10 text-center text-gray-400">Carregando...</td></tr>
              ) : filteredAppointments.length === 0 ? ( 
                
                 <tr><td colSpan={5} className="py-10 text-center text-gray-400">Nenhum agendamento encontrado.</td></tr>
              ) : (
              
                filteredAppointments.map((app) => (
                <tr 
                  key={app.id} 
                  className={`border-b border-gray-50 hover:opacity-90 transition-colors
                    ${app.status === 'approved' ? 'bg-[#ecfdf5]' : ''} 
                    ${app.status === 'canceled' ? 'bg-[#fef2f2]' : ''}
                    ${app.status === 'pending' ? 'bg-white' : ''}
                  `}
                >
                  
                  <td className="py-4 text-gray-600 font-medium pl-2">
                    {new Date(app.date_time).toLocaleDateString('pt-BR')} às {new Date(app.date_time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </td>

                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-xs">{app.client?.name || 'Cliente'}</span>
                      <span className="text-[10px] text-gray-400 mt-0.5">Cliente</span>
                    </div>
                  </td>

                  <td className="py-4 text-center">
                    <span className="bg-black text-white px-4 py-1.5 rounded-full text-[10px] font-bold inline-block shadow-sm">
                      {app.room.name}
                    </span>
                  </td>

                  <td className="py-4 text-center">
                    {app.status === 'pending' && (
                      <span className="border border-gray-300 text-gray-500 bg-white px-4 py-1 rounded-full text-[10px] font-medium shadow-sm">
                        Em análise
                      </span>
                    )}
                    {app.status === 'approved' && (
                      <span className="bg-[#ccfbf1] text-[#0f766e] border border-[#99f6e4] px-4 py-1 rounded-full text-[10px] font-bold shadow-sm">
                        Agendado
                      </span>
                    )}
                    {app.status === 'canceled' && (
                      <span className="bg-[#fee2e2] text-[#b91c1c] border border-[#fca5a5] px-4 py-1 rounded-full text-[10px] font-bold shadow-sm">
                        Cancelado
                      </span>
                    )}
                  </td>

                  <td className="py-4 text-right pr-2">
                    <div className="flex justify-end gap-2">
                      
                      {app.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleStatusChange(app.id, 'canceled')}
                            className="bg-black hover:bg-gray-800 text-white rounded-full p-1.5 transition-colors shadow-sm"
                            title="Recusar"
                          >
                            <X size={12} weight="bold" />
                          </button>
                          <button 
                            onClick={() => handleStatusChange(app.id, 'approved')}
                            className="bg-black hover:bg-gray-800 text-white rounded-full p-1.5 transition-colors shadow-sm"
                            title="Aprovar"
                          >
                            <Check size={12} weight="bold" />
                          </button>
                        </>
                      )}

                      {app.status === 'approved' && (
                        <button 
                          onClick={() => handleStatusChange(app.id, 'canceled')}
                          className="bg-black hover:bg-gray-800 text-white rounded-full p-1.5 transition-colors shadow-sm"
                          title="Cancelar Agendamento"
                        >
                          <X size={12} weight="bold" />
                        </button>
                      )}

                      {app.status === 'canceled' && null}

                    </div>
                  </td>

                </tr>
              )))}
            </tbody>
          </table>
        </div>

        <div className="mt-auto pt-6 flex justify-center items-center gap-2">
          <button className="p-2 rounded hover:bg-gray-100 text-gray-400 hover:text-black transition-colors">
            <CaretLeft size={16} weight="bold" />
          </button>
          
          <button className="w-8 h-8 flex items-center justify-center bg-black text-white rounded text-xs font-bold shadow-md">
            1
          </button>
          
          <button className="p-2 rounded hover:bg-gray-100 text-gray-400 hover:text-black transition-colors">
            <CaretRight size={16} weight="bold" />
          </button>
        </div>

      </div>

      <ScheduleSettingsModal 
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </div>
  );
}