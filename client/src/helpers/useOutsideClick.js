import { useEffect } from "react";

const useOutsideClick = (refs, callback) => {
  const handleClick = e => {
     
    if (!refs.some(ref => ref.current && ref.current.contains(e.target))) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useOutsideClick;