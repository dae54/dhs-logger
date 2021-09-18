export function parseResponse(response) {
    if (response.results) {
        return response.results;
    }
    else {
        return response.data;
    }
}

export function parseError(error) {
    return (error && error.response && error.response.data) || (error && { message: error.message });
}


