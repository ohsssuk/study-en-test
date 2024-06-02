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

export function formatTime(seconds: number): string {
  const minutes: number = Math.floor(seconds / 60);
  const remainingSeconds: number = seconds % 60;

  const formattedMinutes: string =
    minutes < 10 ? "0" + minutes : minutes.toString();
  const formattedSeconds: string =
    remainingSeconds < 10
      ? "0" + remainingSeconds
      : remainingSeconds.toString();

  return `${formattedMinutes}:${formattedSeconds}`;
}
