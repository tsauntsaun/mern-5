import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  HStack,
  Input,
  VStack,
  CloseButton,
  Portal,
  Dialog,
  Span,
} from "@chakra-ui/react";
import { FaRegTrashCan, FaFeather, FaRegPenToSquare } from "react-icons/fa6";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "../store/product";
import { toast } from "sonner";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.200", "gray.200");
  const bg = useColorModeValue("#9FB0E8", "#1B2D52");

  const { deleteProduct, updateProduct } = useProductStore();

  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast.error("Error", { description: message });
    } else {
      toast.success("Success", { description: message });
    }
  };

  const handleSave = async () => {
    const { success, message } = await updateProduct(
      product._id,
      editedProduct
    );

    if (success) {
      toast.success("Updated Successfully", {
        description: message,
      });
    } else {
      toast.error("Update Failed", {
        description: message,
      });
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
      m={4}
      p={2}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box color={useColorModeValue("#1B2D52", "#9FB0E8")}>
        <Heading as="h3" size="2xl" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button
                color={useColorModeValue("gray.200", "gray.200")}
                bg={useColorModeValue("#1B2D52", "#9FB0E8")}
              >
                <FaRegPenToSquare />
              </Button>
            </Dialog.Trigger>

            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content bg={useColorModeValue("#E0BACF", "#B17F9F")}>
                  <Dialog.Header>
                    <Dialog.Title color={useColorModeValue("white", "#1A202C")}>
                      Edit Product
                    </Dialog.Title>
                  </Dialog.Header>

                  <Dialog.Body>
                    <VStack spacing={4}>
                      <Input
                        placeholder="Product Name"
                        value={editedProduct.name}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            name: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Price"
                        value={editedProduct.price}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            price: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Image URL"
                        value={editedProduct.image}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            image: e.target.value,
                          })
                        }
                      />
                    </VStack>
                  </Dialog.Body>

                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button onClick={handleSave}>Save</Button>
                  </Dialog.Footer>

                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
          <Button
            color={useColorModeValue("gray.200", "gray.200")}
            bg={useColorModeValue("#1B2D52", "#9FB0E8")}
            onClick={() => handleDeleteProduct(product._id)}
          >
            <FaRegTrashCan />
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};
export default ProductCard;
