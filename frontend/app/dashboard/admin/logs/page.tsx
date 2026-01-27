"use client";

import { useEffect, useState } from 'react';
import { MagnifyingGlass, CalendarBlank, CaretLeft, CaretRight, User, CalendarCheck } from 'phosphor-react';
import { api } from '@/src/api';


interface Log {
  id: number;
  action: string;
  module: string;
  details: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
    role?: string; 
  };
}

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchLogs() {
      try {
        const response = await api.get('/logs');
        setLogs(response.data);
      } catch (err) {
        console.log("Erro ao buscar logs", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, []);

  
  const filteredLogs = logs.filter(log => 
    log.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.module.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLogs = filteredLogs.slice(startIndex, endIndex);

  function handlePrevPage() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  function handleNextPage() {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  }

  return (
    <div className="w-full">
      
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Logs</h1>
        <p className="text-gray-500 text-xs mt-1">Acompanhe todos os Logs de clientes</p>
      </div>

      
      <div className="bg-white border border-gray-200 rounded-lg p-6 min-h-[600px] flex flex-col shadow-sm">
        
       
        <div className="flex gap-4 mb-8">
          
          
          <div className="relative w-full max-w-md">
            <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Filtre por cliente, tipo de atividade ou Módulo"
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

       
        <div className="flex-1 overflow-x-auto"> 
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
             
              <tr className="border-b border-gray-100">
                <th className="pb-4 text-[11px] font-semibold text-gray-500 pl-2 w-1/4">Cliente</th>
                <th className="pb-4 text-[11px] font-semibold text-gray-500 text-center w-1/4">Tipo de atividade</th>
                <th className="pb-4 text-[11px] font-semibold text-gray-500 text-center w-1/4">Módulo</th>
                <th className="pb-4 text-[11px] font-semibold text-gray-500 text-right pr-4 w-1/4">
                  Data e horário <span className="inline-block ml-1">↕</span>
                </th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {loading ? (
                 <tr><td colSpan={4} className="py-10 text-center text-gray-400">Carregando logs...</td></tr>
              ) : currentLogs.map((log) => (
                <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  
                 
                  <td className="py-4 pl-2">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-xs">
                        {log.user?.name || 'Sistema'}
                      </span>
                      
                      <span className="text-[10px] text-gray-400 mt-0.5">Cliente</span>
                    </div>
                  </td>

                 
                  <td className="py-4 text-center">
                    <span className="border border-gray-200 text-gray-600 px-5 py-1.5 rounded-full text-[10px] font-medium inline-block bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                      {log.action}
                    </span>
                  </td>

                
                  <td className="py-4">
                    <div className="flex items-center justify-center gap-2 text-gray-600 font-medium bg-gray-50 py-1.5 px-3 rounded-md w-fit mx-auto border border-gray-100">
                      {(log.module === 'Agendamento' || log.module === 'Agenda') ? (
                        <CalendarCheck size={14} weight="bold" className="text-gray-500" />
                      ) : (
                        <User size={14} weight="bold" className="text-gray-500" />
                      )}
                      <span>{log.module}</span>
                    </div>
                  </td>

                
                  <td className="py-4 text-right pr-2 text-gray-500 font-medium">
                    {new Date(log.createdAt).toLocaleDateString('pt-BR')} às {new Date(log.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </td>

                </tr>
              ))}

             
              {!loading && currentLogs.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-400 text-xs">
                    Nenhum log encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      
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