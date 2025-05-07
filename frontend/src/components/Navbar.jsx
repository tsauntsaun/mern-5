import { Button, Container, Flex, HStack, Text, Link } from "@chakra-ui/react";
import { FaFaceGrin, FaRegMoon, FaRegSun } from "react-icons/fa6";
import React from "react";
import { useColorMode } from "./ui/color-mode";
import { useColorModeValue } from "./ui/color-mode";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }} 
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
        >
          <Link color={useColorModeValue("#1B2D52", "#9FB0E8")} href={"/"}>Product Store</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link href={"/create"}>
            <Button>
              <FaFaceGrin />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <FaRegMoon /> : <FaRegSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
