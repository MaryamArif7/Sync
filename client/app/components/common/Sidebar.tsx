"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Player } from "./Player";
import React, { useState } from "react";
import {
  LayoutDashboard,
  DoorOpen,
  ListMusic,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const LINKS = [
  { name: "Rooms", href: "/browse", icon: DoorOpen },
  { name: "Playlists", href: "/Discover/playlists", icon: ListMusic },
];

export function Sidebar({ children }: { children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);
  
 
  const roomIdMatch = pathname.match(/\/Discover\/rooms\/([^\/]+)/);
  const currentRoomId = roomIdMatch ? roomIdMatch[1] : null;

  return (
    <div className="flex h-screen overflow-hidden">
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm shadow-lg">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-white">Sync</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-black to-black/95 shadow-[0_0_20px_rgba(236,72,153,0.3)] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="mb-12 lg:text-center">
            <span className="text-2xl font-bold text-white ">Sync</span>
          </div>
          <div className="mb-6 pb-6 border-b border-white/10">
            <nav className="space-y-1" role="navigation">
              {LINKS.map(({ name, href, icon: Icon }) => {
              
                const isActive = pathname === href || 
                  (name === "Rooms" && pathname.startsWith("/Discover/rooms"));
                
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeSidebar}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                      isActive
                        ? " text-white font-semibold shadow-[0_0_25px_rgba(236,72,153,0.8)]"
                        : "text-gray-400 hover:text-white hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 relative z-10 transition-all duration-300 ${
                        isActive
                          ? "text-white drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
                          : "text-gray-400 group-hover:text-pink-400 group-hover:scale-110 group-hover:drop-shadow-[0_0_6px_rgba(236,72,153,0.6)]"
                      }`}
                    />
                    <span className="text-sm relative z-10 transition-all duration-300">
                      {name}
                    </span>
                  </Link>
                );
              })}
            </nav>
            
           
          </div>
          <div className="flex items-center gap-3 mt-64">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                <span className="text-sm font-bold text-white">JD</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white truncate">
                Maryam 
              </h3>
              <p className="text-xs text-gray-400 truncate">Premium</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-white/10">
          <button
            className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-white  rounded-xl transition-all duration-300 group relative overflow-hidden  hover:shadow-[0_0_25px_rgba(236,72,153,0.8)]"
          >
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <LogOut className="w-5 h-5 relative z-10 group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(236,72,153,0.8)] transition-all duration-300" />
            <span className="text-sm relative z-10">Log out</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col bg-black/95 pt-16 lg:pt-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-32">
          {children}
        </main>
      </div>
    </div>
  );
}