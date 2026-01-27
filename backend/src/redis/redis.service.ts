import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

/**
 * RedisService provides a wrapper around ioredis to handle caching operations.
 */
@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;

  /**
   * Initializes the Redis client on module initialization.
   */
  onModuleInit() {
    this.client = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
  }

  /**
   * Closes the Redis connection on module destruction.
   */
  onModuleDestroy() {
    this.client.quit();
  }

  /**
   * Retrieves a value from Redis by its key.
   * @param key The key to look up.
   * @returns The cached value as a string, or null if not found.
   */
  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  /**
   * Sets a value in Redis with an optional expiration time.
   * @param key The key to set.
   * @param value The value to store.
   * @param ttl Optional time-to-live in seconds.
   */
  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.client.set(key, value, 'EX', ttl);
    } else {
      await this.client.set(key, value);
    }
  }

  /**
   * Deletes a key from Redis.
   * @param key The key to remove.
   */
  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}
