"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { CatalogItem } from "@/app/store/workspaceStore";

export default function SidebarItem({ item }: { item: CatalogItem }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `catalog:${item.id}`,
      data: { type: "catalog", catalogId: item.id },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="flex w-full select-none touch-none flex-col gap-2 rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-3 opacity-40"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-zinc-400">
            {item.name}
          </span>
        </div>
        <div className="h-14 rounded-lg bg-zinc-100" />
      </div>
    );
  }

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex w-full select-none touch-none flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-3 text-left shadow-sm transition hover:border-zinc-300 hover:shadow-md hover:cursor-grab active:cursor-grabbing"
    >
      <div className="text-sm font-semibold text-zinc-900">{item.name}</div>
      <div className="relative w-full overflow-hidden rounded-lg aspect-video">
        {item.thumbnail ? (
          <Image
            src={item.thumbnail}
            alt={item.name}
            fill
            className="object-contain"
          />
        ) : (
          <div className="h-full w-full bg-linear-to-br from-zinc-50 to-zinc-200" />
        )}
      </div>
      <div className="text-xs text-zinc-500">
        {item.width}×{item.height}
      </div>
    </button>
  );
}
