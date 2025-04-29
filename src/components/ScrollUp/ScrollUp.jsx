import { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa6";
import clsx from "clsx";
import css from "./ScrollUp.module.css";
import { SCROLL_UP_DISTANCE } from "../../const";

const ScrollUp = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleOnScroll = () => {
      const pos = document.documentElement.scrollTop;
      pos > SCROLL_UP_DISTANCE ? setShow(true) : setShow(false);
    };

    window.addEventListener("scroll", handleOnScroll);

    return () => window.removeEventListener("scroll", handleOnScroll);
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    document.documentElement.scrollTop = 0;
  };

  return (
    <a
      href="#"
      className={clsx(css.wrapper, { [css.show]: show })}
      onClick={handleClick}
    >
      <FaAngleUp />
    </a>
  );
};

export default ScrollUp;
