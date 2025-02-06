import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import axios from "axios";

import { Briefcase } from "lucide-react";

import Input from "../components/Input";
import SocialAuthButtons from "../components/Auth/SocialAuthButtons";
import { signInSuccess } from "../store/user/UserSlice.js";

const SignUp = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser]);

  const handleSignUp = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/signup", data);
      console.log(response.data);
      if (response.data.success) {
        setLoading(false);
        setError(null);
        dispatch(signInSuccess(response.data.user));

        navigate("/sign-in");
      } else {
        console.log(response);
        setLoading(false);
        setError(response.data.message);
        return;
      }
    } catch (err) {
      console.log("hello");
      setLoading(false);
      setError("SignUp failed, try again !");
    }
  };
  return (
    <div className="max-w-md mx-auto my-[5%]">
      <Link to="/">
        <Briefcase className="size-[15%] text-blue-700 mx-auto my-auto" />
      </Link>
      <div className="mt-4 mb-4">
        <div className="text-3xl font-extrabold mx-[16%]">
          {" "}
          Create your account
        </div>
        <div className="text-center mt-2">
          Already have an account?
          <Link to="/signin" className="text-blue-700 font-semibold">
            Sign in
          </Link>
        </div>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(handleSignUp)}>
        <Input
          name="name"
          label="Full Name"
          type="text"
          {...register("name", {
            required: true,
          })}
        />
        <Input
          name="email"
          label="Email"
          required={true}
          type="email"
          {...register("email", {
            required: true,
            pattern:
              /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/,
          })}
        />
        <Input
          name="password"
          label="Password"
          required={true}
          type="password"
          {...register("password", {
            required: true,
          })}
        />

        <div>
          <p className="text-sm text-red-600 font-semibold mb-3 px-[30%]">
            {error}
          </p>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
          >
            {loading ? "Please Wait" : "Create Account"}
          </button>
        </div>

        <SocialAuthButtons />
      </form>
    </div>
  );
};

export default SignUp;
