"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const url = "https://todo-app.pioneeralpha.com/api";

export const getMyProfile = async () => {
  const accessToken = (await cookies()).get("access")?.value as string;

  try {
    const res = await fetch(`${url}/users/me/`, {
      method: "GET",
      next: {
        tags: ["PROFILE"],
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log({ error });
    return new Error(error);
  }
};
export const updateProfile = async (updatedData: FormData) => {
  const accessToken = (await cookies()).get("access")?.value as string;

  try {
    const res = await fetch(`${url}/users/me/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: updatedData,
    });
    const data = await res.json();
    revalidateTag("PROFILE", { expire: 0 });

    return data;
  } catch (error: any) {
    console.log({ error });
    return new Error(error);
  }
};
