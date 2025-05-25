"use server";

import { revalidatePath } from "next/cache";

export async function selectFacebookPage(
  token: string,
  page_id: string,
  ig_id: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/select-facebook-page`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ page_id, ig_id }),
    }
  );

  if (!response.ok) throw new Error("Failed to select Facebook page");
  const data = await response.json();
  revalidatePath("/dashboard/connect-account");
  revalidatePath("/dashboard");
  return data.page;
}

export async function unselectFacebookPage(token: string, page_id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/unselect-facebook-page`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ page_id }),
    }
  );

  if (!response.ok) throw new Error("Failed to unselect Facebook page");
  const data = await response.json();
  revalidatePath("/dashboard/connect-account");
  revalidatePath("/dashboard");
  return data.page;
}
