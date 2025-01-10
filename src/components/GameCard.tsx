import { Box, Flex, Text } from "@chakra-ui/react";

interface GameCardProps {
  rank: string;
  image: string;
}

const PlayingCard = ({ rank, image }: GameCardProps) => {
  return (
    <Box
      width="150px"
      height="200px"
      borderWidth="2px"
      borderRadius="md"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
      position="relative"
      textAlign="center"
    >
      {/* Top-left rank and suit */}
      <Flex
        direction="column"
        position="absolute"
        top="8px"
        left="8px"
        align="center"
        justify="center"
      >
        <Text fontWeight="bold" fontSize="lg">
          {rank}
        </Text>
        <Text fontSize="sm">{image}</Text>
      </Flex>

      {/* Card emoji */}
      <Flex justify="center" align="center" height="100%" px="4">
        {image ? (
          <Text fontSize="5xl">{image}</Text>
        ) : (
          <Text fontSize="xl" fontWeight="bold">
            {rank} ?
          </Text>
        )}
      </Flex>

      {/* Bottom-right rank and suit */}
      <Flex
        direction="column"
        position="absolute"
        bottom="8px"
        right="8px"
        align="center"
        justify="center"
        transform="rotate(180deg)"
      >
        <Text fontWeight="bold" fontSize="lg">
          {rank}
        </Text>
        <Text fontSize="sm">{image}</Text>
      </Flex>
    </Box>
  );
};

export default PlayingCard;
