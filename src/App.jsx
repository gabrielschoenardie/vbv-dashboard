import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import ScorePie from './components/ScorePie';
import InstagramBars from './components/InstagramBars';
import MetricsGrid from './components/MetricsGrid';
import ValidationsPanel from './components/ValidationsPanel';
import { useVBVData } from './hooks/useVBVData';

export default function App() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0a]">
      <Sidebar />

      {/* Slot onde cada página será renderizada */}
      <main className="flex-1 ml-64 p-10">
        <Outlet />
      </main>
    </div>
  );
}
