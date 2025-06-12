

import Link from "next/link";
import SignupForm from "./Form";

const Signuppage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Create an Account</h2>
        <p className="text-sm text-gray-500">Register to get started</p>
      </div>

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <SignupForm />
      </div>
      
    </div>
  );
};

export default Signuppage;
