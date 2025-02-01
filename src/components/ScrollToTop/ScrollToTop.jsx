// ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  // useEffect(() => {
  //   console.log("Global scroll triggered on route change:", pathname);
  //   setTimeout(() => {
  //     window.scrollTo(0, 0);
  //     console.log("Scroll top after call:", document.documentElement.scrollTop);
  //   }, 0);
  // }, [pathname]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
