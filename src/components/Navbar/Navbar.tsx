import { auth } from '@/firebase/clientApp';
import { Flex , Image} from '@chakra-ui/react';
import React from 'react';
import RightContent from './RightContent/RightContent';
import SearchInput from './SearchInput';
import {useAuthState} from 'react-firebase-hooks/auth'
import Directory from './Directory/Directory';
const Navbar:React.FC = () => {
  const [user , loading , eror] = useAuthState(auth)
  return (
    <Flex bg="white" height="50px" padding="6px 18px" align="center" justify={{md:"space-between"}}>
      <Flex align="center" width={{base:"40px", md:"auto"}} mr={{base:0, md:2}}>
        <Image alt="reddit face logo"src='/images/redditFace.svg' height="32px"/>
        <Image 
          alt="reddit text logo"
          src='/images/redditText.svg'
          height="50px" 
          display={{base:"none" ,md:"unset"}}/>
      </Flex>
      {user && <Directory/>}
      <SearchInput user={user}/>
      <RightContent user={user}/>
    </Flex>
  )
}
export default Navbar;