let config;

if (process.env.NODE_ENV === 'production') {
    config = {
        baseURL: 'https://cookbookapi.wachcio.pl/api',
    };
} else {
    config = {
        baseURL: 'http://localhost:8000/api/',
    };
}

export { config };
