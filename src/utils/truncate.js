export function truncateText(text, wordLimit) {
    if (!text) return '';

    const words = String(text).trim().split(/\s+/);

    if (words.length <= wordLimit) {
        return text;
    }

    return words.slice(0, wordLimit).join(' ') + ' [...]';
}