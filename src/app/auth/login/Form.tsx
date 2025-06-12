"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axiosInstance from "@/app/lib/axios";
import toast from "react-hot-toast";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Loginform = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (data: LoginFormInputs) => {
    setIsPending(true);
    try {
      const res = await axiosInstance.post("/users/login", {
        email: data.email,
        password: data.password,
      });

      toast.success("Login successful!");
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
      console.error("Login error:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="you@example.com"
            className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
            placeholder="••••••••"
            className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[40px] cursor-pointer text-gray-500"
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </span>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
     <p className="mt-6 text-sm text-center text-gray-600">
                 Don’t have an account?
               <Link href="/auth/signup" className="text-blue-600 hover:underline ml-1">
               SignUp
               </Link>
             </p>
    </div>
  );
};

export default Loginform;
