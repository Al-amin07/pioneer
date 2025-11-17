"use client";
import { updateProfile } from "@/services/profile";
import { IProfileData } from "@/types/user.type";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FiCamera } from "react-icons/fi";
import { toast } from "sonner";

export default function ProfileDetails({ profile }: { profile: IProfileData }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      email: profile?.email || "",
      address: profile?.address || "",
      contact_number: profile?.contact_number || "",
      birthday: profile?.birthday ? profile.birthday.split("T")[0] : "",
    },
  });

  const [preview, setPreview] = useState(
    profile?.profile_image || "/avatar.png"
  );
  const [file, setFile] = useState<File | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    const fileUrl = URL.createObjectURL(selectedFile);
    setPreview(fileUrl);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Submitted Data:", data);
    const formdata = new FormData();
    formdata.append("first_name", data?.first_name);
    formdata.append("last_name", data?.last_name);
    formdata.append("address", data?.address);
    formdata.append("contact_number", data?.contact_number);
    formdata.append("birthday", data?.birthday);
    if (file) {
      formdata.append("profile_image", file);
    }
    try {
      const result = await updateProfile(formdata);
      console.log({ result });
      if (result?.email) {
        toast.success("Profile updated successfully");
      } else {
        throw new Error(result?.detail);
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  // 🔥 Beautiful Input Style (Reusable Class)
  const inputStyle =
    "w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400";

  return (
    <div className="bg-white p-8  rounded-xl shadow-sm mt-8">
      <h2 className="text-xl font-semibold mb-6">Account Information</h2>

      {/* Profile Upload */}
      <div className="flex items-center border px-5 py-3 border-[#A1A3ABA1] max-w-md rounded-xl gap-6 mb-8">
        {/* Profile Image Box */}
        <div className="relative w-24 h-24">
          <img
            src={preview}
            className="w-full h-full rounded-full object-cover border"
          />

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            id="profileUpload"
            className="hidden"
            onChange={handleImageChange}
          />

          {/* Camera Button */}
          <label
            htmlFor="profileUpload"
            className="absolute bottom-0 right-0 bg-gray-200 p-2 rounded-full shadow cursor-pointer hover:bg-gray-300 transition"
          >
            <FiCamera size={16} />
          </label>
        </div>

        {/* Upload Button */}
        <label
          htmlFor="profileUpload"
          className="bg-[#5272FF] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition"
        >
          Upload New Photo
        </label>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 border border-[#A1A3ABA1] p-8 rounded-md"
      >
        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-700">First Name</label>
            <input
              {...register("first_name")}
              className={inputStyle}
              placeholder="Enter First Name"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Last Name</label>
            <input
              {...register("last_name")}
              className={inputStyle}
              placeholder="Enter Last Name"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="font-medium text-gray-700">Email</label>
          <input
            {...register("email")}
            className={inputStyle}
            placeholder="Enter Email"
            disabled
          />
        </div>

        {/* Address + Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-700">Address</label>
            <input
              {...register("address")}
              className={inputStyle}
              placeholder="Enter Address"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Contact Number</label>
            <input
              {...register("contact_number")}
              className={inputStyle}
              placeholder="Enter Number"
            />
          </div>
        </div>

        {/* Birthday */}
        <div>
          <label className="font-medium text-gray-700">Birthday</label>
          <input type="date" {...register("birthday")} className={inputStyle} />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            type="submit"
            className="bg-[#5272FF] disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed text-white px-5 py-2 rounded-md hover:bg-blue-400 transition"
          >
            {isSubmitting ? "Saving...." : "Save Changes"}
          </button>

          <button
            type="button"
            className="bg-gray-200 text-gray-700 px-5 py-2 cursor-pointer rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
