import { Database } from './Database';
import { LocationDB } from '../typings/entries';
import { Query, SelectFrom, UpdateValues } from '../typings/utils';

export class LocManager {
  private readonly _db: Database;

  constructor(db: Database) {
    this._db = db;
  }

  public async get<T extends keyof LocationDB>(
    id: string,
    columns: T[]
  ): Promise<Query<SelectFrom<LocationDB, T>, 1>> {
    return await this._db.query<Query<SelectFrom<LocationDB, T>, 1>>(
      `SELECT ${columns.join(', ')} FROM locations WHERE id=? LIMIT 1`,
      [id]
    );
  }

  public async getFromBot<T extends keyof LocationDB>(
    id: string,
    columns: T[]
  ): Promise<Query<SelectFrom<LocationDB, T>, 1>> {
    return await this._db.query<Query<SelectFrom<LocationDB, T>, 1>>(
      `SELECT ${columns.join(', ')} FROM locations WHERE id=? LIMIT 1`,
      [id]
    );
  }

  public async deleteFromBot(id: string): Promise<void> {
    return await this._db.query<void>(`DELETE FROM locations WHERE id = ?`, [
      id,
    ]);
  }

  public async register(id: string, config: string): Promise<void> {
    return await this._db.query<void>(
      'INSERT INTO locations (id, modul, config) VALUES (?, ?, ?)',
      [id, config]
    );
  }

  /** @argument columns - Has to be passed in as `as const` */
  public async update<T extends readonly (keyof LocationDB)[]>(
    id: string,
    columns: T,
    values: UpdateValues<T, LocationDB>
  ): Promise<void> {
    return await this._db.query<void>(
      `UPDATE moduls SET ${columns
        .map((e) => `${e}=?`)
        .join(', ')} WHERE id=? LIMIT 1`,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      /* @ts-ignore */
      [...values, id]
    );
  }
}
