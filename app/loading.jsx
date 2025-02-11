/** @format */

import ClipLoader from "react-spinners/ClipLoader";
const Override = {
  display: "block",
  margin: "100px auto",
};
const loading = () => {
  return (
    <ClipLoader
      color='#3b82f6'
      cssOverride={Override}
      size={150}
      aria-label='loading spinner'
    />
  );
};

export default loading;
