
"use client";
import { UserRooms } from "../../dashboard/rooms/UserRooms";
import { FeaturedRooms } from "../../dashboard/rooms/FeaturedRooms";
import { useUserContext } from "../../../store/UserContext"; 
import { useEffect } from "react";

interface Props {
  userRooms: any[];
  featuredRooms: any[];
  syncId: string;
}

export function MusicRoomsBrowserClient({ userRooms, featuredRooms, syncId }: Props) {
  const { setRooms} = useUserContext();

  useEffect(() => {
    setRooms(userRooms);
  }, [userRooms, setRooms]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex h-screen">
        <UserRooms rooms={userRooms} syncId={syncId} />
        <FeaturedRooms rooms={featuredRooms} syncId={syncId} />
      </div>
    </div>
  );
}