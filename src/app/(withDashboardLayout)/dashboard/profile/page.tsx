import ProfileDetails from "@/components/dashboard/profile/Profile";
import { getMyProfile } from "@/services/profile";
export default async function ProfilePage() {
  const data = await getMyProfile();
  console.log({ data });
  return (
    <div>
      <ProfileDetails profile={data} />
    </div>
  );
}
