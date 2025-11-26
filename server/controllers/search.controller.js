const searchService = require('../services/search.service.js');


const searchCandidates = async (req, res, next) => {
    try {
        const { searchQuery, filters = {}, page = 1, limit = 10 } = req.body;

        console.log('Search request received:', { searchQuery, filters, page, limit });

        if (!searchQuery || searchQuery.trim() === '') {
            return res.status(400).json({
                error: 'Search query is required',
                message: 'Please provide a search query'
            });
        }

        const result = await searchService.processSearch({
            searchQuery: searchQuery.trim(),
            filters,
            page: parseInt(page),
            limit: parseInt(limit),
            userId: req.user?.id || 'demo-user' // In real app, get from auth
        });

        console.log('Search completed successfully, found:', result.candidates.length, 'candidates');

        res.json({
            success: true,
            ...result
        });
    } catch (error) {
        console.error('Search controller error:', error);
        next(error);
    }
};


const getSearchHistory = async (req, res, next) => {
    try {
        const userId = req.user?.id || 'demo-user';
        const history = await searchService.getSearchHistory(userId);
        res.json(history);
    } catch (error) {
        next(error);
    }
};

const shortlistCandidate = async (req, res, next) => {
    try {
        const { candidateId } = req.body;
        const userId = req.user?.id || 'demo-user';

        await searchService.shortlistCandidate(userId, candidateId);
        res.json({ success: true, message: 'Candidate shortlisted' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    searchCandidates,
    getSearchHistory,
    shortlistCandidate
};