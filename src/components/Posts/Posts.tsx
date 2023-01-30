import { Community } from '@/atoms/communitiesAtom';
import { Post } from '@/atoms/postsAtom';
import { auth, firestore } from '@/firebase/clientApp';
import usePosts from '@/hooks/usePosts';
import { Stack } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { query, collection, where, orderBy, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import PostItem from './PostItem';
import PostLoader from './PostLoader';

type PostsProps = {
  communityData : Community;
  userId?:User
};

const Posts:React.FC<PostsProps> = ({communityData}) => {
  const [loading , setLoading] = useState(false);

  const [user] = useAuthState(auth)
  const {
    postStateValue,setPostStateValue,onDeletePost,onSelectPost,onVote
  } = usePosts()
  const getPosts = async () => {
    console.log("WE ARE GETTING POSTS!!!");

    setLoading(true);
    try {
      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData?.id!),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postsQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev)=>({
        ...prev,
        posts: posts as Post[]
      }));
      console.log(postStateValue);
    } catch (error: any) {
      console.log("getPosts error", error.message);
    }
    setLoading(false);
  };

  useEffect(()=>{getPosts()} , [])
  return(
    <>
      {loading ? (
        <PostLoader/>
      ) : (
        <Stack>
         {postStateValue.posts.map((item)=> (
          <PostItem
            key={item.id}
            post={item}
            userIsCreator={user?.uid === item.creatorId}
            userVoteValue={undefined}
            onVote={onVote}
            onDeletePost={onDeletePost}
            onSelectPost={onSelectPost}
          />
        ))}
        </Stack>
      )}
    </>
    
  )
}
export default Posts;