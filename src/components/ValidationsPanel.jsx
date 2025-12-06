import React from "react";

export default function ValidationsPanel({ validations }) {
  const getColor = (status) => {
    if (status === "OK") return "text-[#4de86c]";
    if (status === "WARN") return "text-yellow-400";
    return "text-red-500";
  };

  return (
    <div className="panel border-resolve p-6">
      <h2 className="text-2xl font-semibold mb-4">Validações VBV</h2>

      <ul className="space-y-3">
        {validations.map((v, i) => (
          <li key={i} className="border-b border-[#232323] pb-3">
            <p className={getColor(v.status) + " font-semibold"}>
              {v.status} — {v.name}
            </p>
            <p className="text-gray-400 text-sm">{v.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}