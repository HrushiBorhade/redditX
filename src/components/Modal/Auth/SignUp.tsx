import { AuthModalState } from '@/atoms/authModalAtom';
import { Button ,Flex,Input,Text} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';



const SignUp:React.FC = () => {
  const setAuthModalState = useSetRecoilState(AuthModalState)
  const [signUpform, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",

  });
  
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    }


  const onChange = (
  event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="email"
        type="text"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{color:"gray.500"}}
        _hover={{
          bg:"white",
          border:"1px solid",
          borderColor:"blue.500"
        }}
        _focus={{
          outline:"none",
          bg:"white",
          border:"1px solid",
          borderColor:"blue.500"
        }}
        bg="gray.50"
      />
      <Input
        required
        name="password"
        placeholder="password"
        type="password"
        onChange={onChange}
        mb={2}
        fontSize="10pt"
        _placeholder={{color:"gray.500"}}
        _hover={{
          bg:"white",
          border:"1px solid",
          borderColor:"blue.500"
        }}
        _focus={{
          outline:"none",
          bg:"white",
          border:"1px solid",
          borderColor:"blue.500"
        }}
        bg="gray.50"
      />
      <Input
        required
        name="confirmPassword"
        placeholder="Confirm Password"
        type="password"
        onChange={onChange}
        mb={2}
        fontSize="10pt"
        _placeholder={{color:"gray.500"}}
        _hover={{
          bg:"white",
          border:"1px solid",
          borderColor:"blue.500"
        }}
        _focus={{
          outline:"none",
          bg:"white",
          border:"1px solid",
          borderColor:"blue.500"
        }}
        bg="gray.50"
      />
      <Button
        width="100%"
        height="36px"
        mb={2}
        mt={2}
        type="submit"
      >
        Sign Up
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>Already a redditor?</Text>
        <Text 
          color="blue.500" 
          fontWeight="bold" 
          cursor="pointer"
          onClick={()=> setAuthModalState((prev)=>({
            ...prev,
            view:"login"
          }))}
        
        >LOG IN</Text>
      </Flex>
    </form>
  );
}
export default SignUp;