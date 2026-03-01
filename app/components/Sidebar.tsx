"use client";

import dynamic from "next/dynamic";
import { useWorkspaceStore } from "@/app/store/workspaceStore";

const SidebarItem = dynamic(() => import("@/app/components/SidebarItem"), {
  ssr: false,
});

export default function Sidebar() {
  const catalog = useWorkspaceStore((state) => state.catalog);

  return (
    <aside className="flex h-full min-h-0 flex-col gap-4 pr-2">
      <div className="shrink-0">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
          Monis.rent
        </p>
        <h1 className="mt-2 text-2xl font-semibold">Workspace Builder</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Drag item ke canvas dan susun ruangan impianmu.
        </p>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overflow-x-visible">
        {catalog.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}
      </div>
    </aside>
  );
}
