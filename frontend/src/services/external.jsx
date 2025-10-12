import React from 'react'; // Included as requested for a .jsx service file, though it contains pure JS.

// --- API Configuration and Utilities ---
const API_BASE_URL = 'http://localhost:5000/scan'; 
const MAX_RETRIES = 3; 

// Utility for creating a delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Executes a fetch request with exponential backoff for resilience against transient network issues.
 * @param {string} endpoint - The API endpoint relative to the base URL (e.g., '/scans').
 * @param {object} options - Fetch options (method, headers, body, etc.).
 * @returns {Promise<object>} The parsed JSON response body.
 * @throws {Error} If all retry attempts fail.
 */
const fetchWithRetry = async (endpoint, options = {}) => {
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
      
      if (!response.ok) {
        // Attempt to parse the server error message
        const errorBody = await response.json().catch(() => ({ message: 'Unknown server error' }));
        throw new Error(`Server Error: ${response.status} - ${errorBody.message || response.statusText}`);
      }
      
      return response.json();
      
    } catch (error) {
      if (i === MAX_RETRIES - 1) {
        // Throw the final error if retries are exhausted
        console.error(`[API] Failed to fetch ${endpoint} after ${MAX_RETRIES} attempts.`, error);
        throw new Error(error.message || `Network error or server unavailable.`);
      }
      
      // Calculate exponential backoff delay (2s, 4s, 8s, ...) + small random jitter
      const waitTime = Math.pow(2, i + 1) * 1000 + Math.random() * 500;
      console.warn(`[API] Attempt ${i + 1} failed for ${endpoint}. Retrying in ${Math.round(waitTime / 1000)}s...`);
      await delay(waitTime);
    }
  }
};

/**
 * API Call 1: Initiates a new security scan job.
 * Endpoint: POST /scan/scans
 * @param {object} payload - The scan data { target, scanType, scanOptions }.
 * @returns {Promise<object>} The response data, typically containing the unique scanId (e.g., { scanId: '...' }).
 */
export const initiateScan = async (payload) => {
  return fetchWithRetry('/scans', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
};

/**
 * API Call 2: Fetches the current status and results of a specific scan job.
 * Endpoint: GET /scan/scans/:scanId
 * @param {string} scanId - The unique ID of the scan job.
 * @returns {Promise<object>} The scan status object (e.g., { status: 'COMPLETE', findings: [...] }).
 */
export const getScanStatus = async (scanId) => {
  if (!scanId) {
    throw new Error("Scan ID is required to fetch status.");
  }
  return fetchWithRetry(`/scans/${scanId}`, {
    method: 'GET',
  });
};
