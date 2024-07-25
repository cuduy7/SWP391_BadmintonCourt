export function validateURLAvatar(url: string | undefined | null) {
    if (!url || url.trim() === "") {
        return "/images/avatar.jpg"
    }

    try {
        new URL(url)
        return url
    } catch (err) {
        return "/images/avatar.jpg"
    }
}

export function validateURLProduct(url: string | undefined | null) {
    if (!url || url.trim() === "") {
        return "/images/item_1.jpg"
    }

    try {
        new URL(url)
        return url
    } catch (err) {
        return "/images/item_1.jpg"
    }
}

export function isValidUrl(url: string | undefined | null) {
    if (!url || url.trim() === "") {
        return false
    }

    try {
        new URL(url);
    } catch (_) {
        return false;
    }

    return true;
}

export function isValidBase64(url: string | undefined | null) {
    if (!url || url.trim() === "") {
        return false
    }

    try {
        btoa(atob(url)) == url
    } catch (_) {
        return false
    }

    return true
}

export function validateDate(value: string | undefined | null) {
    if (!value) {
        const date = new Date()
        return `${date.getDate()}:${date.getMonth() + 1}:${date.getFullYear()}`
    }

    return value;
}

export function validateName(value: string | undefined | null) {
    if (!value || value.trim() === '') {
        return "Tên minh họa"
    }

    return value;
}

export function validateTitle(value: string | undefined | null) {
    if (!value || value.trim() === '') {
        return "Sân minh họa"
    }

    return value;
}

export function validateDes(value: string | undefined | null) {
    if (!value || value.trim() === '') {
        return "Văn bản chỉ mang tính chất"
    }

    return value;
}

export function validateAddress(value: string | undefined | null) {
    if (!value || value.trim() === '') {
        return "Địa điểm chưa có"
    }

    return value;
}


