export type ActiveDrag =
  | { type: "catalog"; catalogId: string }
  | {
      type: "canvas-item";
      instanceId: string;
      originX: number;
      originY: number;
    }
  | null;
