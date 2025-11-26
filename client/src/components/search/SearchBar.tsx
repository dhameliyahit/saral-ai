import React, { useState, useRef, useEffect } from 'react'
import {
  FaSearch,
  FaUpload,
  FaSpinner,
  FaLightbulb
} from 'react-icons/fa'

interface SearchBarProps {
  onSearchClick: (query: string) => void
  isLoading?: boolean
  onUploadJD?: () => void
  onOpenFilters?: () => void
}

const SUGGESTIONS = [
  'React developer with 3+ years experience in Mumbai',
  'Fullstack Node.js developer with TypeScript',
  'UI/UX designer with Figma and prototyping experience',
  'DevOps engineer with AWS and Kubernetes',
  'Python backend developer with Django experience',
  'Frontend lead with team management skills'
]

const SearchBar: React.FC<SearchBarProps> = ({
  onSearchClick,
  isLoading = false,
  onUploadJD,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredSuggestions = SUGGESTIONS.filter(s =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim() && !isLoading) {
      onSearchClick(searchQuery.trim())
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    onSearchClick(suggestion)
    setShowSuggestions(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveSuggestion(prev =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveSuggestion(prev => (prev > 0 ? prev - 1 : prev))
    } else if (e.key === 'Enter' && filteredSuggestions[activeSuggestion]) {
      e.preventDefault()
      handleSuggestionClick(filteredSuggestions[activeSuggestion])
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div
          className="relative"
          ref={inputRef}
          style={{ backgroundColor: '#FEFFFF' }}
        >
          {/* INPUT */}
          <input
            type="text"
            ref={inputRef}
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value)
              setShowSuggestions(true)
              setActiveSuggestion(0)
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the ideal candidate you're looking for..."
            className="
              w-full pl-14 pr-52 py-5 text-lg
              border border-gray-200 rounded-2xl
              shadow-[0_6px_20px_rgba(0,0,0,0.05)]
              focus:ring-4 focus:ring-blue-200 focus:border-blue-500
              bg-[#FEFFFF] transition-all duration-300
            "
            disabled={isLoading}
          />

          {/* SEARCH ICON LEFT */}
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

          {/* RIGHT ACTION BUTTONS */}
          <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-2">

            {/* Filters */}
            {/* <button
              type="button"
              onClick={onOpenFilters}
              className="px-4 py-2 cursor-pointer text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-800 transition-all"
              disabled={isLoading}
            >
              <div className="flex items-center space-x-2">
                <FaFilter />
                <span className="hidden sm:block text-sm font-medium">Filters</span>
              </div>
            </button> */}

            {/* Upload JD */}
            <button
              type="button"
              onClick={onUploadJD}
              className="px-4 py-2 text-gray-600 cursor-pointer rounded-lg hover:bg-gray-100 hover:text-gray-800 transition-all"
              disabled={isLoading}
            >
              <div className="flex items-center space-x-2">
                <FaUpload />
                <span className="hidden sm:block text-sm font-medium">
                  Upload JD
                </span>
              </div>
            </button>

            <div className="w-px h-6 bg-gray-300"></div>

            {/* Search */}
            <button
              type="submit"
              disabled={!searchQuery.trim() || isLoading}
              className="
                px-7 py-3 cursor-pointer text-white rounded-xl font-semibold
                bg-linear-to-r from-[#2563eb] to-[#7c3aed]
                hover:from-[#1e4fd0] hover:to-[#632bb6]
                shadow-md hover:shadow-xl active:scale-[0.98]
                transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <FaSpinner className="animate-spin" />
                  <span className="hidden sm:block">Searching...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <FaSearch />
                  <span className="hidden sm:block">Run Search</span>
                </div>
              )}
            </button>
          </div>

          {/* AI Suggestions */}
          {showSuggestions && searchQuery && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
              <div className="px-4 py-2 flex items-center text-sm text-gray-600 bg-gray-50 border-b">
                <FaLightbulb className="text-yellow-500 mr-2" /> AI Suggestions
              </div>
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full cursor-pointer text-left px-5 py-3 text-sm transition ${
                    index === activeSuggestion
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </form>

      {/* Quick Tip Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {['React + TypeScript', 'Node.js backend', 'Team leadership', 'Remote work'].map(tip => (
          <button
            key={tip}
            onClick={() => {
              setSearchQuery(tip)
              onSearchClick(tip)
            }}
            disabled={isLoading}
            className="
              bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm
              hover:bg-blue-100 transition font-medium
              disabled:opacity-50 cursor-pointer
            "
          >
            {tip}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchBar
