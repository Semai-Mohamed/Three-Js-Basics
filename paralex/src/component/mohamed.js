import React, { useEffect, useRef, useState } from 'react';
import './Atropos.css';

function Mohamed() {
  const myref = useRef(null);
  const [topValue, setTopValue] = useState(0);

  useEffect(() => {
    const button = myref.current;

    const clickHandler = () => {
      setTopValue(100); // Change the top value on click
    };

    button.addEventListener('click', clickHandler);

    return () => {
      button.removeEventListener('click', clickHandler);
    };
  }, []);

  return (
    <div>
      <div></div>
      <button
        ref={myref}
        style={{
          position: 'relative',
          top: `${topValue}px`, // Set the top value
          transition: 'top 1s ease',
        }}
      >
        click
      </button>
    </div>
  );
}

export default Mohamed;
