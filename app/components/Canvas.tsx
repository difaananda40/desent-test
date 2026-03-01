"use client";

import { useDroppable } from "@dnd-kit/core";
import { RefObject, useEffect } from "react";
import { useWorkspaceStore } from "@/app/store/workspaceStore";
import { ActiveDrag } from "@/app/lib/types";
import CanvasItem from "@/app/components/CanvasItem";

export default function Canvas({
  activeDrag,
  canvasRef,
}: {
  activeDrag: ActiveDrag;
  canvasRef: RefObject<HTMLDivElement | null>;
}) {
  const items = useWorkspaceStore((state) => state.items);
  const setCanvasSize = useWorkspaceStore((state) => state.setCanvasSize);

  const { setNodeRef: setCanvasDroppableRef, isOver } = useDroppable({
    id: "canvas-dropzone",
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const updateSize = () => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      setCanvasSize(rect.width, rect.height);
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(canvasRef.current);

    return () => observer.disconnect();
  }, [canvasRef, setCanvasSize]);

  return (
    <div
      ref={(node) => {
        canvasRef.current = node;
        setCanvasDroppableRef(node);
      }}
      className={`relative h-full min-h-0 rounded-3xl border-2 border-dashed bg-white bg-[url('/room-bg.svg')] bg-cover bg-center bg-no-repeat p-4 shadow-sm ${
        isOver ? "border-zinc-500" : "border-zinc-200"
      }`}
    >
      {items.length === 0 ? (
        <div className="flex h-full min-h-130 items-center justify-center text-sm text-zinc-400">
          Drop item di sini
        </div>
      ) : null}

      {items.map((item) => (
        <CanvasItem key={item.instanceId} item={item} />
      ))}

      {activeDrag?.type === "catalog" ? (
        <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-2xl bg-zinc-900/80 px-4 py-3 text-xs text-white">
          Lepaskan untuk menaruh item.
        </div>
      ) : null}
    </div>
  );
}
