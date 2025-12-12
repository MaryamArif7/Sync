"use client";
import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import { searchResults, TUser } from "../lib/types";
import axios from "axios";

interface UserContextType {
  queue: searchResults[];
  setQueue: React.Dispatch<SetStateAction<searchResults[]>>;
  roomId: string | null;
  setRoomId: React.Dispatch<SetStateAction<string | null>>;
  user: TUser | null;
  setUser: React.Dispatch<SetStateAction<TUser | null>>;
  Rooms: string[] | null;
  setRooms: React.Dispatch<SetStateAction<string[] | null>>;
  fetchQueue: (roomId: string) => Promise<void>;
  // addToQueue: (song: QueueItem) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [queue, setQueue] = useState<searchResults[]>([]);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [Rooms, setRooms] = useState<string[] | null>(null);
  const [user, setUser] = useState<TUser | null>(null);
  const fetchQueue = useCallback(async (currentRoomId: string) => {
    if (!currentRoomId) return;

    try {
      const response = await axios.get(
        `http://localhost:5000/queue/${currentRoomId}`
      );
      if (response.data.success) {
        setQueue(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching queue:", error);
      setQueue([]);
    }
  }, []);
  const value = useMemo(
    () => ({
      queue,
      setQueue,
      roomId,
      setRoomId,
      user,
      setUser,
      Rooms,
      setRooms,
      fetchQueue,
    }),
    [queue, roomId, user, Rooms]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserProvider, useUserContext };
