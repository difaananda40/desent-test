export const getEventClientPosition = (
  event: MouseEvent | TouchEvent | PointerEvent,
) => {
  if ("touches" in event && event.touches[0]) {
    return { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }
  if ("clientX" in event) {
    return { x: event.clientX, y: event.clientY };
  }
  return { x: 0, y: 0 };
};
