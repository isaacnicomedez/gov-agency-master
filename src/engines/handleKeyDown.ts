import type { handleKeyDownProps } from "../types/props";

export function handleKeyDown({e, onSubmit}: handleKeyDownProps) {
    if (e.key === "Enter") onSubmit();
}