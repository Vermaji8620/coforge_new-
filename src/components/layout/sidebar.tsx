"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Upload,
  Search,
  FileText,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutGrid },
  { label: "Upload", href: "/upload", icon: Upload },
  { label: "Search", href: "/search", icon: Search },
  { label: "Documents", href: "/documents", icon: FileText },
  { label: "Compliance", href: "/compliance", icon: ShieldAlert, badge: 17 },
];

export function Sidebar() {
  const pathname = usePathname();

  const isCurrentActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-white flex flex-col justify-between h-screen sticky top-0 z-30 select-none">
      <div>
        {/* Brand Header */}
        <div className="p-6 pb-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#5438dc] flex items-center justify-center text-white shadow-sm shadow-[#5438dc]/30 group-hover:bg-[#472fc4] transition-colors">
              <FileText className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-[17px] font-bold text-slate-900 tracking-tight leading-tight">
                CodeForge
              </div>
              <div className="text-[17px] font-bold text-slate-900 tracking-tight leading-tight">
                Runner
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="px-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isCurrentActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-medium transition-all",
                  active
                    ? "bg-[#eeebfd] text-[#5438dc] font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "w-[18px] h-[18px] transition-colors",
                      active ? "text-[#5438dc]" : "text-slate-500"
                    )}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full font-semibold",
                      active
                        ? "bg-[#ff4d4f]/10 text-[#d9363e]"
                        : "bg-rose-50 text-rose-600"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile Footer */}
      <div className="p-4">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/80 border border-slate-100 hover:bg-slate-100/70 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-[#e6e1fc] text-[#5438dc] flex items-center justify-center font-bold text-sm">
            PM
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-slate-900 truncate">
              Priya Mehta
            </div>
            <div className="text-xs text-slate-500 truncate">
              Ops lead · Legal
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
