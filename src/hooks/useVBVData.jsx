import React from "react";
import { useState } from "react";

export function useVBVData() {
  const [data, setData] = useState(null);

  function loadJSON(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const parsed = JSON.parse(e.target.result);
      setData(parsed);
    };
    reader.readAsText(file);
  }

  return { data, loadJSON };
}