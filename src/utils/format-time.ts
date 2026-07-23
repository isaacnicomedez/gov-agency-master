export function formatTime(totalSeconds: number | null) {
    if (totalSeconds === null) return "—";

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes > 0 ? `${minutes}m ` : ""}${seconds}s`;
}