"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FiCamera } from "react-icons/fi";

export default function AccountInfoForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="bg-white p-8 border rounded-xl shadow-sm mt-8">
      <h2 className="text-xl font-semibold mb-6">Account Information</h2>

      {/* Profile Upload */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative w-24 h-24">
          <img
            src="/avatar.png"
            className="w-full h-full rounded-full object-cover border"
          />
          <button className="absolute bottom-0 right-0 bg-gray-200 p-2 rounded-full shadow">
            <FiCamera size={16} />
          </button>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Upload New Photo
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>First Name</label>
            <input
              {...register("firstName")}
              className="input"
              placeholder="Enter First Name"
            />
          </div>

          <div>
            <label>Last Name</label>
            <input
              {...register("lastName")}
              className="input"
              placeholder="Enter Last Name"
            />
          </div>
        </div>

        <div>
          <label>Email</label>
          <input
            {...register("email")}
            className="input"
            placeholder="Enter Email"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Address</label>
            <input
              {...register("address")}
              className="input"
              placeholder="Enter Address"
            />
          </div>
          <div>
            <label>Contact Number</label>
            <input
              {...register("contact")}
              className="input"
              placeholder="Enter Number"
            />
          </div>
        </div>

        <div>
          <label>Birthday</label>
          <input type="date" {...register("birthday")} className="input" />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-md"
          >
            Save Changes
          </button>
          <button type="button" className="bg-gray-300 px-5 py-2 rounded-md">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
