export const getBasePath = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    if (!!apiUrl && apiUrl != "" && apiUrl.includes("qaerp")) {
        return apiUrl
    }

    const protocol = window.location.protocol;
    const hostname = window.location.hostname;

    if (protocol === 'http:' && hostname === 'localhost') {
        return `http://localhost:3000`
    }

    return `${protocol}//${hostname}`;
}
