const API_BASE_URL = 'http://localhost:5000/scan';

// Helper function for exponential backoff retry logic
const fetchWithRetry = async (url, options = {}, retries = 3) => {
    let lastError = null;
    for (let i = 0; i < retries; i++) {
        const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s...
        if (i > 0) await new Promise(resolve => setTimeout(resolve, delay));

        try {
            const response = await fetch(url, options);
            if (response.ok) {
                return response;
            } else if (response.status === 404) {
                // Do not retry 404s
                throw new Error(`Resource not found at ${url}`);
            } else {
                // Throw an error for server issues or API errors to trigger retry
                const errorBody = await response.text();
                throw new Error(`HTTP error ${response.status}: ${errorBody}`);
            }
        } catch (error) {
            lastError = error;
            console.warn(`Attempt ${i + 1} failed for ${url}. Retrying in ${delay / 1000}s. Error: ${error.message}`);
        }
    }
    throw new Error(`API request failed after ${retries} attempts. Last error: ${lastError?.message}`);
};

/**
 * Provides a dummy user ID for manual authentication/testing.
 * Since the backend is currently using a hardcoded dummy ID, the frontend 
 * only needs to supply a non-empty string to satisfy the header requirement.
 * @returns {string} A dummy user ID.
 */
const getDummyUserId = () => {
    return 'frontend-test-user';
};


/**
 * POST /scan/scans
 * Initiates a new scan job on the backend.
 * @param {object} formData - The structured data for the scan.
 * @returns {Promise<object>} The scan initiation response (scanId, status, message).
 */
export const initiateScan = async (formData) => {
    const userId = getDummyUserId(); // Use the simplified function
    const url = `${API_BASE_URL}/scans`;

    const payload = {
        target: formData.target,
        scanType: formData.scanType,
        // Optional: Include scanOptions if you add controls for them later
        // scanOptions: {} 
    };

    const response = await fetchWithRetry(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Send user ID in a custom header
            'X-User-ID': userId 
        },
        body: JSON.stringify(payload)
    });

    return response.json();
};

/**
 * GET /scan/scans/:scanId
 * Retrieves the current status of a scan job.
 * @param {string} scanId - The ID of the scan job.
 * @returns {Promise<object>} The scan details object.
 */
export const getScanStatus = async (scanId) => {
    const url = `${API_BASE_URL}/scans/${scanId}`;
    const response = await fetchWithRetry(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.json();
};
