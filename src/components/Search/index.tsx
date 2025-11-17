'use client'
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { useState, SetStateAction } from 'react';
import { getSearchPosts } from '../../utils/supabase/quries';
import Link from 'next/link';

const SearchInput = () => {
    const [userInput, setUserInput] = useState<string>('')

    const {data} = useQuery({
        queryKey: ['search-result', userInput],
        queryFn: async() => {
            const {data, error} = await getSearchPosts(userInput)
            if (error) throw new Error
            return data
        },
        enabled: userInput && userInput.length > 3 ? true: false
    })

    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setUserInput(e.target.value)
    }

    return(
        <div className='relative w-full'>
            <div className='relative flex items-center'>
                <Search
                    size={20}
                    className="absolute left-3 text-gray-400 pointer-events-none"
                />
                <input
                    onChange={handleChange}
                    className='w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                    name='search'
                    placeholder='Search by post title...'
                    value={userInput}
                />
            </div>

            {data && data.length > 0 &&
                <div
                    onClick={() => setUserInput('')}
                    className='absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50'
                >
                    <div className="max-h-80 overflow-y-auto">
                        {data.map(({id, title, slug}) => (
                            <Link
                                className='block px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0'
                                key={id}
                                href={`/${slug}`}
                            >
                                <div className="flex items-center gap-2">
                                    <Search size={16} className="text-gray-400" />
                                    <span className="text-gray-900">{title}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default SearchInput
