"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const url = "https://todo-app.pioneeralpha.com/api";
export const singupUser = async (signupData: FormData) => {
  try {
    const res = await fetch(`${url}/users/signup/`, {
      method: "POST",
      body: signupData,
    });
    const data = await res.json();
    console.log({ data });
    return data;
  } catch (error: any) {
    console.log({ error });
    return new Error(error);
  }
};

export const loginUser = async (loginData: FormData) => {
  try {
    const res = await fetch(`${url}/auth/login/`, {
      method: "POST",
      body: loginData,
    });
    const data = await res.json();
    console.log({ data });
    if (data?.access) {
      (await cookies()).set("access", data?.access);
      (await cookies()).set("refresh", data?.refresh);
    }
    return data;
  } catch (error: any) {
    console.log({ error });
    return new Error(error);
  }
};

export const logOutUser = async () => {
  (await cookies()).delete("access");
  (await cookies()).delete("refresh");
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("access")?.value as string;
  let decoded = null;
  if (accessToken) {
    decoded = jwtDecode(accessToken);
  }
  return decoded;
};
