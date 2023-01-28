import { Community } from '@/atoms/communitiesAtom';
import CommunityNotFound from '@/components/Community/CommunityNotFound';
import Header from '@/components/Community/Header';
import PageContent from '@/components/Layout/PageContent';
import { firestore } from '@/firebase/clientApp';
import { Flex } from '@chakra-ui/react';
import { doc } from '@firebase/firestore';
import { getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import safeJsonStringify from "safe-json-stringify"

type CommunityPageProps = {
  communityData: Community
 };

const CommunityPage:React.FC<CommunityPageProps> = ({communityData}) => {
  if(!communityData){
    return <CommunityNotFound/>
  }
  return (
    <>
    <Header communityData={communityData}/>
    <PageContent>
      <><div>LHS</div></>
      <><div>RHS</div></>
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