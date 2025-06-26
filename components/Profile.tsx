import { useState } from 'react';
import PromptCard from './PromptCard';
import { motion } from 'framer-motion';

interface ProfileComponentProps {
  name: string;
  desc: string;
  data: any[];
  handleEdit: (post: any) => void;
  handleDelate: (post: any) => Promise<void>;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelate
}) => {
  const [activeTab, setActiveTab] = useState('posts');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = data.filter(post => 
    post.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'
    >
      {/* Profile Header */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10'>
        <div>
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className='text-4xl sm:text-5xl font-bold text-gray-900'
          >
            <span className='bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
              {name}'s Dashboard
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='mt-3 text-lg text-gray-600 max-w-2xl'
          >
            {desc}
          </motion.p>
        </div>

        {/* Search Bar */}
        <div className='w-full md:w-auto'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search prompts...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full md:w-64 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all'
            />
            <svg
              className='absolute right-3 top-2.5 h-5 w-5 text-gray-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
            </svg>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className='border-b border-gray-200 mb-8'>
        <nav className='-mb-px flex space-x-8'>
          <button
            onClick={() => setActiveTab('posts')}
            className={`${activeTab === 'posts' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
          >
            My Posts
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`${activeTab === 'saved' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
          >
            Saved Posts
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`${activeTab === 'stats' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
          >
            Statistics
          </button>
        </nav>
      </div>

      {/* Content Grid */}
      {filteredPosts.length > 0 ? (
        <motion.div 
          layout
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
        >
          {filteredPosts.map((post) => (
            <motion.div
              key={post._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <PromptCard 
                post={post}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelate={() => handleDelate && handleDelate(post)} 
                handleTagClick={(tag) => {
                  setSearchQuery(tag);
                  setActiveTab('posts');
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='flex flex-col items-center justify-center py-12'
        >
          <div className='bg-indigo-100 p-4 rounded-full mb-4'>
            <svg className='h-12 w-12 text-indigo-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
          </div>
          <h3 className='text-lg font-medium text-gray-900'>No prompts found</h3>
          <p className='mt-1 text-gray-500'>Try adjusting your search or create a new prompt</p>
        </motion.div>
      )}

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className='fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors'
        onClick={() => {
          // Add functionality for creating new prompt
          console.log('Create new prompt');
        }}
      >
        <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
        </svg>
      </motion.button>
    </motion.section>
  );
};

export default ProfileComponent;