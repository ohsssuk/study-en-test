export function findItemFromListById<T>(
  list: Array<T>,
  key: keyof T,
  id: number
): T | null {
  if (!list || list.length === 0) {
    return null;
  }

  const index = list.findIndex((item) => item[key] === id);
  if (index !== -1) {
    return list[index];
  } else {
    return null;
  }
}
