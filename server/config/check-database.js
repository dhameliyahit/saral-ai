// check-database.js
const { Client } = require('pg');

const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'saral_ai',
  password: 'Dhameliy@hit31',
  port: 5432,
};

async function checkDatabase() {
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL');

    // Check total candidates
    const countResult = await client.query('SELECT COUNT(*) as total FROM candidates');
    console.log(`Total candidates: ${countResult.rows[0].total}`);

    // Check sample candidates
    console.log('\nSample candidates:');
    const sampleResult = await client.query('SELECT id, name, title, skills, location FROM candidates LIMIT 5');
    sampleResult.rows.forEach(row => {
      console.log(`ID: ${row.id}, Name: ${row.name}, Title: ${row.title}, Location: ${row.location}, Skills: ${row.skills}`);
    });

    // Check if any candidates have React skills
    console.log('\nCandidates with React skills:');
    const reactResult = await client.query(`
      SELECT id, name, skills, location 
      FROM candidates 
      WHERE EXISTS (SELECT 1 FROM unnest(skills) AS s WHERE s ILIKE '%react%')
      LIMIT 5
    `);
    console.log(`Found ${reactResult.rows.length} candidates with React skills`);
    reactResult.rows.forEach(row => {
      console.log(`ID: ${row.id}, Name: ${row.name}, Skills: ${row.skills}, Location: ${row.location}`);
    });

    // Check candidates in Surat
    console.log('\nCandidates in Surat:');
    const suratResult = await client.query(`
      SELECT id, name, location, skills 
      FROM candidates 
      WHERE location ILIKE '%surat%'
      LIMIT 5
    `);
    console.log(`Found ${suratResult.rows.length} candidates in Surat`);
    suratResult.rows.forEach(row => {
      console.log(`ID: ${row.id}, Name: ${row.name}, Location: ${row.location}, Skills: ${row.skills}`);
    });

    // Check developers
    console.log('\nCandidates with developer title:');
    const devResult = await client.query(`
      SELECT id, name, title, skills 
      FROM candidates 
      WHERE title ILIKE '%developer%'
      LIMIT 5
    `);
    console.log(`Found ${devResult.rows.length} candidates with developer title`);
    devResult.rows.forEach(row => {
      console.log(`ID: ${row.id}, Name: ${row.name}, Title: ${row.title}, Skills: ${row.skills}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

checkDatabase();