import { createConnection } from 'mysql2/promise';

export const connection = await createConnection({
  host: 'localhost',
  user: 'root',
  database: 'driveroute'
});