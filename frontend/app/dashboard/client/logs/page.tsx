"use client";

import { useEffect, useState } from 'react';
import { api } from '@/src/api';
import { MagnifyingGlass, CalendarBlank, User, CaretLeft, CaretRight, ListBullets } from 'phosphor-react';

interface Log {
  id: number;
  action: string;
  module: string;
  details: string;
  createdAt: string;
}

export default function LogsClientPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    api.get('/logs/me')
      .then(response => setLogs(response.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredLogs = logs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.module.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      
      
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Logs</h1>
        <p className="text-gray-500 text-xs mt-0.5">Acompanhe todos as suas Logs</p>
      </div>

     
      <div className="bg-white border border-gray-200 rounded-lg p-5 min-h-[500px] flex flex-col relative shadow-sm">
        
        
        <div className="flex flex-col md:flex-row gap-3 mb-6 border-b border-gray-100 pb-5">
          
        
          <div className="flex-1 relative">
            <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Filtre por tipo de atividade ou Módulo"
              
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded text-xs text-gray-700 focus:border-black transition-colors outline-none placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          
          <div className="w-full md:w-40 relative">
            <input 
              type="text"
              onFocus={(e) => e.target.type = 'date'}
              onBlur={(e) => e.target.type = 'text'}
              placeholder="Selecione"
          
              className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded text-xs text-gray-700 focus:border-black transition-colors outline-none placeholder:text-gray-400 cursor-pointer"
            />
            <CalendarBlank size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

        </div>

  
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 block md:table-row border-b border-gray-50 md:border-none">
                <th className="pb-2 pl-1 w-1/3 block md:table-cell">Tipo de atividade</th>
                <th className="pb-2 w-1/3 block md:table-cell">Módulo</th>
                <th className="pb-2 w-1/3 block md:table-cell">Data e horário</th>
              </tr>
            </thead>
            
            <tbody className="block md:table-row-group space-y-3 md:space-y-0 text-xs">
              {loading ? (
                <tr><td colSpan={3} className="text-center py-8 text-gray-400 text-xs">Carregando...</td></tr>
              ) : filteredLogs.map(log => (
                <tr key={log.id} className="border-b border-gray-50 last:border-0 block md:table-row hover:bg-gray-50/50 transition-colors">
                  
                  
                  <td className="py-2.5 pr-2 block md:table-cell">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[11px] font-medium inline-block border border-gray-200">
                      {log.action}
                    </span>
                  </td>

               
                  <td className="py-2.5 pr-2 block md:table-cell">
                    <div className="bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-full text-[11px] font-medium inline-flex items-center gap-1.5 shadow-sm">
                      {log.module === 'Minha Conta' ? <User size={12} /> : 
                       log.module === 'Agendamento' ? <CalendarBlank size={12} /> : 
                       <ListBullets size={12} />}
                      {log.module}
                    </div>
                  </td>

            
                  <td className="py-2.5 block md:table-cell">
                     <span className="bg-white border border-gray-200 text-gray-500 px-3 py-1 rounded-full text-[11px] font-medium inline-block shadow-sm">
                        {new Date(log.createdAt).toLocaleString('pt-BR', {
                          day: '2-digit', month: '2-digit', year: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        }).replace(',', ' às')}
                     </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

       
        <div className="mt-auto pt-4 flex justify-center items-center gap-1">
          <button className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-black transition-colors">
            <CaretLeft size={14} weight="bold" />
          </button>
          
          <button className="w-6 h-6 flex items-center justify-center bg-black text-white rounded text-[10px] font-bold shadow-sm">
            1
          </button>
          
          <button className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-black transition-colors">
            <CaretRight size={14} weight="bold" />
          </button>
        </div>

      </div>
    </div>
  );
}