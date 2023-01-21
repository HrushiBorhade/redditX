import { auth } from '@/firebase/clientApp';
import { Flex , Image} from '@chakra-ui/react';
import React from 'react';
import RightContent from './RightContent/RightContent';
import SearchInput from './SearchInput';
import {useAuthState} from 'react-firebase-hooks/auth'
const Navbar:React.FC = () => {
  const [user , loading , eror] = useAuthState(auth)
  return (
    <Flex bg="white" height="50px" padding="6px 18px" align="center">
      <Flex align="center">
        <Image src='/images/redditFace.svg' height="32px"/>
        <Image 
          src='/images/redditText.svg'
          height="50px" 
          display={{base:"none" ,md:"unset"}}/>
      </Flex>
      {/* <Directory/> */}
      <SearchInput/>
      <RightContent user={user}/>
    </Flex>
  )
}
export default Navbar;