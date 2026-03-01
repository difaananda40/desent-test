import { create } from "zustand";

export type CatalogItem = {
  id: string;
  name: string;
  price: number;
  thumbnail?: string;
  width: number;
  height: number;
};

export type WorkspaceItem = {
  instanceId: string;
  catalogId: string;
  name: string;
  price: number;
  x: number;
  y: number;
  width: number;
  height: number;
  thumbnail?: string;
};

type WorkspaceState = {
  catalog: CatalogItem[];
  items: WorkspaceItem[];
  canvas: {
    width: number;
    height: number;
  };
  setCanvasSize: (width: number, height: number) => void;
  addItemAt: (catalogId: string, x: number, y: number) => void;
  moveItem: (instanceId: string, x: number, y: number) => void;
  removeItem: (instanceId: string) => void;
  clearItems: () => void;
};

const initialCatalog: CatalogItem[] = [
  {
    id: "minimalist-desk",
    name: "Minimalist Desk",
    price: 450000,
    thumbnail: "/desk.png",
    width: 500,
    height: 200,
  },
  {
    id: "drawer-desk",
    name: "Drawer Desk",
    price: 600000,
    thumbnail: "/desk2.png",
    width: 500,
    height: 200,
  },
  {
    id: "exclusive-chair",
    name: "Exclusive Chair",
    price: 450000,
    thumbnail: "/chair.png",
    width: 250,
    height: 350,
  },
  {
    id: "cool-chair",
    name: "Cool Chair",
    price: 400000,
    thumbnail: "/chair2.png",
    width: 250,
    height: 350,
  },
  {
    id: "mac",
    name: "Mac Desktop",
    price: 1000000,
    thumbnail: "/mac.png",
    width: 180,
    height: 150,
  },
  {
    id: "speaker",
    name: "Speaker",
    price: 150000,
    thumbnail: "/speaker.png",
    width: 80,
    height: 50,
  },
  {
    id: "turntable",
    name: "Turntable",
    price: 200000,
    thumbnail: "/turntable.png",
    width: 120,
    height: 80,
  },
];

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `item_${Math.random().toString(36).slice(2, 9)}`;

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  catalog: initialCatalog,
  items: [],
  canvas: {
    width: 0,
    height: 0,
  },
  setCanvasSize: (width, height) =>
    set({
      canvas: {
        width,
        height,
      },
    }),
  addItemAt: (catalogId, x, y) => {
    const catalogItem = get().catalog.find((item) => item.id === catalogId);
    if (!catalogItem) return;

    const { canvas } = get();
    const clampedX = clamp(x, 0, Math.max(0, canvas.width - catalogItem.width));
    const clampedY = clamp(
      y,
      0,
      Math.max(0, canvas.height - catalogItem.height),
    );

    set((state) => ({
      items: [
        ...state.items,
        {
          instanceId: uid(),
          catalogId: catalogItem.id,
          name: catalogItem.name,
          price: catalogItem.price,
          width: catalogItem.width,
          height: catalogItem.height,
          thumbnail: catalogItem.thumbnail,
          x: clampedX,
          y: clampedY,
        },
      ],
    }));
  },
  moveItem: (instanceId, x, y) => {
    const { canvas, items } = get();
    const item = items.find((entry) => entry.instanceId === instanceId);
    if (!item) return;

    const clampedX = clamp(x, 0, Math.max(0, canvas.width - item.width));
    const clampedY = clamp(y, 0, Math.max(0, canvas.height - item.height));

    set((state) => ({
      items: state.items.map((entry) =>
        entry.instanceId === instanceId
          ? {
              ...entry,
              x: clampedX,
              y: clampedY,
            }
          : entry,
      ),
    }));
  },
  removeItem: (instanceId) =>
    set((state) => ({
      items: state.items.filter((entry) => entry.instanceId !== instanceId),
    })),
  clearItems: () => set({ items: [] }),
}));
