import React from 'react';
export default function MetricsGrid({ calc }) {
  const items = [
    { label: 'Buffer Inicial', value: calc.buffer_inicial + ' kbps' },
    { label: 'Ratio bufsize/maxrate', value: calc.ratio_bufsize_maxrate + 'x' },
    { label: 'Ratio maxrate/target', value: calc.ratio_maxrate_target + 'x' },
    { label: 'Headroom', value: '+' + calc.headroom_percent + '%' },
    { label: 'Margem Inicial', value: '+' + calc.margem_inicial + ' kbps' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((item, i) => (
        <div key={i} className="panel border-resolve p-4">
          <p className="text-gray-400 text-sm">{item.label}</p>
          <p className="text-xl font-bold text-gray-100">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
