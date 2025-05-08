import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
//import { useProductStore } from "../store/product";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", {
        username,
        password,
      });
      login(res.data);
      navigate("/");
      toast.success("Login successful!");
    } catch (err) {
      console.error("Login error:", err);

      if (err.response && err.response.data && err.response.data.message) {
        toast.error("Login Failed", { description: err.response.data.message });
      } else if (err.request) {
        toast.error("Login Failed", {
          description: "No response from server.",
        });
      } else {
        toast.error("Login Failed", { description: "Something went wrong." });
      }
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading
          as="h1"
          size="2xl"
          textAlign="center"
          mb={8}
          color={useColorModeValue("#1B2D52", "#9FB0E8")}
          fontWeight="bold"
          p={9}
          mt={6}
        >
          Login
        </Heading>

        <Box
          w="full"
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} color={useColorModeValue("#1B2D52", "#9FB0E8")}>
              <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                color={useColorModeValue("gray.200", "gray.200")}
                bg={useColorModeValue("#1B2D52", "#9FB0E8")}
                w="full"
                type="submit"
              >
                Login
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
};

export default LoginPage;
