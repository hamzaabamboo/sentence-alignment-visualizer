"use client";

import { useState } from "react";
import { WordMatchRenderer } from "./WordMatchRenderer";

export const FileViewer = (props: 
   { english: string[]; japanese: string[]; align: string[] }
) => {
    const [selectedLine, setSelectedLine] = useState<number>(0);
  const { english, japanese, align } = props;
  return (
    <div>
       { selectedLine !== undefined && <WordMatchRenderer english={english[selectedLine]} japanese={japanese[selectedLine]} align={align[selectedLine]}/> }
      <p>
        {japanese.map((p, idx) => (
          <span key={idx} onClick={() => setSelectedLine(idx)}>{p.replaceAll(" ", "")}</span>
        ))}
      </p>
      <p>
        {english.map((p, idx) => (
          <span key={idx} onClick={() => setSelectedLine(idx)}>
            {p}
          </span>
        ))}
      </p>
    </div>
  );
};
