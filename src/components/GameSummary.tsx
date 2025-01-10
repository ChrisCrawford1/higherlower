import { Button, Container, Flex, Text } from "@chakra-ui/react";

interface GameSummaryProps {
  finalScore: number;
  onGameReset: () => void;
}

const GameSummary = ({ finalScore, onGameReset }: GameSummaryProps) => {
  return (
    <Container>
      <Flex flexDir="column">
        <Text textStyle="6xl" fontWeight="bolder">
          Game Over!
        </Text>
        <Text textStyle="2xl">Final Score: {finalScore}</Text>
        <Button
          variant="surface"
          color="green"
          w="1/2"
          mx="auto"
          onClick={onGameReset}
        >
          Restart
        </Button>
      </Flex>
    </Container>
  );
};

export default GameSummary;
