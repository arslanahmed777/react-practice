import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

export const Child = forwardRef((props, ref) => {
  const [count, setCount] = useState(0);
  const inputref = useRef();
  useImperativeHandle(ref, () => {
    return {
      increment,
      focus,
    };
  });

  const increment = () => {
    setCount(count + 1);
  };
  const focus = () => {
    inputref.current.focus();
    console.log(inputref.current);
  };
  return (
    <>
      <button onClick={increment}>click</button>
      <input ref={inputref} type="text" />
      <h4>{count}</h4>
    </>
  );
});

const UseImperativeHandle = () => {
  const ref = useRef();
  const handler = () => {
    ref.current.increment();
    ref.current.focus();
  };
  return (
    <div>
      <button onClick={handler}>click parent</button>
      <Child ref={ref} />
    </div>
  );
};

export default UseImperativeHandle;
