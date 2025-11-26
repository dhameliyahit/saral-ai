class GeminiService {
  constructor() {
    // No API key needed - completely free and local
    this.skillsDatabase = [
      'javascript', 'typescript', 'react', 'angular', 'vue', 'node', 'express',
      'python', 'django', 'flask', 'java', 'spring', 'c#', 'dotnet',
      'php', 'laravel', 'wordpress', 'html', 'css', 'sass', 'bootstrap',
      'mongodb', 'mysql', 'postgresql', 'sql', 'redis', 'aws', 'docker',
      'kubernetes', 'git', 'jenkins', 'figma', 'photoshop', 'illustrator',
      'selenium', 'cypress', 'jest', 'testing', 'devops', 'agile', 'scrum'
    ];
    
    this.locationsDatabase = [
      'mumbai', 'delhi', 'bangalore', 'chennai', 'hyderabad', 'pune', 
      'kolkata', 'ahmedabad', 'surat', 'jaipur', 'lucknow', 'kanpur',
      'nagpur', 'indore', 'thane', 'bhopal', 'visakhapatnam', 'patna'
    ];
    
    this.jobTitlesDatabase = [
      'developer', 'engineer', 'designer', 'manager', 'analyst', 'architect',
      'consultant', 'specialist', 'lead', 'head', 'director', 'executive',
      'tester', 'qa', 'administrator', 'coordinator', 'assistant', 'officer'
    ];
  }

  async generateSearchCriteria(searchQuery) {
    console.log('Processing search query locally:', searchQuery);
    
    // Simple NLP using string matching - completely free
    const skills = this.extractSkills(searchQuery);
    const experience = this.extractExperience(searchQuery);
    const titleKeywords = this.extractTitleKeywords(searchQuery);
    const locationPreferences = this.extractLocations(searchQuery);
    const education = this.extractEducation(searchQuery);

    const criteria = {
      skills: skills,
      experience: experience,
      title_keywords: titleKeywords,
      location_preferences: locationPreferences,
      education: education
    };

    console.log('Generated search criteria:', criteria);
    return criteria;
  }

  extractSkills(query) {
    const foundSkills = this.skillsDatabase.filter(skill => 
      query.toLowerCase().includes(skill.toLowerCase())
    );
    return foundSkills.slice(0, 5); // Return max 5 skills
  }

  extractExperience(query) {
    const lowerQuery = query.toLowerCase();
    
    // Look for experience patterns
    if (lowerQuery.includes('fresher') || lowerQuery.includes('entry level') || lowerQuery.includes('0 year')) {
      return { min: 0, max: 1 };
    }
    
    if (lowerQuery.includes('senior') || lowerQuery.includes('lead') || lowerQuery.includes('manager')) {
      return { min: 5, max: 15 };
    }
    
    if (lowerQuery.includes('mid') || lowerQuery.includes('mid-level')) {
      return { min: 2, max: 5 };
    }
    
    // Extract numbers for experience
    const expRegex = /(\d+)\s*[\+\-\~]?\s*(?:years?|yrs?|year\'s)/gi;
    const matches = [...query.matchAll(expRegex)];
    
    if (matches.length > 0) {
      const years = parseInt(matches[0][1]);
      return { min: Math.max(0, years - 1), max: years + 2 };
    }
    
    // Default experience range
    return { min: 0, max: 10 };
  }

  extractTitleKeywords(query) {
    const words = query.toLowerCase().split(/\s+/);
    const foundKeywords = words.filter(word => 
      word.length > 3 && 
      this.jobTitlesDatabase.some(title => title.includes(word) || word.includes(title))
    );
    
    // If no specific keywords found, use general ones from the query
    if (foundKeywords.length === 0) {
      return words.filter(word => word.length > 3).slice(0, 3);
    }
    
    return foundKeywords.slice(0, 3);
  }

  extractLocations(query) {
    const foundLocations = this.locationsDatabase.filter(location => 
      query.toLowerCase().includes(location.toLowerCase())
    );
    return foundLocations.slice(0, 3); // Return max 3 locations
  }

  extractEducation(query) {
    const lowerQuery = query.toLowerCase();
    const education = [];
    
    if (lowerQuery.includes('bachelor') || lowerQuery.includes('b.tech') || lowerQuery.includes('be') || lowerQuery.includes('b.e')) {
      education.push('bachelor');
    }
    
    if (lowerQuery.includes('master') || lowerQuery.includes('m.tech') || lowerQuery.includes('me') || lowerQuery.includes('m.e')) {
      education.push('master');
    }
    
    if (lowerQuery.includes('phd') || lowerQuery.includes('doctorate')) {
      education.push('phd');
    }
    
    if (lowerQuery.includes('diploma')) {
      education.push('diploma');
    }
    
    return education;
  }
}

module.exports = new GeminiService();