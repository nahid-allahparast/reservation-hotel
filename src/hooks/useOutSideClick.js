import { useEffect } from "react";

const useOutSideClick = (ref, exceptionId, cb) => {
  useEffect(() => {
    const outSideClickHandler = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        e.target.id !== exceptionId
      ) {
        cb();
      }
    };
    document.addEventListener("mousedown", outSideClickHandler);
    return () => {
      document.removeEventListener("mousedown", outSideClickHandler);
    };
  }, [ref]);
};

export default useOutSideClick;
