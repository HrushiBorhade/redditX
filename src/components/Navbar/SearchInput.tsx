import { PhoneIcon, SearchIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';

type SearchInputProps = {
  // user:
};

const SearchInput:React.FC<SearchInputProps> = () => {
  
  return (
    <Flex flexGrow={1} mr={2} align="center" pl={2}>
      <InputGroup>
        <InputLeftElement
          pointerEvents='none'
          children={<SearchIcon color='gray.400' mb={1} />}
        />
        <Input 
          placeholder='Search Reddit'
          fontSize="11pt"
          _placeholder={{color:"gray.500"}}
          _hover={{
            bg:"white",
            border:"1px solid",
            borderColor:"blue.500"
          }}
          _focus={{
            outline:"none", 
            border:"1px solid",
            borderColor:"blue.500"
          }}
          bg="gray.50"
          height="34px"
          borderRadius="15px"
        />
      </InputGroup>

    </Flex>
  )
}
export default SearchInput;