// cache.service.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CacheService {
    private readonly cacheDuration = 10 * 60 * 1000; // 10 minutes in milliseconds

    getCache<T>(key: string): T | null {
        const cachedData = localStorage.getItem(key);
        if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData);
            const now = new Date().getTime();
            if (now - timestamp < this.cacheDuration) {
                return data;
            } else {
                localStorage.removeItem(key);
            }
        }
        return null;
    }

    setCache<T>(key: string, data: T) {
        const timestamp = new Date().getTime();
        localStorage.setItem(key, JSON.stringify({ data, timestamp }));
    }

    clearCache(key: string) {
        localStorage.removeItem(key);
    }
}
