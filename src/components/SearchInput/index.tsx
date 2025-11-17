'use client'

import { Search } from 'lucide-react'
import { ChangeEvent, useState } from 'react'

/**
 * SearchInput Component Props
 */
interface SearchInputProps {
  placeholder?: string
  className?: string
}

/**
 * SearchInput Component
 *
 * A controlled search input component that displays the current input value
 * in a label below the input field, demonstrating onChange functionality.
 */
const SearchInput = ({
  placeholder = 'Search by post title...',
  className = ''
}: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState<string>('')

  /**
   * Handle input change event
   * Updates the searchValue state with the current input value
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  /**
   * Clear the search input
   */
  const handleClear = () => {
    setSearchValue('')
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Search Input Field */}
      <div className="relative flex items-center">
        <Search
          size={20}
          className="absolute left-3 text-gray-400 pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="text"
          onChange={handleChange}
          value={searchValue}
          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2
                     focus:outline-none focus:ring-2 focus:ring-green-500
                     focus:border-transparent transition-all
                     placeholder:text-gray-400"
          name="search"
          placeholder={placeholder}
          aria-label="Search input"
        />

        {/* Clear Button - Only show when there's text */}
        {searchValue && (
          <button
            onClick={handleClear}
            className="absolute right-3 text-gray-400 hover:text-gray-600
                       transition-colors focus:outline-none"
            aria-label="Clear search"
            type="button"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Label displaying current input value */}
      {searchValue && (
        <div className="mt-2 px-3 py-2 bg-gray-50 border border-gray-200
                        rounded-lg transition-all">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-700">Current search:</span>{' '}
            <span className="text-green-600">{searchValue}</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default SearchInput
