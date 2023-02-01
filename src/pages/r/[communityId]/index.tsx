import { Community, communityState } from '@/atoms/communitiesAtom';
import About from '@/components/Community/About';
import CommunityNotFound from '@/components/Community/CommunityNotFound';
import CreatePostLink from '@/components/Community/CreatePostLink';
import Header from '@/components/Community/Header';
import PageContent from '@/components/Layout/PageContent';
import Posts from '@/components/Posts/Posts';
import { firestore } from '@/firebase/clientApp';
import { Flex } from '@chakra-ui/react';
import { doc } from '@firebase/firestore';
import { getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import safeJsonStringify from "safe-json-stringify"

type CommunityPageProps = {
  communityData: Community
 };

const CommunityPage:React.FC<CommunityPageProps> = ({communityData}) => {
  const setCommunityStateValue= useSetRecoilState(communityState)
  useEffect(() => {
    setCommunityStateValue((prev)=>({
      ...prev,
      currentCommunity:communityData
    }))
  } , [])
  if(!communityData){
    return <CommunityNotFound/>
  }

  return (
    <>
    <Header communityData={communityData}/>
    <PageContent>
      <>
        <CreatePostLink/>
        <Posts communityData={communityData}/>
      </>
      <><About communityData={communityData}/></>
    </PageContent> 
    </>
  )
}

export async function getServerSideProps(context : GetServerSidePropsContext){
  console.log("GET SERVER SIDE PROPS RUNNING");

  try {
    const communityDocRef = doc(
      firestore , 
      "communities" ,
      context.query.communityId as string )
  
      const communityDoc = await getDoc(communityDocRef)
  
      return {
        props:{
          communityData : communityDoc.exists() 
            ?JSON.parse(safeJsonStringify({id:communityDoc.id , ...communityDoc.data()}))
            :""
        }
      }
  } catch (error) {
    console.log("getServerSideProps error - [communityId]" , error);
  }

}

export default CommunityPage;