import { Database } from './Database';
import { PhoneDB } from '../typings/entries';
import { Query, SelectFrom, UpdateValues } from '../typings/utils';

export class PhoneManager {
  private readonly _db: Database;

  constructor(db: Database) {
    this._db = db;
  }

  public async get<T extends keyof PhoneDB>(
    number: string,
    columns: T[]
  ): Promise<Query<SelectFrom<PhoneDB, T>, 1>> {
    return await this._db.query<Query<SelectFrom<PhoneDB, T>, 1>>(
      `SELECT ${columns.join(', ')} FROM phone WHERE number=? LIMIT 1`,
      [number]
    );
  }

  public async register(number: string, notif: string): Promise<void> {
    return await this._db.query<void>(
      'INSERT INTO phone (number, notif) VALUES (?, ?)',
      [number, notif]
    );
  }

  public async delete(number: string): Promise<void> {
    return await this._db.query<void>('DELETE FROM phone WHERE number=?', [
      number,
    ]);
  }

  /** @argument columns - Has to be passed in as `as const` */
  public async update<T extends readonly (keyof PhoneDB)[]>(
    number: string,
    columns: T,
    values: UpdateValues<T, PhoneDB>
  ): Promise<void> {
    return await this._db.query<void>(
      `UPDATE phone SET ${columns
        .map((e) => `${e}=?`)
        .join(', ')} WHERE number=? LIMIT 1`,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      /* @ts-ignore */
      [...values, number]
    );
  }
}
