import OTPInput from "../components/Auth/OTPInput";
import axios from "axios";

const VerifyOTPPage = () => {
  return (
    <div className="p-[10%]">
      <OTPInput handleVerify />
    </div>
  );
};

export default VerifyOTPPage;
