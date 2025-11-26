import type {
    SearchResponse,
    SearchResponseApi,
} from '../types/candidate';
import { mapCandidatesFromApi } from '../utils/candidateMapper';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as T;
  }

  private async postSearch(
    endpoint: string,
    payload: Record<string, unknown>,
  ): Promise<SearchResponse> {
    const result = await this.request<SearchResponseApi>(endpoint, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return {
      ...result,
      candidates: mapCandidatesFromApi(result.candidates),
    };
  }

  // Search candidates with AI
  async searchCandidates(
    query: string,
    page: number = 1,
    limit: number = 50,
  ): Promise<SearchResponse> {
    const payload = {
      searchQuery: query,
      page,
      limit,
      filters: {},
    };

    try {
      return await this.postSearch('/search/candidate', payload);
    } catch (error) {
      console.warn('Primary candidate endpoint failed, retrying legacy route', error);
      return this.postSearch('/search/candidates', payload);
    }
  }

  // Shortlist candidate
  async shortlistCandidate(candidateId: string): Promise<{ success: boolean }> {
    return this.request('/search/shortlist', {
      method: 'POST',
      body: JSON.stringify({ candidateId }),
    });
  }

  // Unlock candidate contact
  async unlockContact(candidateId: string): Promise<{ success: boolean }> {
    return this.request('/candidates/unlock-contact', {
      method: 'POST',
      body: JSON.stringify({ candidateId }),
    });
  }

  // Like candidate
  async likeCandidate(candidateId: string): Promise<{ success: boolean }> {
    return this.request('/candidates/like', {
      method: 'POST',
      body: JSON.stringify({ candidateId }),
    });
  }

  // Dislike candidate
  async dislikeCandidate(candidateId: string): Promise<{ success: boolean }> {
    return this.request('/candidates/dislike', {
      method: 'POST',
      body: JSON.stringify({ candidateId }),
    });
  }

  // Health check
  async healthCheck(): Promise<{ status: string }> {
    return this.request('/health');
  }
}

export const apiService = new ApiService();