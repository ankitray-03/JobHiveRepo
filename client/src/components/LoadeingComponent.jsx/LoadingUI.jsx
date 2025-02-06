import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const LoadingUI = () => {
  return (
    <div className="mx-[50%] my-[10%]">
      <ClimbingBoxLoader
        color={"#1883BF"}
        loading={true}
        size={30}
        speedMultiplier={1.5}
      />
    </div>
  );
};

export default LoadingUI;
