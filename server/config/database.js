// const { Pool } = require('pg');

// const pool = new Pool({
//   user: process.env.DB_USER || 'postgres',
//   host: process.env.DB_HOST || 'localhost',
//   database: process.env.DB_NAME || 'saral_ai',
//   password: process.env.DB_PASSWORD || 'Dhameliy@hit31',
//   port: process.env.DB_PORT || 5432,
// });

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://saral_ai_user:8QxGuXlF9k3S5ybQ3pmZRhghlFAtfXvA@dpg-d4jhpkemcj7s73biidt0-a.oregon-postgres.render.com/saral_ai',
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
