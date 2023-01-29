import { ChevronDownIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, Button, MenuList, MenuItem, Box, Flex, Icon,Text, MenuDivider } from '@chakra-ui/react';
import { signOut, User } from 'firebase/auth';
import React from 'react';
import { IoSparkles } from 'react-icons/io5';
import {FaRedditSquare, } from 'react-icons/fa'
import {VscAccount} from 'react-icons/vsc'
import {CgProfile} from 'react-icons/cg'
import {MdOutlineLogin} from 'react-icons/md'
import { auth } from '@/firebase/clientApp';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { AuthModalState } from '@/atoms/authModalAtom';
import { communityState } from '@/atoms/communitiesAtom';
type UserMenuProps = {
  user:User
};

const UserMenu:React.FC<UserMenuProps> = ({user} ) => {
  const resetCommunityState = useResetRecoilState(communityState)
  const setAuthModalState = useSetRecoilState(AuthModalState)

  const logout = async () => {
    await signOut(auth)
    resetCommunityState()
  } 
  
  return (
    <Menu>
       <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius="4px"
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex alignItems="center">
          <Flex alignItems="center">
            {user ? (
              <>
                <Icon
                  fontSize={24}
                  mr={1}
                  color="gray.300"
                  as={FaRedditSquare}
                />
                <Box
                  display={{ base: "none", lg: "flex" }}
                  flexDirection="column"
                  fontSize="8pt"
                  alignItems="flex-start"
                  mr={8}
                >
                  <Text fontWeight={700}>
                    {user?.displayName || user?.email?.split("@")[0]}
                  </Text>
                  <Flex alignItems="center">
                    <Icon as={IoSparkles} color="brand.100" mr={1} />
                    <Text color="gray.400">1 karma</Text>
                  </Flex>
                </Box>
              </>
            ) : (
              <Icon fontSize={24} mr={1} color="gray.400" as={VscAccount} />
            )}
          </Flex>
          <ChevronDownIcon color="gray.500" />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? 
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "gray.100" }}
            >
              <Flex alignItems="center">
                <Icon fontSize={20} mr={2} as={CgProfile} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "gray.100" }}
              onClick={logout}
            >
              <Flex alignItems="center">
                <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                Log Out
              </Flex>
            </MenuItem>
          </>
        :  
          <>
             <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.400", color: "white" }}
              onClick={()=> setAuthModalState({open:true , view:"login"})}
            >
              <Flex alignItems="center">
                <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                Log In / Sign Up
              </Flex>
            </MenuItem>
          </>
        }
        
    </MenuList>
    </Menu>
  )
}
export default UserMenu;