
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";
import { MusicRoomsBrowserClient } from "../components/dashboard/rooms/MusicRoomsBrowserClient";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default async function MusicRoomsBrowser() {
  const cookieStore = await cookies();
  const syncId = cookieStore.get("syncId")?.value;

  if (!syncId) {
    redirect("/");
  }

  const [userRoomsRes, featuredRoomsRes] = await Promise.all([
    axios.get(`${API_BASE_URL}/roomsuser`, {
      withCredentials: true,
      headers: { Cookie: `syncId=${syncId}` },
    }).catch(() => ({ data: [] })),
    
    axios.get(`${API_BASE_URL}/roomsfeatured`, {
      withCredentials: true,
      headers: { Cookie: `syncId=${syncId}` },
    }).catch(() => ({ data: [] })),
  ]);

  return (
    <MusicRoomsBrowserClient 
      userRooms={userRoomsRes.data?.data || []}
      featuredRooms={featuredRoomsRes.data?.data || []}
      syncId={syncId}
    />
  );
}