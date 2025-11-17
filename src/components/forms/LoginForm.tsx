"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import loginImage from "@/assets/login.jpg";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "@/schemas/auth.schema";
import { toast } from "sonner";
import Image from "next/image";
import { getCurrentUser, loginUser } from "@/services/auth";
import { useAuth } from "@/provider/UserProvider";
import { IUser } from "@/types/user.type";
import { useRouter } from "next/navigation";

// ✅ Validation schema

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(authSchema.loginSchema),
  });

  const route = useRouter();
  const { setUser } = useAuth()!;
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formdata = new FormData();

    formdata.append("email", data.email);
    formdata.append("password", data.password);
    try {
      const result = await loginUser(formdata);
      console.log({ result });
      if (result?.access) {
        const user = (await getCurrentUser()) as IUser;
        console.log({ user });
        setUser(user);
        toast.success("Login successfull");
        route.push("/dashboard");
      } else {
        throw new Error(result?.detail);
      }
    } catch (error: any) {
      toast.error(error?.message);
      console.log({ error });
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-6 xl:flex-row">
      {/* Left illustration */}
      <div className="flex-1 bg-blue-50 flex items-center justify-center p-10">
        <Image
          src={loginImage}
          alt="Login illustration"
          className=" max-w-2xl w-full mix-blend-multiply"
        />
      </div>

      {/* Right form section */}
      <div className="flex-1 flex justify-center items-center">
        <div className=" flex w-full md:w-3xl flex-col bg-white text-black justify-center px-7 lg:px-16">
          <h2 className="text-3xl text-center font-bold text-gray-800 mb-1">
            Log in to your account
          </h2>
          <p className=" text-gray-500 text-center text-sm mt-3 mb-8">
            Log in to continue managing your tasks
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            {/* Email */}
            <div>
              <label
                htmlFor=""
                className="font-medium text-gray-700 inline-block mb-2"
              >
                Email
              </label>
              <input
                {...register("email")}
                placeholder="Email"
                className="w-full border border-[#D1D5DB] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                className="font-medium text-gray-700 inline-block mb-1.5"
                htmlFor=""
              >
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="w-full border border-[#D1D5DB] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a
                href="/forgot-password"
                className="text-[#5272FF] hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full disabled:opacity-70 disabled:cursor-not-allowed bg-[#5272FF] text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {isSubmitting ? "Logg in..." : "Log In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 ml-2 hover:underline">
              Register Now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
