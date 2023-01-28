import { AuthModalState } from '@/atoms/authModalAtom';
import { Button ,Flex,Input,Text} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from '@/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/firebase/errors';
import { User } from 'firebase/auth';
import { collection, setDoc , doc } from 'firebase/firestore';


const SignUp:React.FC = () => {
  const setAuthModalState = useSetRecoilState(AuthModalState)
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",

  });
  const [error , setError] = useState("")
  const [
    createUserWithEmailAndPassword,
    userCred,
    loading,
    userError,
  ] = useCreateUserWithEmailAndPassword(auth);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(error) setError("");
    if(signUpForm.password !== signUpForm.confirmPassword){
      setError("Passwords don't match")
      return;
    }
    createUserWithEmailAndPassword(signUpForm.email,signUpForm.password)
  }


  const onChange = (
  event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const createUserDocument = async (user : User) => {
    const userDocRef = doc(firestore , "users" , user.uid);
    await setDoc(userDocRef , {
      uid: user.uid,
      email:user.email,
      displayName:user.displayName,
      providerData:user.providerData
    });
  };

  useEffect(()=>{
    if(userCred) {
      createUserDocument(userCred.user)
    }
  } , [userCred])
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
      <Text 
        textAlign="center" 
        color="red" 
        fontSize="10pt"
      >
        {error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Button
        width="100%"
        height="36px"
        mb={2}
        mt={2}
        type="submit"
        isLoading={loading}
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