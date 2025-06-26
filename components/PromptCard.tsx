'use client';
import {useState, useEffect} from 'react';
import Image from 'next/image';
import {useSession} from 'next-auth/react';
import { usePathname } from '@node_modules/next/navigation';

type PromptCardProps = {
  post: {
    _id: string;
    [key: string]: any;
  };
  handleTagClick: (tag: string) => void;
  handleEdit?: () => void;
  handleDelate?: () => void;
};

const PromptCard: React.FC<PromptCardProps> = ({ post, handleTagClick ,handleEdit,handleDelate}) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const [copied,setCopied] = useState('');

  const handleCopy =() =>{
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(''), 3000);
  }
  return (
    <div className='flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image
            src={post.creator.image || '/assets/images/avatar.png'}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
           />
           <div>
            <h3 className = 'font-satoshi font-semibold text-gray-900'> {post.creator.username} </h3>
            <p className='font-inter text-sm text-gray-500'> {post.creator.email}</p>
           </div>
        </div>
        <div className='w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer' onClick={handleCopy}>
           <Image
             src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
             width ={12}
             height ={12}
             alt = 'copy_icon'
           />

        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p className='font-inter text-sm cursor-pointer  bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent ' onClick ={() => handleTagClick(post.tag)}> #{post.tag}</p>
        {session?.user.id === post.creator._id && pathName === '/profile' && (
          <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'> 
            <p className='font-inter text-sm cursor-pointer bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent' onClick ={handleEdit}> 
              Edit
            </p>

            <p className='cursor-pointer bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent' onClick ={handleDelate}> 
              Delete
            </p>
          </div>
        )}
  </div>
  );
};

export default PromptCard;