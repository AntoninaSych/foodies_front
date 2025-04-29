import { ThreeDots } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.container}>
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass={css.loaderWrapper}
      />
    </div>
  );
};

export default Loader;
