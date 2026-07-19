import type { handleKeyDownProps } from "../types/props";

export function handleKeyDown({e, checkAnswer}: handleKeyDownProps) {
    if (e.key === "Enter") checkAnswer();
}