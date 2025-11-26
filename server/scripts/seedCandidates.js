const { Client } = require('pg');
require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'saral_ai',
  password: process.env.DB_PASSWORD || 'Dhameliy@hit31',
  port: process.env.DB_PORT || 5432,
};

// Real Indian names for more authentic data
const firstNames = [
  'Aarav', 'Vihaan', 'Advait', 'Arjun', 'Reyansh', 'Sai', 'Ananya', 'Aadhya', 'Diya', 'Ishani',
  'Rohan', 'Siddharth', 'Neha', 'Priya', 'Kavya', 'Rahul', 'Sanjay', 'Vikram', 'Ankit', 'Pooja',
  'Deepak', 'Karan', 'Nisha', 'Swati', 'Mohan', 'Suresh', 'Rajesh', 'Preeti', 'Sunil', 'Lata',
  'Amit', 'Bhavana', 'Chandra', 'Divya', 'Esha', 'Farhan', 'Gautam', 'Hema', 'Indira', 'Jatin'
];

const lastNames = [
  'Sharma', 'Patel', 'Singh', 'Kumar', 'Gupta', 'Reddy', 'Desai', 'Joshi', 'Mishra', 'Choudhury',
  'Malhotra', 'Mehta', 'Agarwal', 'Nair', 'Iyer', 'Bose', 'Kapoor', 'Sinha', 'Trivedi', 'Menon',
  'Pillai', 'Saxena', 'Rao', 'Banerjee', 'Das', 'Yadav', 'Tiwari', 'Chavan', 'Naik', 'Krishnan',
  'Roy', 'Sundar', 'Sekhar', 'Raman', 'Thakur', 'Qureshi', 'Bansal', 'Venkat', 'Prabhu', 'Zaveri'
];

const industries = {
  "Software Development": {
    jobTitles: [
      "Frontend Developer", "Backend Developer", "Fullstack Developer", 
      "React.js Developer", "Node.js Developer", "DevOps Engineer",
      "Software Engineer", "Web Developer", "Mobile Developer", "Python Developer"
    ],
    skills: [
      "JavaScript", "TypeScript", "React.js", "React", "Angular", "Vue.js",
      "Node.js", "Express.js", "Python", "Django", "Flask", "Java", "Spring Boot",
      "MongoDB", "PostgreSQL", "MySQL", "Redis", "Git", "Docker", "AWS",
      "Azure", "REST API", "GraphQL", "HTML5", "CSS3", "SASS", "Bootstrap", "Tailwind CSS"
    ],
    companies: [
      "TCS", "Infosys", "Wipro", "Accenture", "Tech Mahindra", "Cognizant",
      "Capgemini", "HCL", "L&T Infotech", "Mindtree", "Mphasis", "Hexaware",
      "Google", "Microsoft", "Amazon", "Flipkart", "OYO", "Paytm"
    ]
  },
  "UI/UX Design": {
    jobTitles: ["UI Designer", "UX Designer", "Product Designer", "UX Researcher", "Visual Designer"],
    skills: ["Figma", "Sketch", "Adobe XD", "User Research", "Prototyping", "Wireframing", "UI/UX", "Design System", "Photoshop", "Illustrator"],
    companies: ["Zomato", "Swiggy", "OYO", "Paytm", "Byju's", "Unacademy", "CRED", "Razorpay", "PhonePe"]
  },
  "Quality Assurance": {
    jobTitles: ["QA Engineer", "Automation Tester", "Manual Tester", "Test Lead", "SDET"],
    skills: ["Selenium", "Cypress", "Jest", "Manual Testing", "Test Cases", "JIRA", "Postman", "API Testing", "Appium", "TestNG"],
    companies: ["Capgemini", "HCL", "Infosys", "Wipro", "Cognizant", "Accenture", "Tech Mahindra", "L&T Technology"]
  },
  "Data Science": {
    jobTitles: ["Data Scientist", "Data Analyst", "ML Engineer", "Business Analyst"],
    skills: ["Python", "R", "SQL", "Machine Learning", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Tableau", "Power BI"],
    companies: ["Flipkart", "Amazon", "Microsoft", "Google", "IBM", "TCS Analytics", "Wipro Analytics"]
  }
};

// Enhanced locations with Gujarat focus
const locations = [
  "Mumbai, Maharashtra", "Mumbai, Maharashtra", "Mumbai, Maharashtra",
  "Surat, Gujarat", "Surat, Gujarat", "Surat, Gujarat", "Surat, Gujarat",
  "Ahmedabad, Gujarat", "Ahmedabad, Gujarat", "Ahmedabad, Gujarat",
  "Vadodara, Gujarat", "Gandhinagar, Gujarat", "Rajkot, Gujarat",
  "Delhi, NCR", "Bangalore, Karnataka", "Chennai, Tamil Nadu", 
  "Hyderabad, Telangana", "Pune, Maharashtra", "Gurgaon, Haryana", 
  "Kolkata, West Bengal"
];

const strengthsPool = [
  "Quick Learner", "Team Player", "Problem Solver", "Good Communicator", 
  "Leadership", "Detail Oriented", "Adaptable", "Creative Thinker",
  "Strong Analytical Skills", "Excellent Debugging Skills", "Time Management",
  "Client Interaction", "Mentoring", "Code Review", "Agile Methodology"
];

const probeAreasPool = [
  "System Design", "Leadership", "Technical Depth", "Communication",
  "Project Management", "Client Interaction", "Team Coordination",
  "Scalability Knowledge", "Performance Optimization", "Code Architecture"
];

const aboutPool = [
  "Experienced professional with strong technical background and excellent problem-solving skills. Passionate about learning new technologies and delivering high-quality solutions.",
  "Detail-oriented developer with expertise in modern web technologies. Strong team player with excellent communication skills and agile methodology experience.",
  "Innovative thinker with proven track record of delivering scalable software solutions. Excellent problem-solving abilities and quick adaptation to new technologies.",
  "Passionate about creating efficient and maintainable code. Strong collaborator with experience in cross-functional teams and client interactions.",
  "Results-driven professional with expertise in full-stack development. Excellent analytical skills and commitment to writing clean, efficient code."
];

const educationOptions = [
  "Bachelor of Engineering in Computer Science",
  "Bachelor of Technology in IT",
  "Master of Computer Applications",
  "Bachelor of Science in Computer Science",
  "Master of Technology in Software Engineering",
  "Bachelor of Engineering in IT"
];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randMany = (arr, count) => [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
const getRandomName = () => `${rand(firstNames)} ${rand(lastNames)}`;

// Helper function to generate AI verdict based on skills and title
const getAIVerdict = (skills, title) => {
  const techSkills = skills.filter(skill => 
    ['react', 'node', 'python', 'javascript', 'typescript', 'angular', 'vue'].includes(skill.toLowerCase())
  );
  
  const verdicts = [
    `Strong ${title} with excellent ${techSkills.slice(0, 2).join(' and ')} skills. Great cultural fit.`,
    `Experienced ${title} proficient in ${techSkills.slice(0, 3).join(', ')}. Shows strong potential.`,
    `Skilled ${title} with solid background in ${techSkills[0]}. Good team player with relevant experience.`,
    `Competent ${title} with demonstrated expertise in modern technologies. Ready to contribute immediately.`,
    `Talented ${title} with strong ${techSkills[0]} skills. Excellent problem-solving abilities.`,
    `Proficient ${title} experienced in ${techSkills.slice(0, 2).join(' and ')}. Quick learner and adaptable.`
  ];
  
  return rand(verdicts);
};

const generateCandidates = () => {
  const candidates = [];
  
  // Create specific candidate patterns for better search results
  const specialCandidates = [
    // React developers in Gujarat
    { location: "Surat, Gujarat", skills: ["React", "JavaScript", "HTML5", "CSS3", "Redux"], title: "React.js Developer" },
    { location: "Surat, Gujarat", skills: ["React.js", "Node.js", "MongoDB", "Express.js", "AWS"], title: "Fullstack Developer" },
    { location: "Ahmedabad, Gujarat", skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"], title: "Frontend Developer" },
    { location: "Vadodara, Gujarat", skills: ["React Native", "JavaScript", "Firebase", "REST API"], title: "Mobile Developer" },
    
    // React developers in Mumbai
    { location: "Mumbai, Maharashtra", skills: ["React.js", "JavaScript", "AWS", "Docker", "Jenkins"], title: "React.js Developer" },
    { location: "Mumbai, Maharashtra", skills: ["React", "Node.js", "PostgreSQL", "GraphQL", "Git"], title: "Fullstack Developer" },
    
    // Node.js developers
    { location: "Ahmedabad, Gujarat", skills: ["Node.js", "Express.js", "MongoDB", "JavaScript", "Socket.io"], title: "Backend Developer" },
    { location: "Surat, Gujarat", skills: ["Node.js", "Python", "Django", "PostgreSQL", "Docker"], title: "Backend Developer" },
    
    // Python developers
    { location: "Vadodara, Gujarat", skills: ["Python", "Django", "PostgreSQL", "REST API", "Celery"], title: "Python Developer" },
    { location: "Gandhinagar, Gujarat", skills: ["Python", "Flask", "MySQL", "Machine Learning", "Pandas"], title: "Data Scientist" },
    
    // UI/UX designers
    { location: "Surat, Gujarat", skills: ["Figma", "UI/UX", "Prototyping", "User Research", "Adobe XD"], title: "UI/UX Designer" },
    { location: "Ahmedabad, Gujarat", skills: ["Adobe XD", "Figma", "Wireframing", "Design System", "Sketch"], title: "Product Designer" },
    
    // QA Engineers
    { location: "Surat, Gujarat", skills: ["Selenium", "Cypress", "Manual Testing", "JIRA", "Test Cases"], title: "QA Engineer" },
    { location: "Mumbai, Maharashtra", skills: ["Automation Testing", "Selenium", "Java", "TestNG", "Appium"], title: "Automation Tester" }
  ];

  for (let i = 1; i <= 40; i++) {
    const industry = rand(Object.keys(industries));
    const pool = industries[industry];
    
    let candidateData;
    const fullName = getRandomName();
    
    // Use special candidate patterns for first 15 candidates
    if (i <= specialCandidates.length) {
      const special = specialCandidates[i - 1];
      candidateData = {
        name: fullName,
        photo_url: `https://i.pravatar.cc/300?img=${i + 20}`, // Higher quality images
        title: special.title,
        company: rand(pool.companies),
        experience_years: Math.floor(Math.random() * 8) + 2, // 2-10 years
        location: special.location,
        skills: special.skills,
        education: rand(educationOptions),
        availability: Math.random() > 0.2, // 80% available
        email: `${fullName.toLowerCase().replace(' ', '.')}@gmail.com`,
        phone: `+91 ${Math.floor(9000000000 + Math.random() * 1000000000)}`,
        strengths: randMany(strengthsPool, 3),
        areas_to_probe: randMany(probeAreasPool, 2),
        ai_verdict: getAIVerdict(special.skills, special.title),
        about: rand(aboutPool),
        match_percentage: Math.floor(Math.random() * 30) + 70 // 70-100%
      };
    } else {
      // Generate random candidates for the rest
      const randomSkills = randMany(pool.skills, 3 + Math.floor(Math.random() * 3));
      const randomTitle = rand(pool.jobTitles);
      
      candidateData = {
        name: fullName,
        photo_url: `https://i.pravatar.cc/300?img=${i + 50}`,
        title: randomTitle,
        company: rand(pool.companies),
        experience_years: Math.floor(Math.random() * 12) + 1, // 1-13 years
        location: rand(locations),
        skills: randomSkills,
        education: rand(educationOptions),
        availability: Math.random() > 0.3, // 70% available
        email: `${fullName.toLowerCase().replace(' ', '.')}@gmail.com`,
        phone: `+91 ${Math.floor(9000000000 + Math.random() * 1000000000)}`,
        strengths: randMany(strengthsPool, 2 + Math.floor(Math.random() * 2)), // 2-4 strengths
        areas_to_probe: randMany(probeAreasPool, 1 + Math.floor(Math.random() * 2)), // 1-3 areas
        ai_verdict: getAIVerdict(randomSkills, randomTitle),
        about: rand(aboutPool),
        match_percentage: Math.floor(Math.random() * 40) + 60 // 60-100%
      };
    }

    candidates.push(candidateData);
  }
  
  return candidates;
};

const ensureTableSchema = async (client) => {
  try {
    console.log('🗑️  Removing old data...');
    
    // Drop dependent tables first
    await client.query('DROP TABLE IF EXISTS shortlisted_candidates CASCADE');
    await client.query('DROP TABLE IF EXISTS search_history CASCADE');
    await client.query('DROP TABLE IF EXISTS candidates CASCADE');
    
    console.log('📊 Creating new table schema...');
    
    await client.query(`
      CREATE TABLE candidates (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        photo_url VARCHAR(255),
        title VARCHAR(200),
        company VARCHAR(100),
        experience_years INTEGER,
        location VARCHAR(100),
        skills TEXT[],
        education VARCHAR(100),
        availability BOOLEAN DEFAULT true,
        email VARCHAR(100),
        phone VARCHAR(20),
        strengths TEXT[],
        areas_to_probe TEXT[],
        ai_verdict TEXT,
        about TEXT,
        match_percentage INTEGER,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Create supporting tables
    await client.query(`
      CREATE TABLE search_history (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(100) NOT NULL,
        search_query TEXT NOT NULL,
        result_count INTEGER,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    await client.query(`
      CREATE TABLE shortlisted_candidates (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(100) NOT NULL,
        candidate_id INTEGER REFERENCES candidates(id),
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id, candidate_id)
      )
    `);
    
    console.log('✅ All tables created successfully');
  } catch (error) {
    console.error('Error creating table schema:', error);
    throw error;
  }
};

const seedDatabase = async () => {
  const client = new Client(dbConfig);
  
  try {
    console.log('🚀 Attempting to connect to PostgreSQL...');
    await client.connect();
    console.log('✅ Connected to PostgreSQL database');
    
    // Ensure correct table schema
    await ensureTableSchema(client);
    
    // Generate and insert candidates
    console.log('👥 Generating candidate data...');
    const candidates = generateCandidates();
    let insertedCount = 0;
    
    console.log('📥 Inserting candidates into database...');
    for (const candidate of candidates) {
      const query = `
        INSERT INTO candidates (
          name, photo_url, title, company, experience_years, location, 
          skills, education, availability, email, phone, strengths, 
          areas_to_probe, ai_verdict, about, match_percentage
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      `;
      
      const values = [
        candidate.name,
        candidate.photo_url,
        candidate.title,
        candidate.company,
        candidate.experience_years,
        candidate.location,
        candidate.skills,
        candidate.education,
        candidate.availability,
        candidate.email,
        candidate.phone,
        candidate.strengths,
        candidate.areas_to_probe,
        candidate.ai_verdict,
        candidate.about,
        candidate.match_percentage
      ];
      
      await client.query(query, values);
      insertedCount++;
      
      // Show progress for large inserts
      if (insertedCount % 10 === 0) {
        console.log(`   Inserted ${insertedCount} candidates...`);
      }
    }
    
    console.log(`🎉 Successfully inserted ${insertedCount} candidates!`);
    
    // Show sample of inserted data
    console.log('\n📋 Sample of inserted candidates:');
    const sampleResult = await client.query(`
      SELECT name, title, location, skills FROM candidates 
      WHERE location LIKE '%Gujarat%' OR skills::text LIKE '%React%'
      LIMIT 5
    `);
    
    sampleResult.rows.forEach((row, index) => {
      console.log(`   ${index + 1}. ${row.name} - ${row.title} - ${row.location}`);
      console.log(`      Skills: ${row.skills.join(', ')}`);
    });
    
    console.log('\n🎯 Now you can search for:');
    console.log('   - "React developer in Surat"');
    console.log('   - "Node.js developer in Gujarat"');
    console.log('   - "Python developer in Ahmedabad"');
    
  } catch (error) {
    console.error('❌ Database error:', error.message);
  } finally {
    await client.end();
    console.log('🔚 Database connection closed');
  }
};

// Run the seed
seedDatabase();