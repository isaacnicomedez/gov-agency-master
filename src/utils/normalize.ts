export function normalize(text) {
    return text
        .trim()
        .replace(/\s+/g, "")
        .toLowerCase()
}