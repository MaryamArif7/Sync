"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  { name: "Discover", href: "/Discover", icon: LayoutDashboard },
  { name: "Rooms", href: "/Discover/rooms", icon: DoorOpen },
  { name: "Playlists", href: "/Discover/playlists", icon: ListMusic },
];

export function Sidebar({ children }: { children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);
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

          <nav className="space-y-1" role="navigation">
            {LINKS.map(({ name, href, icon: Icon }) => {
              const isActive = pathname === href;
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

        <div className="p-6 border-t border-white/10">
          <button
            // onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-white  rounded-xl transition-all duration-300 group relative overflow-hidden  hover:shadow-[0_0_25px_rgba(236,72,153,0.8)]"
          >
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <LogOut className="w-5 h-5 relative z-10 group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(236,72,153,0.8)] transition-all duration-300" />
            <span className="text-sm relative z-10">Log out</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 overflow-y-auto bg-black/95 pt-16 lg:pt-0">
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
