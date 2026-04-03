import knex from 'knex';
import path from 'path';

export const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.join(process.cwd(), 'database.sqlite'),
  },
  useNullAsDefault: true,
});

export async function initDb() {
  if (!(await db.schema.hasTable('meals'))) {
    await db.schema.createTable('meals', (table) => {
      table.string('id').primary();
      table.string('name');
      table.string('description');
      table.float('price');
      table.string('category');
      table.integer('calories');
      table.string('ingredients');
      table.string('image');
      table.string('tags');
    });
  }

  if (!(await db.schema.hasTable('orders'))) {
    await db.schema.createTable('orders', (table) => {
      table.string('id').primary();
      table.string('userId');
      table.text('items');
      table.float('total');
      table.string('date');
      table.string('status');
    });
  }
}
