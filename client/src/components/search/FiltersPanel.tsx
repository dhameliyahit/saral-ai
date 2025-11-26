// components/search/FiltersPanel.tsx
import React, { useState } from 'react'
import { FaTimes, FaSlidersH, FaMapMarkerAlt, FaBriefcase, FaStar } from 'react-icons/fa'

interface Filters {
  experience: string[]
  location: string[]
  skills: string[]
  availability: string[]
  minMatchScore: number
}

interface FiltersPanelProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: Filters) => void
  currentFilters: Filters
}

const EXPERIENCE_OPTIONS = [
  '0-2 years', '2-4 years', '4-6 years', '6-8 years', '8+ years'
]

const LOCATION_OPTIONS = [
  'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Remote', 'Outside India'
]

const AVAILABILITY_OPTIONS = [
  'Immediate', '2 weeks', '1 month', '2 months', '3 months+'
]

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  currentFilters
}) => {
  const [filters, setFilters] = useState<Filters>(currentFilters)

  const handleExperienceChange = (exp: string) => {
    setFilters(prev => ({
      ...prev,
      experience: prev.experience.includes(exp)
        ? prev.experience.filter(e => e !== exp)
        : [...prev.experience, exp]
    }))
  }

  const handleLocationChange = (loc: string) => {
    setFilters(prev => ({
      ...prev,
      location: prev.location.includes(loc)
        ? prev.location.filter(l => l !== loc)
        : [...prev.location, loc]
    }))
  }

  const handleAvailabilityChange = (avail: string) => {
    setFilters(prev => ({
      ...prev,
      availability: prev.availability.includes(avail)
        ? prev.availability.filter(a => a !== avail)
        : [...prev.availability, avail]
    }))
  }

  const handleApply = () => {
    onApplyFilters(filters)
    onClose()
  }

  const handleReset = () => {
    const resetFilters: Filters = {
      experience: [],
      location: [],
      skills: [],
      availability: [],
      minMatchScore: 70
    }
    setFilters(resetFilters)
    onApplyFilters(resetFilters)
  }

  const getActiveFiltersCount = () => {
    return (
      filters.experience.length +
      filters.location.length +
      filters.availability.length +
      (filters.minMatchScore > 70 ? 1 : 0)
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaSlidersH className="text-blue-600 text-lg" />
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              {getActiveFiltersCount() > 0 && (
                <span className="bg-blue-600 text-white text-sm px-2 py-1 rounded-full">
                  {getActiveFiltersCount()} active
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Close filters"
            >
              <FaTimes className="text-gray-500 text-lg" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Match Score Filter */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaStar className="text-yellow-500" />
              <h3 className="font-semibold text-gray-900">Minimum Match Score</h3>
            </div>
            <div className="space-y-3">
              <input
                type="range"
                min="50"
                max="95"
                step="5"
                value={filters.minMatchScore}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  minMatchScore: parseInt(e.target.value)
                }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>50%</span>
                <span className="text-blue-600 font-semibold">{filters.minMatchScore}%</span>
                <span>95%</span>
              </div>
            </div>
          </div>

          {/* Experience Filter */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaBriefcase className="text-green-500" />
              <h3 className="font-semibold text-gray-900">Experience Level</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {EXPERIENCE_OPTIONS.map(exp => (
                <button
                  key={exp}
                  onClick={() => handleExperienceChange(exp)}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                    filters.experience.includes(exp)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaMapMarkerAlt className="text-red-500" />
              <h3 className="font-semibold text-gray-900">Location</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {LOCATION_OPTIONS.map(loc => (
                <button
                  key={loc}
                  onClick={() => handleLocationChange(loc)}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                    filters.location.includes(loc)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Availability Filter */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Availability</h3>
            <div className="space-y-2">
              {AVAILABILITY_OPTIONS.map(avail => (
                <label key={avail} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.availability.includes(avail)}
                    onChange={() => handleAvailabilityChange(avail)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{avail}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
          <div className="flex space-x-3">
            <button
              onClick={handleReset}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Reset All
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FiltersPanel