// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Session methods
  async createSession(sessionData) {
    return this.request('/session/create', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });
  }

  async getSession(sessionId) {
    return this.request(`/session/${sessionId}`);
  }

  async joinSession(sessionId) {
    return this.request(`/session/join/${sessionId}`);
  }

  // Recording methods
  async uploadRecording(formData) {
    const url = `${API_BASE_URL}/upload`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  }

  async getRecordings() {
    return this.request('/recordings');
  }

  async getRecording(recordingId) {
    return this.request(`/recordings/${recordingId}`);
  }

  // Health check
  async healthCheck() {
    const url = `${API_BASE_URL.replace('/api', '')}/health`;
    
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
export default apiService;