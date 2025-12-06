import React from "react";
import { Upload } from "lucide-react";

export default function FileUpload({ onLoad }) {
  return (
    <label className="cursor-pointer bg-gray-900 px-4 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-800">
      <Upload size={20} />
      Importar results.json

      <input
        type="file"
        accept="application/json"
        className="hidden"
        onChange={(e) => onLoad(e.target.files[0])}
      />
    </label>
  );
}