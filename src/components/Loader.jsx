import { LoaderIcon } from "react-hot-toast";

const Loader = () => {
  return (
    <span className="loader">
      Loading data ...  <LoaderIcon className="icon" />
    </span>
  );
};

export default Loader;
