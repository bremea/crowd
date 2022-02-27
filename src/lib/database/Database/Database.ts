import { createPool, Pool, PoolConfig } from 'mariadb';

import { LocManager } from './LocManager';

export class Database {
  private readonly _pool: Pool;

  public readonly locations: LocManager;

  constructor(options: PoolConfig) {
    this._pool = createPool(options);
    this.locations = new LocManager(this);
  }

  public async query<
    T extends (Record<string, unknown> | undefined)[] | void = Record<
      string,
      unknown
    >[]
  >(query: string, args: unknown[]): Promise<T> {
    return await this._pool.query(query, args);
  }
}

export const db = new Database({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});
