import { Button, Container, Flex, HStack, Text, Link } from "@chakra-ui/react";
import { FaRegMoon, FaRegSun, FaPlus } from "react-icons/fa6";
import React from "react";
import { useColorMode } from "./ui/color-mode";
import { useColorModeValue } from "./ui/color-mode";
import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        as="nav"
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
          <Link color={useColorModeValue("#1B2D52", "#9FB0E8")} href={"/"}>
            Product Store
          </Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link href={"/create"}>
            <Button>
              <FaPlus />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <FaRegMoon /> : <FaRegSun />}
          </Button>
          {user && ( // <-- Show Logout only if logged in
            <Button colorScheme="red" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
