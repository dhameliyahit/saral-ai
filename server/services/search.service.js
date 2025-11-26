// services/search.service.js
const db = require('../config/database');
const geminiService = require('./gemini.service');

class SearchService {
  async processSearch({ searchQuery, filters, page = 1, limit = 10, userId }) {
    try {
      console.log('Starting search process for:', searchQuery);

      // 1) Generate structured criteria using Gemini (or fallback)
      let searchCriteria;
      try {
        searchCriteria = await geminiService.generateSearchCriteria(searchQuery);
      } catch (e) {
        console.warn('Gemini failed, using local fallback:', e?.message || e);
        searchCriteria = this.getFallbackCriteria(searchQuery);
      }

      // 2) Build SQL query - SIMPLIFIED without vector embeddings
      const { query, params } = this.buildSearchQuery(searchCriteria, filters, page, limit);

      console.log('SQL Query:', query);
      console.log('Params:', params);

      // 3) Execute search
      const result = await db.query(query, params);
      const rows = result.rows || [];

      // 4) Calculate match scores in JS
      const candidatesWithScores = this.calculateMatchScores(rows, searchCriteria);

      // 5) Save search history
      await this.saveSearchHistory(userId, searchQuery, candidatesWithScores.length);

      // 6) Return paginated results
      return {
        candidates: candidatesWithScores,
        total: candidatesWithScores.length,
        page,
        limit,
        searchId: Date.now().toString()
      };
    } catch (error) {
      console.error('Search process error:', error);
      // Return mock data as fallback
      return this.getMockResults(searchQuery, page, limit);
    }
  }

  buildSearchQuery(criteria, filters, page, limit) {
    let whereConditions = [];
    let params = [];
    let paramCount = 0;

    // Skills matching - SIMPLIFIED and RELIABLE
    if (criteria.skills && criteria.skills.length > 0) {
      const skillConditions = criteria.skills.map(skill => {
        paramCount++;
        params.push(`%${skill}%`);
        return `EXISTS (SELECT 1 FROM unnest(skills) AS s WHERE s ILIKE $${paramCount})`;
      });
      whereConditions.push(`(${skillConditions.join(' OR ')})`);
    }

    // Experience range
    if (criteria.experience) {
      whereConditions.push(`experience_years BETWEEN ${criteria.experience.min || 0} AND ${criteria.experience.max || 10}`);
    }

    // Location preferences
    if (criteria.location_preferences && criteria.location_preferences.length > 0) {
      const locationConditions = criteria.location_preferences.map(location => {
        paramCount++;
        params.push(`%${location}%`);
        return `location ILIKE $${paramCount}`;
      });
      whereConditions.push(`(${locationConditions.join(' OR ')})`);
    }

    // Title keywords
    if (criteria.title_keywords && criteria.title_keywords.length > 0) {
      const titleConditions = criteria.title_keywords.map(keyword => {
        paramCount++;
        params.push(`%${keyword}%`);
        return `title ILIKE $${paramCount}`;
      });
      whereConditions.push(`(${titleConditions.join(' OR ')})`);
    }

    // If no conditions, return all candidates
    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Add pagination parameters
    paramCount++;
    params.push(limit);
    const limitIndex = paramCount;

    paramCount++;
    params.push((page - 1) * limit);
    const offsetIndex = paramCount;

    const query = `
      SELECT 
        id, name, photo_url, title, company, experience_years, 
        location, skills, education, availability, email, phone,
        strengths, areas_to_probe, ai_verdict, about, match_percentage,
        created_at
      FROM candidates 
      ${whereClause}
      ORDER BY match_percentage DESC
      LIMIT $${limitIndex} OFFSET $${offsetIndex}
    `;

    return { query, params };
  }

  calculateMatchScores(candidates, criteria) {
    return candidates.map(candidate => {
      let score = candidate.match_percentage || 50; // Start with existing score or default

      // Skill matching (40 points)
      if (criteria.skills && criteria.skills.length > 0 && candidate.skills) {
        const matchedSkills = criteria.skills.filter(skill =>
          candidate.skills.some(candidateSkill =>
            candidateSkill.toLowerCase().includes(skill.toLowerCase())
          )
        );
        score += (matchedSkills.length / criteria.skills.length) * 40;
      }

      // Experience matching (20 points)
      if (criteria.experience && candidate.experience_years !== undefined) {
        const expMatch = this.calculateExperienceMatch(
          candidate.experience_years,
          criteria.experience
        );
        score += expMatch * 20;
      }

      // Title matching (20 points)
      if (criteria.title_keywords && criteria.title_keywords.length > 0 && candidate.title) {
        const titleMatch = this.calculateTitleMatch(
          candidate.title,
          criteria.title_keywords
        );
        score += titleMatch * 20;
      }

      // Location matching (20 points)
      if (criteria.location_preferences && criteria.location_preferences.length > 0 && candidate.location) {
        const locationMatch = this.calculateLocationMatch(
          candidate.location,
          criteria.location_preferences
        );
        score += locationMatch * 20;
      }

      return {
        ...candidate,
        match_percent: Math.min(100, Math.round(score)),
        match_color: this.getMatchColor(score)
      };
    }).sort((a, b) => b.match_percent - a.match_percent);
  }

  calculateExperienceMatch(candidateExp, requiredExp) {
    if (candidateExp >= requiredExp.min && candidateExp <= requiredExp.max) {
      return 1; // Perfect match
    } else if (candidateExp < requiredExp.min) {
      return candidateExp / requiredExp.min; // Partial match
    } else {
      return Math.max(0, 1 - (candidateExp - requiredExp.max) / 10); // Partial match for slightly over
    }
  }

  calculateTitleMatch(candidateTitle, keywords) {
    const lowerTitle = candidateTitle.toLowerCase();
    const matches = keywords.filter(keyword =>
      lowerTitle.includes(keyword.toLowerCase())
    );
    return matches.length / keywords.length;
  }

  calculateLocationMatch(candidateLocation, preferredLocations) {
    const lowerLocation = candidateLocation.toLowerCase();
    const matches = preferredLocations.filter(location =>
      lowerLocation.includes(location.toLowerCase())
    );
    return matches.length > 0 ? 1 : 0;
  }

  getMatchColor(score) {
    if (score >= 80) return '#10b981'; // green
    if (score >= 60) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  }

  getMockResults(searchQuery, page, limit) {
    console.log('Using mock data for:', searchQuery);
    
    const mockCandidates = [];
    const total = 15;
    
    for (let i = 1; i <= total; i++) {
      mockCandidates.push({
        id: i,
        name: `Candidate ${i}`,
        photo_url: `https://i.pravatar.cc/150?img=${i}`,
        title: 'Software Developer',
        company: ['TCS', 'Infosys', 'Wipro', 'Accenture'][i % 4],
        experience_years: (i % 5) + 1,
        location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'][i % 4],
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'].slice(0, (i % 3) + 2),
        match_percent: 60 + (i * 2),
        match_color: '#10b981',
        availability: i % 3 !== 0,
        email: `candidate${i}@gmail.com`,
        phone: `+91 ${9000000000 + i}`,
        strengths: ['Quick Learner', 'Team Player'],
        areas_to_probe: ['System Design'],
        ai_verdict: 'Good technical fit',
        about: 'Experienced developer',
        match_percentage: 60 + (i * 2)
      });
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
      candidates: mockCandidates.slice(startIndex, endIndex),
      total: total,
      page: page,
      limit: limit,
      searchId: Date.now().toString(),
      message: 'Search completed with mock data'
    };
  }

  async saveSearchHistory(userId, query, resultCount) {
    try {
      const insertQuery = `
        INSERT INTO search_history (user_id, search_query, result_count)
        VALUES ($1, $2, $3)
      `;
      await db.query(insertQuery, [userId, query, resultCount]);
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  }

  async getSearchHistory(userId) {
    try {
      const query = `
        SELECT * FROM search_history 
        WHERE user_id = $1 
        ORDER BY created_at DESC 
        LIMIT 10
      `;
      const result = await db.query(query, [userId]);
      return result.rows;
    } catch (error) {
      console.error('Error getting search history:', error);
      return [];
    }
  }

  async shortlistCandidate(userId, candidateId) {
    try {
      const query = `
        INSERT INTO shortlisted_candidates (user_id, candidate_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, candidate_id) DO NOTHING
      `;
      await db.query(query, [userId, candidateId]);
      return true;
    } catch (error) {
      console.error('Error shortlisting candidate:', error);
      return false;
    }
  }

  // Fallback criteria methods
  getFallbackCriteria(searchQuery) {
    const skills = this.extractSkills(searchQuery);
    const experience = this.extractExperience(searchQuery);
    return {
      skills: skills,
      experience: experience,
      title_keywords: this.extractKeywords(searchQuery),
      location_preferences: this.extractLocations(searchQuery),
      education: []
    };
  }

  extractSkills(query) {
    const skills = ['javascript', 'typescript', 'react', 'angular', 'vue', 'node', 'python', 'java', 'html', 'css', 'sql'];
    return skills.filter(skill => query.toLowerCase().includes(skill));
  }

  extractExperience(query) {
    const expMatch = query.match(/(\d+)\s*(\+)?\s*(years?|yrs?)/i);
    if (expMatch) {
      const years = parseInt(expMatch[1]);
      return { min: Math.max(0, years - 2), max: years + 2 };
    }
    return { min: 0, max: 10 };
  }

  extractKeywords(query) {
    return query.toLowerCase().split(/\s+/).filter(word => word.length > 3);
  }

  extractLocations(query) {
    const locations = ['mumbai', 'delhi', 'bangalore', 'chennai', 'hyderabad', 'pune', 'surat'];
    return locations.filter(location => query.toLowerCase().includes(location));
  }
}

module.exports = new SearchService();