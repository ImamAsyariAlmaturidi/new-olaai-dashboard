"use server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export async function getInstagramProfile(token: string) {
  try {
    const res = await fetch(`${BACKEND_URL}/instagram/profile-dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Faed to fetch profile");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("[getProfileFromBackend] Error:", error);
    throw error;
  }
}

export async function getInstagramMediaWithComments(token: string) {
  try {
    const res = await fetch(`${BACKEND_URL}/instagram/media-comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch media comments");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("[getInstagramMediaComments] Error:", error);
    throw error;
  }
}
