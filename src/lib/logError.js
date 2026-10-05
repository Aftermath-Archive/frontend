const messages = new Map([
    ['auth.login', 'Login failed.'],
    ['auth.register', 'Registration failed.'],
    ['incident.create', 'Incident creation failed.'],
    ['incident.fetch', 'Incident retrieval failed.'],
    ['incident.update', 'Incident update failed.'],
    ['incident.save', 'Incident save failed.'],
    ['archive.fetch', 'Incident archive retrieval failed.'],
    ['discussion.create', 'Discussion creation failed.'],
    ['user.fetch', 'Author lookup failed.'],
    ['render.boundary', 'Application rendering failed.'],
]);

const allowedCodes = new Set([
    'ERR_NETWORK',
    'ERR_BAD_REQUEST',
    'ERR_BAD_RESPONSE',
    'ERR_CANCELED',
    'ECONNABORTED',
    'ETIMEDOUT',
]);

function safeDetails(error) {
    try {
        const details = {};
        const status = error?.response?.status;
        const code = error?.code;
        if (Number.isInteger(status) && status >= 100 && status <= 599)
            details.status = status;
        if (allowedCodes.has(code)) details.code = code;
        return details;
    } catch {
        // Logging must not replace the original failure if an accessor throws.
        return {};
    }
}

// Keep messages fixed and metadata allow-listed. Never serialize an error:
// Axios config/response, messages, stacks and React errorInfo can hold secrets.
export function logError(event, error) {
    console.error(
        messages.get(event) || 'Application operation failed.',
        safeDetails(error)
    );
}
