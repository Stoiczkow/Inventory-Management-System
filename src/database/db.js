import { join, resolve } from 'path';
import { JSONFileSync } from 'lowdb/node';
import { LowSync } from 'lowdb';

import INIT_DATA from './initData.js';

const __dirname = resolve();

const { NODE_ENV } = process.env;
let dbFileName = '';

if (NODE_ENV === 'test') {
  dbFileName = 'db_test.json';
} else {
  dbFileName = 'db.json';
}

const file = join(__dirname, `database/${dbFileName}`);

const db = new LowSync(new JSONFileSync(file), INIT_DATA);

db.read();
db.write();

export default db;
