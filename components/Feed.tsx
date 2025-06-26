'use client';

import {useState,useEffect} from 'react'
import PromptCard from './PromptCard';

type PromptCardListProps = {
  data: Array<{
    _id: string;
    [key: string]: any;
  }>;
  handleTagClick: (tag: string) => void;
  handleEdit: (post: { _id: string; [key: string]: any }) => void;
  handleDelate: (post: { _id: string; [key: string]: any }) => void;
};

const PromptCardList =({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className='mt-16 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [ searchText,setSearchText] = useState('')
  const [posts, setPosts] = useState<Array<{ _id: string; [key: string]: any }>>([]);

  const handleSearchChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    //setSearchText(e.target.value);
  }

  useEffect(() => {
    // Fetch initial data or perform any setup here
    const fetchData = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    };

    fetchData();
  }, []);


  return (
    <section className='mt-16 mx-auto w-full max-w-xl flex justify-center items-center flex-col gap-2 text-center'>
       <form className='relative w-full flex-center'>
        <input
         type ='text'
         placeholder = 'Search for a tag or a username'
         value ={searchText}
         onChange={handleSearchChnage}
         required 
         className = 'block w-full rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0  peer'
        />
       </form>

       <PromptCardList 
        data={posts}
        handleTagClick={() => { } } handleEdit={function (post: { _id: string;[key: string]: any; }): void {
          throw new Error('Function not implemented.');
        } } handleDelate={function (post: { _id: string;[key: string]: any; }): void {
          throw new Error('Function not implemented.');
        } }       // handleUserClick = {(userId: string) => {}}
       />
    </section>
  )
}

export default Feed