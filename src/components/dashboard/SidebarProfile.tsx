import { getMyProfile } from "@/services/profile";

export default async function SidebarProfile() {
  const data = await getMyProfile();
  console.log({ data });
  return (
    <div className="text-center mb-10">
      <img
        src="/avatar.png"
        className="w-20 h-20 rounded-full mx-auto mb-3"
        alt="User"
      />
      <h3 className="text-lg font-semibold">amanuel</h3>
      <p className="text-sm text-gray-300">amanuel@gmail.com</p>
    </div>
  );
}
