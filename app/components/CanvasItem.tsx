"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { type CSSProperties } from "react";
import { WorkspaceItem } from "@/app/store/workspaceStore";

export default function CanvasItem({ item }: { item: WorkspaceItem }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `canvas:${item.instanceId}`,
      data: {
        type: "canvas-item",
        instanceId: item.instanceId,
        originX: item.x,
        originY: item.y,
      },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    width: item.width,
    height: item.height,
    left: item.x,
    top: item.y,
    opacity: isDragging ? 0 : 1,
  } as CSSProperties;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="absolute cursor-grab select-none touch-none active:cursor-grabbing"
    >
      <div className="h-full w-full">
        {item.thumbnail ? (
          <Image
            src={item.thumbnail}
            alt={item.name}
            width={item.width}
            height={item.height}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="h-full w-full bg-linear-to-br from-zinc-50 to-zinc-200" />
        )}
      </div>
    </div>
  );
}
