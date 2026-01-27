"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { List, X } from "phosphor-react";

import { SidebarAdmin } from "@/src/components/SidebarAdmin";
import { SidebarClient } from "@/src/components/SidebarClient";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isAdminPath = pathname?.startsWith("/dashboard/admin");

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
   
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-sm transition-opacity"
        />
      )}


      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:relative md:translate-x-0
        `}
      >
        
        <div className="absolute top-4 right-4 md:hidden z-50">
          <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-black">
            <X size={24} weight="bold" />
          </button>
        </div>

      
        <div className="h-full overflow-y-auto">
             {isAdminPath ? <SidebarAdmin /> : <SidebarClient />}
        </div>
      </aside>

  
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
       
        <header className="bg-white border-b border-gray-200 p-4 flex items-center gap-4 md:hidden">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            <List size={24} weight="bold" />
          </button>
          <span className="font-bold text-gray-900 text-lg">GoldSpell</span>
        </header>


        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          {children}
        </main>
      </div>

    </div>
  );
}