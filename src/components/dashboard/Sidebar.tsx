"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FiHome,
  FiCheckSquare,
  FiUser,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const menuItems = [
    {
      id: "/dashboard",
      label: "Dashboard",
      icon: <FiHome />,
    },
    {
      id: "/dashboard/todos",
      label: "Todos",
      icon: <FiCheckSquare />,
    },
    {
      id: "/dashboard/profile",
      label: "Account Information",
      icon: <FiUser />,
    },
  ];

  return (
    <div className="relative">
      {/* Mobile toggle */}
      <button
        className="md:hidden absolute top-4 left-4 z-50 text-white"
        onClick={() => setOpen(!open)}
      >
        <FiMenu size={26} />
      </button>

      <aside
        className={`bg-[#0F2544] text-white w-64 min-h-screen p-6 flex flex-col transition-all duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Profile Section */}
        <div className="text-center mb-10">
          <img
            src="/avatar.png"
            className="w-20 h-20 rounded-full mx-auto mb-3"
            alt="User"
          />
          <h3 className="text-lg font-semibold">amanuel</h3>
          <p className="text-sm text-gray-300">amanuel@gmail.com</p>
        </div>

        {/* Nav */}
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item?.id}
              //   onClick={() => setActive(item.id)}
              className={`flex items-center gap-3 w-full text-left p-2 rounded-md cursor-pointer
            ${pathname === item.id ? "bg-white/20" : "hover:bg-white/10"}`}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-auto pt-10">
          <button className="flex items-center gap-3 hover:bg-white/10 p-2 rounded-md w-full">
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>
    </div>
  );
}
