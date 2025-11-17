"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import signupImage from "@/assets/signup.jpg";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authSchema } from "@/schemas/auth.schema";
import { singupUser } from "@/services/auth";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(authSchema.singupSchema),
  });
  const route = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Form Submitted:", data);
    const formdata = new FormData();
    formdata.append("first_name", data.firstName);
    formdata.append("last_name", data.lastName);
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    try {
      const result = await singupUser(formdata);
      console.log({ result });
      if (result?.email) {
        toast.success("Register successfull");
        route.push("/");
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
      {/* Left illustration section */}
      <div className="flex-1 bg-blue-50 flex items-center justify-center p-10">
        <Image
          src={signupImage}
          alt="Sign up illustration"
          className="max-w-2xl w-full mix-blend-multiply"
        />
      </div>

      {/* Right form section */}
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full md:w-3xl flex flex-col bg-white justify-center px-7 lg:px-16">
          <h2 className="text-3xl text-center font-bold text-gray-800 mb-1">
            Create your account
          </h2>
          <p className=" text-gray-500 text-center text-sm MT-3 mb-8">
            Start managing your tasks efficiently{" "}
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 text-black"
          >
            <div className="flex gap-4">
              <div className="w-1/2">
                <label
                  htmlFor=""
                  className="font-medium text-gray-700 inline-block mb-1.5"
                >
                  First Name
                </label>
                <input
                  {...register("firstName")}
                  placeholder="First Name"
                  className="w-full border border-[#D1D5DB] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <label
                  htmlFor=""
                  className="font-medium text-gray-700  inline-block mb-1.5"
                >
                  Last Name
                </label>
                <input
                  {...register("lastName")}
                  placeholder="Last Name"
                  className="w-full border border-[#D1D5DB] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor=""
                className="font-medium text-gray-700  inline-block mb-1.5"
              >
                Email
              </label>
              <input
                {...register("email")}
                placeholder="Email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor=""
                className="font-medium text-gray-700  inline-block mb-1.5"
              >
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor=""
                className="font-medium text-gray-700  inline-block mb-1.5"
              >
                Confirm Password
              </label>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm Password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 ">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full disabled:opacity-70 mt-1 disabled:cursor-not-allowed cursor-pointer bg-[#5272FF] text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/" className="text-blue-600 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
