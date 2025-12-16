"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, BookOpen, MessageSquare, LayoutDashboard } from "lucide-react";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Teams",
    href: "/admin/teams",
    icon: Users,
  },
  {
    name: "Opdrachten",
    href: "/admin/assignments",
    icon: BookOpen,
  },
  {
    name: "Inzendingen",
    href: "/admin/review",
    icon: MessageSquare,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-80 bg-[#EAE2D5] shadow-sm pt-32 pb-10 px-6 hidden md:block min-h-screen">
      {/* Admin Welcome Section */}
      <div className="bg-[#FFE600] rounded-2xl p-5 mb-10">
        <h2 className="text-2xl font-extrabold text-[#2C2C2C]">Welkom,</h2>
        <p className="text-2xl font-extrabold text-[#2C2C2C]">Admin</p>
      </div>

      {/* Navigation Section */}
      <div>
        <h3 className="text-lg font-extrabold text-[#2C2C2C] mb-4">
          Navigatie
        </h3>
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 py-3 px-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-[#FFE600] text-[#2C2C2C] font-semibold"
                    : "text-[#111827] hover:bg-[#F5F0E8]"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}