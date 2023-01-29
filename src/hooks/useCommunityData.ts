import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {Community, CommunitySnippet, communityState} from '../atoms/communitiesAtom'
import { AuthModalState } from "../atoms/authModalAtom";
import { auth, firestore } from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, getDocs, increment, writeBatch } from "firebase/firestore";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState)
  const setAuthModalState = useSetRecoilState(AuthModalState)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    getMySnippets();
  }, [user]);

  const onJoinOrLeaveCommunity = (communityData : Community , isJoined : boolean)=> {
    //is user signed in?
      // if no -> open auth modal
    if(!user){
      setAuthModalState({open:true , view:"login"})
    }
    if(isJoined){
      leaveCommunity(communityData.id)
      return;
    }
    joinCommunity(communityData)
  }

  const getMySnippets = async () => {
    setLoading(true);
    try {
      const snippetDocs = await getDocs(collection(firestore , `users/${user?.uid}/communitySnippets`))

      const snippets = snippetDocs.docs.map(doc => ({...doc.data() }));
      setCommunityStateValue(prev => ({
        ...prev,
        mySnippets : snippets as CommunitySnippet[]
      }))
    } catch (error: any) {
      console.log("Error getting user snippets", error);
      setError(error.message);
    }
    setLoading(false);
  };
  const joinCommunity = async (communityData:Community) => {

    console.log("JOINING COMMUNITY: ", communityData.id);
    try {
      const batch = writeBatch(firestore);
      //creating new snippet
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
      };

      //adding to our user mySnippet[]
      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id // will for sure have this value at this point
        ),
        newSnippet
      );

      //update number of memebers in community
      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMembers: increment(1),
      });

      // perform batch writes
      await batch.commit();

      // Add current community to snippet
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error) {
      console.log("joinCommunity error", error);
    }
    setLoading(false);
  };

  const leaveCommunity = async (communityId: string) => {
    try {
      const batch = writeBatch(firestore);

      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets/${communityId}`)
      );

      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      });

      await batch.commit();

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }));
    } catch (error) {
      console.log("leaveCommunity error", error);
    }
    setLoading(false);
  };   
 
  
  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading
  
  };
};

export default useCommunityData;
