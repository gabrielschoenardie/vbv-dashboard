import React from "react";
export default function Header() {
  return (
    <header className="mb-8 flex flex-col space-y-2 px-4">
      <h1 className="title-cine">VBV Dashboard — Hollywood Edition</h1>
      <div className="neon-line"></div>

      <p className="subtitle-cine">
        Cinematic Encoding • VBV Scientific Analyzer • Zero Recompression
      </p>
    </header>
  );
}