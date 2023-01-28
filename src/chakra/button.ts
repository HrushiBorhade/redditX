import {ComponentStyleConfig} from "@chakra-ui/theme"
import { theme } from "./theme"

export const Button: ComponentStyleConfig =  {
  baseStyle : {
    borderRadius:"20px",
    fontSize:"10pt",
    fontWeight:"700",
    _focus: {
      boxShadow:"none",
    }
  },
  sizes : {
    sm: {
      fontSize:"8pt"
    },
    md: {
      fontSize:"10pt"
    }
  },
  variants: {
    solid:{
      bg:"#FF3c00",
      color:"white",
      border:"1px solid",
      borderColor:"#FF3c00",
      _hover:{
        color:"#FF3c00",
        bg:"white",
      }
    },
    blue:{
      color: "white",
      bg: "blue.500",
      _hover: {
        bg: "blue.400",
      },
    },
    outline:{
      color:"#FF3c00",
      border:"1px solid",
      borderColor:"#FF3c00",
      _hover:{
       bg:"#FF3c00",
       color:"white"
      }
    },
    oauth: {
      height: "34px",
      border: "1px solid",
      borderColor: "gray.300",
      _hover: {
        bg: "gray.50",
      },
    },
  }
}