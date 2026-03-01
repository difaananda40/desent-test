"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useWorkspaceStore } from "@/app/store/workspaceStore";

export default function CartDropdown() {
  const items = useWorkspaceStore((state) => state.items);
  const removeItem = useWorkspaceStore((state) => state.removeItem);
  const clearItems = useWorkspaceStore((state) => state.clearItems);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement | null>(null);

  const handlePointerDown = useCallback((event: MouseEvent | TouchEvent) => {
    const target = event.target as Node | null;
    if (!cartRef.current || !target) return;
    if (!cartRef.current.contains(target)) {
      setIsCartOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [handlePointerDown]);

  return (
    <div className="flex items-center gap-3">
      <div ref={cartRef} className="relative">
        <button
          type="button"
          onClick={() => setIsCartOpen((open) => !open)}
          className="cursor-pointer list-none rounded-full border border-zinc-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-800"
        >
          Cart • {items.length}
        </button>
        {isCartOpen ? (
          <div className="absolute right-0 z-30 mt-3 w-80 rounded-2xl border border-zinc-200 bg-white p-5 shadow-lg">
            <h3 className="text-lg font-semibold">Cart</h3>
            <p className="text-sm text-zinc-500">Total item: {items.length}</p>

            <div className="mt-4 flex flex-col gap-3">
              {items.length === 0 ? (
                <div className="rounded-xl border border-dashed border-zinc-200 p-4 text-sm text-zinc-400">
                  Belum ada item.
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.instanceId}
                    className="flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-2 text-sm"
                  >
                    <div>
                      <div className="font-semibold text-zinc-800">
                        {item.name}
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.instanceId)}
                      className="cursor-pointer rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-700"
                    >
                      Hapus
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 border-t border-zinc-100 pt-4">
              <button className="cursor-pointer w-full rounded-full bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800">
                Rent Workspace
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <button
        onClick={() => clearItems()}
        className="cursor-pointer rounded-full border border-zinc-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-800"
      >
        Reset
      </button>
    </div>
  );
}
