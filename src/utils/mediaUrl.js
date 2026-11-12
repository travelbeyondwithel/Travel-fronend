const API_ORIGIN =
    import.meta.env.VITE_API_ORIGIN ||
    'http://127.0.0.1:8000';

export function getMediaUrl(path) {
    if (!path) {
        return '';
    }

    // The helper accepts only the actual image URL/path.
    // It does not care whether the image is:
    // author, hero, introduction, article, category, etc.

    if (typeof path !== 'string') {
        return '';
    }

    // Already an absolute URL

    if (
        path.startsWith('http://') ||
        path.startsWith('https://')
    ) {
        return path;
    }

    // Relative Django media path
    return `${API_ORIGIN}${path.startsWith('/') ? '' : '/'}${path}`;
}