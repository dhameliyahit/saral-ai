import { useState, useEffect, useMemo } from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/search/SearchBar';
import AILoader from '../components/search/AILoader';
import SearchSkeleton from '../components/search/SearchSkeleton';
import CandidatesGrid from '../components/candidates/CandidatesGrid';
import CandidateModal from '../components/candidates/CandidateModal';
import CreditModal from '../components/common/CreditModal';
import { apiService } from '../services/api';
import { mockCandidatesDetail } from '../data/mockCandidates';
import type { Candidate, CandidateDetail } from '../types/candidate';
import { candidateToDetail } from '../utils/candidateMapper';
import { 
  FaFilter, 
  FaUpload, 
  FaMagic, 
  FaRocket, 
  FaExclamationTriangle,
  FaSearch,
  FaStar,
  FaArrowLeft,
  FaArrowRight,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import InteractionsSidebar from '../components/candidates/InteractionsSidebar';

interface SearchState {
  isSearching: boolean;
  currentStage: number;
  stages: {
    label: string;
    status: 'pending' | 'loading' | 'completed' | 'error';
  }[];
}

const SearchPage = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    isSearching: false,
    currentStage: 0,
    stages: [
      { label: 'Fetching profiles', status: 'pending' },
      { label: 'Semantic search & matching', status: 'pending' },
      { label: 'Ranking & scoring', status: 'pending' },
      { label: 'Preparing insights', status: 'pending' }
    ]
  });
  
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeView, setActiveView] = useState<'matches' | 'shortlisted' | 'liked' | 'disliked'>('matches');
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [userCredits, setUserCredits] = useState(25);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const candidatesPerPage = 6;

  const likedCandidates = useMemo(
    () => candidates.filter(candidate => candidate.isLiked),
    [candidates]
  );

  const dislikedCandidates = useMemo(
    () => candidates.filter(candidate => candidate.isDisliked),
    [candidates]
  );

  const shortlistedCandidates = useMemo(
    () => candidates.filter(candidate => candidate.isShortlisted),
    [candidates]
  );

  const handleCandidateStateUpdate = (id: string, updater: (candidate: Candidate) => Candidate) => {
    let updatedCandidate: Candidate | null = null;
    setCandidates(prev =>
      prev.map(candidate => {
        if (candidate.id === id) {
          updatedCandidate = updater(candidate);
          return updatedCandidate;
        }
        return candidate;
      })
    );

    if (updatedCandidate) {
      setSelectedCandidate(prev =>
        prev?.id === id ? candidateToDetail(updatedCandidate as Candidate) : prev
      );
    }
  };

  // Enhanced AI Search with multi-stage loader
  const handleRunSearch = async (query: string) => {
    console.log('Starting AI search with query:', query);
    setSearchQuery(query);
    setError(null);
    setCandidates([]);
    setCurrentPage(1);

    // Reset and start AI loader
    setSearchState({
      isSearching: true,
      currentStage: 0,
      stages: [
        { label: 'Fetching profiles', status: 'loading' },
        { label: 'Semantic search & matching', status: 'pending' },
        { label: 'Ranking & scoring', status: 'pending' },
        { label: 'Preparing insights', status: 'pending' }
      ]
    });

    try {
      // Check credits before search
      if (userCredits <= 0) {
        setIsCreditModalOpen(true);
        setSearchState(prev => ({ ...prev, isSearching: false }));
        return;
      }

      // Simulate AI processing stages
      for (let i = 0; i < 4; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds per stage
        
        setSearchState(prev => ({
          ...prev,
          stages: prev.stages.map((stage, index) => 
            index === i 
              ? { ...stage, status: 'completed' }
              : index === i + 1 
                ? { ...stage, status: 'loading' }
                : stage
          ),
          currentStage: i + 1
        }));
      }

      // Make actual API call
      const result = await apiService.searchCandidates(query, 1, 50);
      console.log('Search API response:', result);

      if (result.success) {
        setCandidates(result.candidates || []);
        setTotalCandidates(result.total || result.candidates.length || 0);
        
        // Deduct credits
        setUserCredits(prev => Math.max(0, prev - 1));
      } else {
        throw new Error(result.error || 'Search failed');
      }

    } catch (err) {
      console.error('Search failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Search failed. Please try again.';
      setError(errorMessage);
      
      // Fallback to mock data for demo
      console.log('Using fallback mock data');
      const mockResults = mockCandidatesDetail.slice(0, 12);
      setCandidates(mockResults);
      setTotalCandidates(mockResults.length);
      
      // Simulate credit deduction even in fallback
      setUserCredits(prev => Math.max(0, prev - 1));
    } finally {
      setSearchState(prev => ({ ...prev, isSearching: false }));
    }
  };

  // Enhanced candidate actions with API calls
  const handleLike = async (id: string) => {
    try {
      await apiService.likeCandidate(id);
    } catch (err) {
      console.error('Like failed:', err);
    } finally {
      handleCandidateStateUpdate(id, candidate => ({
        ...candidate,
        isLiked: !candidate.isLiked,
        isDisliked: candidate.isLiked ? candidate.isDisliked : false,
      }));
    }
  };

  const handleDislike = async (id: string) => {
    try {
      await apiService.dislikeCandidate(id);
    } catch (err) {
      console.error('Dislike failed:', err);
    } finally {
      handleCandidateStateUpdate(id, candidate => ({
        ...candidate,
        isDisliked: !candidate.isDisliked,
        isLiked: candidate.isDisliked ? candidate.isLiked : false,
      }));
    }
  };

  const handleShortlist = async (id: string) => {
    try {
      await apiService.shortlistCandidate(id);
    } catch (err) {
      console.error('Shortlist failed:', err);
    } finally {
      handleCandidateStateUpdate(id, candidate => ({
        ...candidate,
        isShortlisted: !candidate.isShortlisted,
      }));
    }
  };

  const handleViewDetails = (candidate: Candidate) => {
    setSelectedCandidate(candidateToDetail(candidate));
    setIsModalOpen(true);
    setIsSidebarOpen(false); // Close sidebar on mobile when viewing details
  };

  const handleUnlockContact = async (candidateId: string) => {
    if (userCredits <= 0) {
      setIsCreditModalOpen(true);
      return;
    }

    try {
      await apiService.unlockContact(candidateId);
      setUserCredits(prev => prev - 1);
      
      if (selectedCandidate) {
        setSelectedCandidate({
          ...selectedCandidate,
          isContactUnlocked: true
        });
      }
    } catch (err) {
      console.error('Unlock contact failed:', err);
      setError('Failed to unlock contact. Please try again.');
    }
  };

  // Pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (
      activeView === 'matches' &&
      page * candidatesPerPage > candidates.length &&
      candidates.length < totalCandidates
    ) {
      loadMoreCandidates(page);
    }
  };

  const loadMoreCandidates = async (page: number) => {
    try {
      const result = await apiService.searchCandidates(searchQuery, page, candidatesPerPage);
      setCandidates(prev => {
        const newCandidates = result.candidates || [];
        const unique = newCandidates.filter(
          candidate => !prev.some(existing => existing.id === candidate.id)
        );
        return [...prev, ...unique];
      });
    } catch (err) {
      console.error('Failed to load more candidates:', err);
      setError('Failed to load more candidates');
    }
  };

  const quickSearches = [
    { icon: FaRocket, label: 'React Developer', query: 'React developer with 3+ years experience' },
    { icon: FaMagic, label: 'Fullstack Engineer', query: 'Fullstack developer Node.js React MongoDB' },
    { icon: FaFilter, label: 'UI/UX Designer', query: 'UI UX designer Figma prototyping' },
    { icon: FaUpload, label: 'DevOps Engineer', query: 'DevOps AWS Docker Kubernetes' }
  ];

  // Calculate pagination
  const activeCollection = (() => {
    switch (activeView) {
      case 'shortlisted':
        return shortlistedCandidates;
      case 'liked':
        return likedCandidates;
      case 'disliked':
        return dislikedCandidates;
      default:
        return candidates;
    }
  })();

  const activeTotal =
    activeView === 'matches'
      ? (totalCandidates || candidates.length)
      : activeCollection.length;
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = activeCollection.slice(indexOfFirstCandidate, indexOfLastCandidate);
  const totalDisplayCount = Math.max(activeCollection.length, activeTotal);
  const totalPages = Math.max(1, Math.ceil((totalDisplayCount || 0) / candidatesPerPage));
  const hasResults = totalDisplayCount > 0;
  const showingStart = hasResults ? indexOfFirstCandidate + 1 : 0;
  const showingEnd = hasResults ? Math.min(indexOfLastCandidate, totalDisplayCount) : 0;

  // Test API connection on mount
  useEffect(() => {
    const testAPIConnection = async () => {
      try {
        await apiService.healthCheck();
        console.log('API connection successful');
      } catch (err) {
        console.log(err);
        console.log('API connection failed, using mock data fallback');
      }
    };

    testAPIConnection();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeView]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('interactions-sidebar');
      if (isSidebarOpen && sidebar && !sidebar.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <Layout 
      title="AI Candidate Search - SARAL AI" 
      description="Find perfect candidates with AI-powered search across multiple platforms"
    >
      <div className="relative min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 pt-20 overflow-hidden">
        <div className="absolute top-16 -left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse" />
        <div className="absolute top-60 right-0 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse delay-1000" />
        <div className="absolute bottom-12 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-pulse delay-500" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          
          {/* Credit Balance and Mobile Menu */}
          <div className="flex justify-between items-center mb-6">
            {/* Mobile Sidebar Toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-3 flex items-center space-x-2"
            >
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
              <span className="text-gray-700 font-medium text-sm">Interactions</span>
            </button>

            {/* Credit Balance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-3 flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-medium text-sm">Credits:</span>
              <span className="text-blue-600 font-bold text-lg">{userCredits}</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3 animate-in slide-in-from-top duration-500">
              <FaExclamationTriangle className="text-red-500 shrink-0" />
              <div>
                <p className="text-red-800 font-medium">Search Error</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-3 py-1 sm:px-4 sm:py-2 mb-4 sm:mb-6">
              <FaMagic className="text-blue-600 text-sm" />
              <span className="text-blue-700 font-medium text-xs sm:text-sm">AI-Powered Recruitment</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold my-4 sm:mb-6 bg-[#155DFC] underline-offset-8 decoration-[#155DFC] bg-clip-text text-transparent">
              Find Your Perfect Candidate
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Describe your ideal candidate in natural language. Our AI will search across thousands of profiles to find the perfect matches in seconds.
            </p>
          </div>

          {/* Quick Search Suggestions */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <p className="text-sm font-semibold text-blue-600 tracking-wide uppercase">Popular searches</p>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 sm:mt-2">Jump in with recruiter-tested prompts</h2>
              </div>
              <p className="text-sm text-gray-500 text-center sm:text-right">Fine-tune any suggestion to match your role.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {quickSearches.map((search) => {
                const Icon = search.icon;
                return (
                  <button
                    key={search.label}
                    onClick={() => handleRunSearch(search.query)}
                    disabled={searchState.isSearching}
                    className="group rounded-xl sm:rounded-2xl border border-gray-100 bg-white text-left p-3 sm:p-4 lg:p-5 shadow-sm hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Icon className="text-sm sm:text-base" aria-hidden />
                      </div>
                      <FaSearch className="text-gray-300 group-hover:text-blue-400 transition-colors text-sm" aria-hidden />
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">{search.label}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">{search.query}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8 sm:mb-12">
            <SearchBar 
              onSearchClick={handleRunSearch} 
              isLoading={searchState.isSearching}
              onUploadJD={() => console.log('Upload JD clicked')}
              onOpenFilters={() => console.log('Open filters clicked')}
            />
          </div>

          {/* AI Loader */}
          {searchState.isSearching && (
            <div className="mb-6 sm:mb-8">
              <AILoader 
                stages={searchState.stages}
                currentStage={searchState.currentStage}
              />
            </div>
          )}

          {/* Search Skeleton */}
          {searchState.isSearching && (
            <div className="mb-6 sm:mb-8">
              <SearchSkeleton />
            </div>
          )}

          {/* Results Section */}
          {!searchState.isSearching && candidates.length > 0 && (
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 relative">
              {/* Main Content */}
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl sm:hover:shadow-2xl flex-1">
                {/* Tabs */}
                <div className="border-b border-gray-200 bg-linear-to-r from-gray-50 to-blue-50">
                  <nav className="flex -mb-px">
                    <button
                      onClick={() => setActiveView('matches')}
                      className={`flex-1 py-3 sm:py-4 lg:py-5 px-4 sm:px-6 cursor-pointer text-center border-b-2 font-semibold text-sm sm:text-base transition-all duration-200 ${
                        activeView === 'matches'
                          ? 'border-blue-500 text-blue-600 bg-white shadow-sm'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-white hover:bg-opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                        <FaSearch className="text-xs sm:text-sm" aria-hidden />
                        <span>AI Matches</span>
                        <span className="bg-blue-100 text-blue-600 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                          {candidates.length}
                        </span>
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveView('shortlisted')}
                      className={`flex-1 cursor-pointer py-3 sm:py-4 lg:py-5 px-4 sm:px-6 text-center border-b-2 font-semibold text-sm sm:text-base transition-all duration-200 ${
                        activeView === 'shortlisted'
                          ? 'border-blue-500 text-blue-600 bg-white shadow-sm'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-white hover:bg-opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                        <FaStar className="text-xs sm:text-sm" aria-hidden />
                        <span>Shortlisted</span>
                        <span className="bg-gray-100 text-gray-600 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                          {shortlistedCandidates.length}
                        </span>
                      </div>
                    </button>
                  </nav>
                </div>

                {/* Results Grid */}
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 space-y-3 sm:space-y-0">
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                        {activeView === 'matches' ? 'Your AI-Powered Matches' : 'Shortlisted Candidates'}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        {activeView === 'matches' 
                          ? 'Candidates perfectly matched to your requirements'
                          : 'Your saved candidates for review'
                        }
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 w-full sm:w-auto text-center">
                      <span className="text-blue-700 font-medium text-xs sm:text-sm">
                        Showing {showingStart}-{showingEnd} of {totalDisplayCount} results
                      </span>
                    </div>
                  </div>

                  {currentCandidates.length > 0 ? (
                    <CandidatesGrid
                      candidates={currentCandidates}
                      onLike={handleLike}
                      onDislike={handleDislike}
                      onShortlist={handleShortlist}
                      onViewDetails={handleViewDetails}
                    />
                  ) : (
                    <div className="text-center py-8 sm:py-12">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        {activeView === 'matches' ? (
                          <FaSearch className="text-xl sm:text-2xl lg:text-3xl text-gray-400" />
                        ) : (
                          <FaStar className="text-xl sm:text-2xl lg:text-3xl text-gray-400" />
                        )}
                      </div>
                      <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
                        {activeView === 'matches' ? 'No candidates found' : 'No shortlisted candidates yet'}
                      </h4>
                      <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
                        {activeView === 'matches'
                          ? 'Refine your prompt or run the search again with broader criteria.'
                          : 'Shortlist the candidates you like to keep them handy for review.'}
                      </p>
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
                      <div className="text-xs sm:text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <button
                          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                          disabled={currentPage === 1}
                          className="flex items-center cursor-pointer space-x-1 sm:space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm"
                        >
                          <FaArrowLeft className="text-xs" aria-hidden />
                          <span className="hidden sm:inline">Previous</span>
                        </button>
                        
                        <div className="flex space-x-1">
                          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            let page;
                            if (totalPages <= 5) {
                              page = i + 1;
                            } else if (currentPage <= 3) {
                              page = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              page = totalPages - 4 + i;
                            } else {
                              page = currentPage - 2 + i;
                            }
                            
                            return (
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 ${
                                  currentPage === page
                                    ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                                    : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                              >
                                {page}
                              </button>
                            );
                          })}
                        </div>
                        
                        <button
                          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="flex items-center cursor-pointer space-x-1 sm:space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm"
                        >
                          <span className="hidden sm:inline">Next</span>
                          <FaArrowRight className="text-xs" aria-hidden />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Interactions Sidebar */}
              <div className={`
                ${isSidebarOpen ? 'block' : 'hidden'} 
                lg:block 
                fixed lg:relative 
                top-0 left-0 lg:left-auto 
                w-full lg:w-80 
                h-screen lg:h-auto 
                bg-white lg:bg-transparent 
                z-50 lg:z-auto
                overflow-y-auto lg:overflow-visible
              `} id="interactions-sidebar">
                <InteractionsSidebar
                  liked={likedCandidates}
                  disliked={dislikedCandidates}
                  shortlisted={shortlistedCandidates}
                  onSelect={handleViewDetails}
                />
              </div>

              {/* Mobile Sidebar Overlay */}
              {isSidebarOpen && (
                <div 
                  className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                />
              )}
            </div>
          )}

          {/* Empty State */}
          {!searchState.isSearching && candidates.length === 0 && !error && (
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-6 sm:p-8 lg:p-12 border border-gray-100 text-center transition-all duration-300 hover:shadow-xl sm:hover:shadow-2xl">
              <div className="max-w-2xl mx-auto">
                <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-linear-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 text-blue-600">
                  <FaRocket className="text-2xl sm:text-3xl lg:text-4xl" aria-hidden />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Ready to Find Perfect Candidates?
                </h3>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed">
                  Describe the role you're hiring for in natural language. Our AI will search across thousands of profiles to find candidates that match your exact requirements.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <button 
                    onClick={() => handleRunSearch('React developer with TypeScript experience')}
                    className="bg-linear-to-r cursor-pointer bg-[#155DFC] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg font-semibold text-sm sm:text-base"
                  >
                    Start AI Search
                  </button>
                  <button 
                    onClick={() => handleRunSearch('Fullstack developer Node.js React')}
                    className="border-2 cursor-pointer border-gray-300 text-gray-700 px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl hover:border-blue-400 hover:text-blue-600 hover:scale-105 transition-all duration-300 font-semibold text-sm sm:text-base"
                  >
                    Try Example Search
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Candidate Modal */}
        <CandidateModal
          candidate={selectedCandidate}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUnlockContact={handleUnlockContact}
        />

        {/* Credit Modal */}
        <CreditModal
          isOpen={isCreditModalOpen}
          onClose={() => setIsCreditModalOpen(false)}
          currentCredits={userCredits}
        />
      </div>
    </Layout>
  );
};

export default SearchPage;