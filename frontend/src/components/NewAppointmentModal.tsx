"use client";

import { useState, useEffect, FormEvent } from 'react';
import { X, CaretDown, CircleNotch } from 'phosphor-react';
import { toast } from 'sonner'; 
import { api } from '../api';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; 
}

interface Room {
  id: number;
  name: string;
}

export function NewAppointmentModal({ isOpen, onClose, onSuccess }: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState('');

  useEffect(() => {
    if (isOpen) {
      setRooms([
        { id: 1, name: "Sala de Reunião 1" },
        { id: 2, name: "Sala de Reunião 2" }
      ]);
      
      setSelectedDate('');
      setSelectedTime('');
      setSelectedRoomId('');
    }
  }, [isOpen]);

  async function handleCreateAppointment(e: FormEvent) {
    e.preventDefault();

  
    if (!selectedDate || !selectedTime || !selectedRoomId) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

   
    
   
    const appointmentDate = new Date(`${selectedDate}T${selectedTime}`);
    const now = new Date();

   
    if (appointmentDate < now) {
      toast.error("Não é possível agendar em uma data ou horário passado!");
      return;
    }
    
   

    setLoading(true);

    const promise = api.post('/agendamentos', {
      room_id: Number(selectedRoomId),
      date_time: `${selectedDate} ${selectedTime}`
    });

    toast.promise(promise, {
      loading: 'Verificando disponibilidade...',
      success: () => {
        onSuccess(); 
        onClose();   
        return 'Solicitação de agendamento enviada com sucesso!';
      },
      error: (err) => {
        return err.response?.data?.error || 'Não foi possível agendar neste horário. Tente outro.';
      },
      finally: () => {
        setLoading(false);
      }
    });
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      
      <div className="bg-white w-full max-w-[500px] rounded-lg shadow-2xl p-6 relative animate-fade-in-up">
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Novo Agendamento</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleCreateAppointment} className="flex flex-col gap-5">

         
          <div>
            <label className="text-xs font-bold text-gray-700 mb-2 block">
              Selecione uma <span className="font-extrabold">data</span> <span className="text-gray-400 font-normal">(Obrigatório)</span>
            </label>
            <input 
              type="date"
              
              min={new Date().toISOString().split('T')[0]} 
              className="w-full border border-gray-200 rounded p-3 text-sm text-gray-700 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all appearance-none"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 mb-2 block">
              Selecione um <span className="font-extrabold">horário</span> <span className="text-gray-400 font-normal">(Obrigatório)</span>
            </label>
            <input 
              type="time"
              className="w-full border border-gray-200 rounded p-3 text-sm text-gray-700 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
              value={selectedTime}
              onChange={e => setSelectedTime(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 mb-2 block">
              Selecione uma <span className="font-extrabold">Sala</span> <span className="text-gray-400 font-normal">(Obrigatório)</span>
            </label>
            <div className="relative">
              <select
                className="w-full border border-gray-200 rounded p-3 text-sm text-gray-700 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all appearance-none bg-white"
                value={selectedRoomId}
                onChange={e => setSelectedRoomId(e.target.value)}
              >
                <option value="" disabled>Selecione uma Sala</option>
                {rooms.map(room => (
                  <option key={room.id} value={room.id}>{room.name}</option>
                ))}
              </select>
              <CaretDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white font-bold text-sm py-4 rounded mt-4 hover:bg-gray-900 transition-transform active:scale-95 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <CircleNotch size={24} className="animate-spin" /> : "Confirmar Agendamento"}
          </button>

        </form>

      </div>
    </div>
  );
}