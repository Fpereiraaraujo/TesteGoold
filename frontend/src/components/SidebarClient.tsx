"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { List, CalendarBlank, Scroll, User, SignOut } from 'phosphor-react';
import { useContext } from 'react';
import { AuthContext } from '@/src/contexts/AuthContext'; 

export function SidebarClient() {
  const pathname = usePathname();
  const { user, signOut } = useContext(AuthContext);

  const isActive = (path: string) => {
    return pathname === path 
      ? "bg-black text-white shadow-sm" 
      : "text-gray-500 hover:bg-gray-200/60 hover:text-gray-900";
  }


  return (
    <div className="flex flex-col h-full w-full bg-[#f3f4f6]">
      
      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col py-6 px-4">
    
        {/* Logo */}
        <div className="flex items-center gap-2 px-2 mb-8">
           <div className="bg-black text-white p-1.5 rounded-md">
             <List size={20} weight="bold" className="transform -rotate-45" />
           </div>
           <span className="font-bold text-lg text-gray-900 tracking-tight">GoldSpell</span>
        </div>
        
        {/* Navegação */}
        <nav className="flex flex-col gap-1.5">
          
          <Link 
            href="/dashboard/client" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-semibold transition-all duration-200 ${isActive('/dashboard/client')}`}
          >
            <CalendarBlank size={18} weight={pathname === '/dashboard/client' ? 'fill' : 'bold'} />
            Agendamentos
          </Link>

          <Link 
            href="/dashboard/client/logs" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-semibold transition-all duration-200 ${isActive('/dashboard/client/logs')}`}
          >
            <Scroll size={18} weight={pathname === '/dashboard/client/logs' ? 'fill' : 'bold'} />
            Logs
          </Link>

          <Link 
            href="/dashboard/client/profile" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-semibold transition-all duration-200 ${isActive('/dashboard/client/profile')}`}
          >
            <User size={18} weight={pathname === '/dashboard/client/profile' ? 'fill' : 'bold'} />
            Minha Conta
          </Link>

        </nav>
      </div>

    
      <div className="p-4 border-t border-gray-200 bg-[#f3f4f6]">
        <div className="flex items-center justify-between px-2 py-1">
          
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-900 leading-tight">
              {user?.name || "..."}
            </span>
            <span className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">
              Cliente
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