"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { List, CalendarCheck, Users, Scroll, SignOut } from 'phosphor-react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; 

export function SidebarAdmin() {
  const pathname = usePathname();
  const { user, signOut } = useContext(AuthContext);

  const isActive = (path: string) => {
    return pathname === path 
      ? "bg-black text-white shadow-sm" 
      : "text-gray-500 hover:bg-gray-200/60 hover:text-gray-900";
  }

  return (
    <div className="flex flex-col h-full w-full bg-[#f3f4f6] border-r border-gray-200">
      
     
      <div className="flex-1 flex flex-col py-6 px-4">
        
        
        <div className="flex items-center gap-2 px-2 mb-8">
           <div className="bg-black text-white p-1.5 rounded-md">
             <List size={20} weight="bold" className="transform -rotate-45" />
           </div>
           <span className="font-bold text-lg text-gray-900 tracking-tight">GoldSpell</span>
        </div>

       
        <nav className="flex flex-col gap-1.5">
          
          <Link 
            href="/dashboard/admin" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-semibold transition-all duration-200 ${isActive('/dashboard/admin')}`}
          >
            <CalendarCheck size={18} weight={pathname === '/dashboard/admin' ? 'fill' : 'bold'} />
            Gestão de Agendamentos
          </Link>

          <Link 
            href="/dashboard/admin/clients" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-semibold transition-all duration-200 ${isActive('/dashboard/admin/clients')}`}
          >
            <Users size={18} weight={pathname === '/dashboard/admin/clients' ? 'fill' : 'bold'} />
            Clientes
          </Link>

          <Link 
            href="/dashboard/admin/logs" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-semibold transition-all duration-200 ${isActive('/dashboard/admin/logs')}`}
          >
            <Scroll size={18} weight={pathname === '/dashboard/admin/logs' ? 'fill' : 'bold'} />
            Logs do Sistema
          </Link>

        </nav>
      </div>

      
      <div className="p-4 border-t border-gray-200 bg-[#f3f4f6]">
        <div className="flex items-center justify-between px-2 py-1">
          
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-900 leading-tight">
              {user?.name || "Admin"}
            </span>
            <span className="text-[10px] text-purple-600 font-bold uppercase mt-0.5">
              Administrador
            </span>
          </div>

          <button 
            onClick={signOut} 
            title="Sair do sistema"
            className="text-gray-400 hover:text-red-600 transition-colors p-1.5 rounded-md hover:bg-gray-200"
          >
            <SignOut size={16} weight="bold" />
          </button>
          
        </div>
      </div>

    </div>
  );
}