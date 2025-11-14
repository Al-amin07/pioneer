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
    <div className="min-h-screen flex">
      {/* Left illustration */}
      <div className="w-1/2 bg-blue-50 flex items-center justify-center p-10">
        <Image
          src={loginImage}
          alt="Login illustration"
          className="max-w-md w-full mix-blend-multiply"
        />
      </div>

      {/* Right form section */}
      <div className="w-1/2 flex flex-col bg-white text-black justify-center px-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome back</h2>
        <p className="text-sm text-gray-500 mb-8">
          Log in to continue managing your tasks
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <input
              {...register("email")}
              placeholder="Email"
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full disabled:opacity-70 disabled:cursor-not-allowed bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Logg in..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
