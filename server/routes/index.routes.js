const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search.controller.js');

router.post('/candidates', searchController.searchCandidates);
router.get('/history', searchController.getSearchHistory);
router.post('/shortlist', searchController.shortlistCandidate);

module.exports = router;