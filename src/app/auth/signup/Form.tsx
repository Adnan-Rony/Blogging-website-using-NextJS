"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axiosInstance from "@/app/lib/axios";
import toast from "react-hot-toast";

type SignupFormInputs = {
  name: string;
  email: string;
  password: string;
};

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormInputs>();

  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (data: SignupFormInputs) => {
    setIsPending(true);
    try {
      const res = await axiosInstance.post("/users/register", data);

      toast.success("Signup successful!");
      reset();
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Signup failed. Please try again.";
      toast.error(message);
      console.error("Signup error:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            placeholder="Your Name"
            className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

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
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
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
          className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50"
        >
          {isPending ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <p className="mt-6 text-sm text-center text-gray-600">
        Already have an account?
        <Link href="/auth/login" className="text-blue-600 hover:underline ml-1">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
