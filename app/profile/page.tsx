'use client';
import {useState,useEffect} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import ProfileComponent from '@components/Profile';



type Post = {
  _id: string;
  // add other properties as needed
};

const Profile = () => {
  const router = useRouter();
    const handleEdit = (post: Post) => {
      router.push(`/update-prompt?id=${post._id}`);
    }
    const handleDelate = async (post: Post) =>{
      const hasConfirmed = confirm("Are you sure you want to delete this prompt?")

      if(hasConfirmed){
        try{
          await fetch(`/api/prompt/${post._id.toString()}` , {
            method:'DELETE'
          })
          const filteredPosts = posts.filter((p) => p._id !== post._id);

          setPosts(filteredPosts);
        }catch(error){
          console.log(error)
        }
      }
    }
    const [posts, setPosts] = useState<Post[]>([])
     
    const {data: session} = useSession();

    useEffect(() => {
        // Fetch initial data or perform any setup here
        const fetchData = async () => {
          if (!session?.user?.id) return;

          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
    
          setPosts(data);
        };
    
        if(session?.user.id) { fetchData(); }
      }, [session?.user.id]);

  return (
    <ProfileComponent
        name ="My"
        desc ='Welcome to your personalized profile page. Here you can find all your posts and manage them effectively.'
        data ={posts}
        handleEdit = {handleEdit}
        handleDelate ={ handleDelate}
    /> 
        
    
  )
}

export default Profile