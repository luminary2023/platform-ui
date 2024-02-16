import React, { useState, useEffect, FC, useCallback } from "react";

interface TextShufflerProps {
  texts: any;
}

const textStyle = {
  background: "-webkit-linear-gradient(left,  #FD6E6A, #FFC600)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  marginLeft: "18px",
};

const TextShuffler: FC<TextShufflerProps> = ({ texts }) => {
  const [currentText, setCurrentText] = useState(texts[0]);

  const shuffle = useCallback(() => {
    const shuffledTexts = [...texts].sort(() => Math.random() - 0.1);
    setCurrentText(shuffledTexts[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      shuffle();
    }, 500);
  }, []);

  return <span style={textStyle}>{currentText}</span>;
};

export default TextShuffler;
