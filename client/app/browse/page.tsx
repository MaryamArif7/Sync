import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";
import { UserRooms } from "../components/dashboard/rooms/UserRooms";
import { FeaturedRooms } from "../components/dashboard/rooms/FeaturedRooms";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default async function MusicRoomsBrowser() {
  const cookieStore = await cookies();
  const syncId = cookieStore.get("syncId")?.value;

  if (!syncId) {
    redirect("/");
  }

   const [userRoomsRes, featuredRoomsRes] = await Promise.all([
     axios
       .get(`${API_BASE_URL}/roomsuser`, {
         withCredentials: true,
         headers: { Cookie: `syncId=${syncId}` },
       })
       .catch((err) => {
         console.error("Failed to fetch user rooms:", err);
         return { data: [] };
       }),

     axios
       .get(`${API_BASE_URL}/roomsfeatured`, {
         withCredentials: true,
         headers: { Cookie: `syncId=${syncId}` },
       })
       .catch((err) => {
         console.error("Failed to fetch featured rooms:", err);
         return { data: [] };
       }),
   ]);
console.log("User rooms response:", userRoomsRes.data);
console.log("Featured rooms response:", featuredRoomsRes.data);
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex h-screen">
        <UserRooms rooms={userRoomsRes.data?.data || []} syncId={syncId} />
        <FeaturedRooms rooms={featuredRoomsRes.data?.data || []} syncId={syncId} />
      </div>
    </div>
  );
}
