import React from 'react';
import { Link } from 'react-router-dom';
import { Film, BarChart3, Upload, LayoutDashboard } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#111111] h-screen fixed left-0 top-0 border-r border-[#232323] p-6 flex flex-col justify-between">
      {/* Logo */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <Film size={26} className="text-[#4de86c]" />
          <h1 className="font-semibold text-lg">VBV Analyzer</h1>
        </div>

        {/* Menu */}
        <nav className="space-y-4">
          <Link to="/" className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#1a1a1a]">
            <LayoutDashboard size={18} />
            Dashboard Principal
          </Link>

          <Link
            to="/full-dashboard"
            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#1a1a1a]"
          >
            <BarChart3 size={18} />
            VBV Dashboard Completo
          </Link>

          <Link
            to="/import"
            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#1a1a1a]"
          >
            <Upload size={18} />
            Importar JSON
          </Link>
        </nav>
      </div>

      {/* Rodapé */}
      <footer className="text-gray-600 text-sm">Hollywood Edition © 2025</footer>
    </aside>
  );
}
