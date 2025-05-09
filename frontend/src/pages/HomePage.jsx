import {
  Container,
  VStack,
  Text,
  Link,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
import { useColorModeValue } from "../components/ui/color-mode";

const DecorativeBox = ({ height = "20" }) => {
  return <Box height={height} rounded="md" shadow="md" />;
};
const HomePage = () => {
  const textColor = useColorModeValue("#1B2D52", "#9FB0E8");
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text fontSize="4xl" color={textColor} fontWeight={"bold"}>
          Current Products
        </Text>
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
        {products.length === 0 && (
          <Text color={textColor}>
            No products found :{"(  "}
            <Link href="/create" color={textColor}>
              <Text as="span" _hover={{ textDecoration: "underline" }}>
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
