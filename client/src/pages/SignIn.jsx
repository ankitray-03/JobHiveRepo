import { useEffect, useState } from "react";
import SocialAuthButtons from "../components/Auth/SocialAuthButtons";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  signInSuccess,
  signInFailure,
  signInStart,
} from "../store/user/UserSlice.js";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Briefcase } from "lucide-react";
import Input from "../components/Input.jsx";

const SignIn = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser]);

  const login = async (data) => {
    try {
      dispatch(signInStart());
      const response = await axios.post("/api/auth/login", data);

      if (response.data.success) {
        // login successful
        dispatch(signInSuccess(response.data.user));

        navigate("/dashboard");
      } else {
        // login failed
        dispatch(signInFailure(response.message));
      }
    } catch (error) {
      dispatch(signInFailure("Invalid Credentials!, try again"));
    }
  };
  return (
    <div className="mx-auto max-w-md my-20 ">
      <Link to="/">
        <Briefcase className="size-[15%] text-blue-700 mx-auto my-auto" />
      </Link>
      <div className="mt-4 mb-4">
        <div className="text-3xl font-extrabold mx-[11%]">
          {" "}
          Sign in to your account
        </div>
        <div className="text-center mt-2">
          Or{" "}
          <Link to="/signup" className="text-blue-700 font-semibold">
            create a new account
          </Link>
        </div>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(login)}>
        <Input
          label="Email Address"
          name="email"
          autoComplete="email"
          required={true}
          {...register("email", {
            required: true,
            pattern:
              /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/,
          })}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          required={true}
          {...register("password", { required: true })}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link
              to="/forgot-password"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-red-500 py-2 px-[25%]">
            {error}
          </p>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
          >
            {loading ? "Wait, logging..." : "Sign in"}
          </button>
        </div>

        <SocialAuthButtons />
      </form>
    </div>
  );
};

export default SignIn;
