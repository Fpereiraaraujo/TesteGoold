"use client";

import { useState, FormEvent } from 'react';
import { X, Clock, Plus, CircleNotch } from 'phosphor-react';
import { api } from '../api';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleSettingsModal({ isOpen, onClose }: ModalProps) {
  const [loading, setLoading] = useState(false);
  
 
  const [roomName, setRoomName] = useState('Sala 012');
  const [timeRange, setTimeRange] = useState('08:00 - 18:00');
  const [timeBlock, setTimeBlock] = useState('30 minutos');

async function handleSaveSettings(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
    
      const [start, end] = timeRange.split('-').map(t => t.trim());

      if (!start || !end) {
        alert("Formato de horário inválido. Use: 08:00 - 18:00");
        setLoading(false);
        return;
      }

      
      await api.put('/rooms/1', {
        name: roomName,
        start_time: start,
        end_time: end
      });
      
      alert("Configurações salvas com sucesso!");
      onClose();

    } catch (err) {
      console.log(err);
      alert("Erro ao salvar configurações.");
    } finally {
      setLoading(false);
    }
  }
  if (!isOpen) return null;

  return (
    
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      
    
      <div className="bg-white w-full max-w-[450px] rounded-lg shadow-2xl p-6 relative animate-fade-in-up">
        
      
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Ajustes de agendamento</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
            <X size={20} weight="bold" />
          </button>
        </div>

        
        <form onSubmit={handleSaveSettings} className="flex flex-col gap-5">
          
        
          <div>
            <label className="text-xs font-bold text-gray-600 mb-1.5 block">
              Nome da sala
            </label>
            <input 
              type="text"
              className="w-full border border-gray-200 rounded p-3 text-xs text-gray-700 font-medium focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
              value={roomName}
              onChange={e => setRoomName(e.target.value)}
            />
          </div>

          
          <div>
            <label className="text-xs font-bold text-gray-600 mb-1.5 block">
              Horário Inicial & Final da sala
            </label>
            <div className="relative">
              <input 
                type="text"
                className="w-full border border-gray-200 rounded p-3 text-xs text-gray-700 font-medium focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                value={timeRange}
                onChange={e => setTimeRange(e.target.value)}
              />
              <Clock size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

         
          <div>
            <label className="text-xs font-bold text-gray-600 mb-1.5 block">
              Bloco de Horários de agendamento
            </label>
            <div className="relative">
              <select
                className="w-full border border-gray-200 rounded p-3 text-xs text-gray-700 font-medium focus:border-black focus:ring-1 focus:ring-black outline-none transition-all appearance-none bg-white"
                value={timeBlock}
                onChange={e => setTimeBlock(e.target.value)}
              >
                <option value="30 minutos">30 minutos</option>
                <option value="1 hora">1 hora</option>
                <option value="2 horas">2 horas</option>
              </select>
        
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

        
          <button type="button" className="flex items-center gap-2 text-xs font-bold text-gray-900 hover:text-gray-600 transition-colors w-fit">
            <Plus size={14} weight="bold" />
            Adicionar nova sala
          </button>

        
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white font-bold text-xs py-3.5 rounded mt-2 hover:bg-gray-900 transition-transform active:scale-95 flex items-center justify-center shadow-lg"
          >
            {loading ? <CircleNotch size={18} className="animate-spin" /> : "Salvar"}
          </button>

        </form>

      </div>
    </div>
  );
}