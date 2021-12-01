import { useState, useEffect, useRef } from "react";

function useInterval(callback) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function changeText() {
      savedCallback.current();
    }

    let id = setInterval(changeText, 500);

    return () => clearInterval(id);
  });
}

function Loading({ text, className }) {
  const [content, setContent] = useState(text);

  useInterval(() => {
    content === `${text}...` ? setContent(text) : setContent(content + ".");
  });

  return <p className={className}>{content}</p>;
}

export default Loading;
