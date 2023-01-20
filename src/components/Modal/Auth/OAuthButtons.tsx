import { Button, Flex, Image , Text } from '@chakra-ui/react';
import React from 'react';

const OAuthButtons:React.FC = () => {
  
  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button variant="oauth" mb={2}>
        <Image src="./images/googlelogo.png" alt="google logo" height="20px" mr={4}/>
        Continue with Google
      </Button>
      <Button variant="oauth" mb={2}>
        Some Other Provider
      </Button>
    </Flex>
  )
}
export default OAuthButtons;