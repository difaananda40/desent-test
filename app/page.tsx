"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useWorkspaceStore } from "@/app/store/workspaceStore";
import { ActiveDrag } from "@/app/lib/types";
import { getEventClientPosition } from "@/app/lib/utils";
import Sidebar from "@/app/components/Sidebar";
import CartDropdown from "@/app/components/CartDropdown";

const Canvas = dynamic(() => import("@/app/components/Canvas"), { ssr: false });

function DragOverlayContent({
  thumbnail,
  name,
  width,
  height,
}: {
  thumbnail: string;
  name: string;
  width: number;
  height: number;
}) {
  return (
    <div style={{ width, height }}>
      <Image
        src={thumbnail}
        alt={name}
        width={width}
        height={height}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

export default function Home() {
  const catalog = useWorkspaceStore((state) => state.catalog);
  const items = useWorkspaceStore((state) => state.items);
  const addItemAt = useWorkspaceStore((state) => state.addItemAt);
  const moveItem = useWorkspaceStore((state) => state.moveItem);

  const [activeDrag, setActiveDrag] = useState<ActiveDrag>(null);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 4 },
    }),
  );

  const activeCatalogItem =
    activeDrag?.type === "catalog"
      ? catalog.find((entry) => entry.id === activeDrag.catalogId)
      : null;

  const activeCanvasItem =
    activeDrag?.type === "canvas-item"
      ? items.find((entry) => entry.instanceId === activeDrag.instanceId)
      : null;

  const activeOverlayItem = activeCatalogItem ?? activeCanvasItem ?? null;

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const data = event.active.data.current as ActiveDrag;
    setActiveDrag(data);

    const pointerEvent = event.activatorEvent as
      | MouseEvent
      | TouchEvent
      | PointerEvent;

    dragStartRef.current = getEventClientPosition(pointerEvent);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const data = event.active.data.current as ActiveDrag;
      const overId = event.over?.id;

      if (!data) {
        setActiveDrag(null);
        dragStartRef.current = null;
        return;
      }

      if (data.type === "catalog" && overId === "canvas-dropzone") {
        const catalogItem = catalog.find(
          (entry) => entry.id === data.catalogId,
        );
        const rect = canvasRef.current?.getBoundingClientRect();
        const overlayEl = document.querySelector(
          "[data-dnd-kit-drag-overlay]",
        ) as HTMLElement | null;

        if (catalogItem && rect) {
          let x: number;
          let y: number;

          if (overlayEl) {
            const overlayRect = overlayEl.getBoundingClientRect();
            x = overlayRect.left - rect.left;
            y = overlayRect.top - rect.top;
          } else if (dragStartRef.current) {
            const clientX = dragStartRef.current.x + event.delta.x;
            const clientY = dragStartRef.current.y + event.delta.y;
            x = clientX - rect.left - catalogItem.width / 2;
            y = clientY - rect.top - catalogItem.height / 2;
          } else {
            x = 0;
            y = 0;
          }

          addItemAt(catalogItem.id, x, y);
        }
      }

      if (data.type === "canvas-item") {
        const nextX = data.originX + event.delta.x;
        const nextY = data.originY + event.delta.y;
        moveItem(data.instanceId, nextX, nextY);
      }

      setActiveDrag(null);
      dragStartRef.current = null;
    },
    [catalog, addItemAt, moveItem],
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen w-screen overflow-hidden bg-zinc-50 text-zinc-900">
        <div className="grid h-full w-full min-h-0 grid-cols-[260px_minmax(0,1fr)] gap-6 px-6 py-6">
          <Sidebar />

          <main className="flex h-full min-h-0 flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Canvas</h2>
                <p className="text-sm text-zinc-500">
                  Bebas geser item di area ini.
                </p>
              </div>
              <CartDropdown />
            </div>

            <div className="flex-1">
              <Canvas activeDrag={activeDrag} canvasRef={canvasRef} />
            </div>
          </main>
        </div>
      </div>
      <DragOverlay dropAnimation={null} style={{ zIndex: 9999 }}>
        {activeOverlayItem?.thumbnail ? (
          <DragOverlayContent
            thumbnail={activeOverlayItem.thumbnail}
            name={activeOverlayItem.name}
            width={activeOverlayItem.width}
            height={activeOverlayItem.height}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
