import AuthModal from '@/components/Modal/Auth/AuthModal';
import { auth } from '@/firebase/clientApp';
import { Button, Flex } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import React from 'react';
import AuthButtons from './AuthButtons';

type RightContentProps = {
  user:any
};

const RightContent:React.FC<RightContentProps> = ({user}) => {
  
  return (
    <>
    <AuthModal/>
    <Flex align="center" justify="center">
      {user ?  <Button onClick= {()=> signOut(auth)}>Logout</Button>:<AuthButtons />}
    </Flex>
    </>
  )
}
export default RightContent;