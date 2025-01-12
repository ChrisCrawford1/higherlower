import "./App.css";
import { Button, Container, Flex, Text } from "@chakra-ui/react";
import GameCard from "./components/GameCard";
import { useEffect, useState } from "react";
import { GenerateNewDeck, ICard, IDeck } from "./internal/Deck";
import { isPlayerCorrect } from "./internal/Logic";
import { PREDICTION } from "./internal/enum";
import GameSummary from "./components/GameSummary";

function App() {
  const [deck, setDeck] = useState<IDeck | null>(null);
  const [currentCard, setCurrentCard] = useState<ICard | null>();
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    startNewGame();
  }, []);

  const drawCard = (prediction: PREDICTION) => {
    const nextCard = deck?.drawCard();

    if (currentCard && nextCard) {
      const playerIsCorrect = isPlayerCorrect(
        currentCard,
        nextCard,
        prediction
      );

      if (playerIsCorrect) {
        setScore(score + 1);
        setCurrentCard(nextCard);
      } else {
        setGameOver(true);
        processScore(score);
      }
    }
  };

  const startNewGame = () => {
    const freshDeck = GenerateNewDeck();
    freshDeck.shuffle();

    setDeck(freshDeck);
    setCurrentCard(freshDeck?.drawCard());
    setScore(0);
    setGameOver(false);
  };

  const processScore = (score: number) => {
    const previousHighScore = localStorage.getItem("hs");

    if (previousHighScore === null) {
      localStorage.setItem("hs", score.toString());
      return;
    }

    if (score > Number(previousHighScore)) {
      localStorage.setItem("hs", score.toString());
    }
  };

  return (
    <>
      <Container>
        {score > 0 && !gameOver && <Text>Score: {score}</Text>}
        {gameOver === false ? (
          <>
            <Flex justifyContent="center" p="4">
              <GameCard
                image={currentCard?.getCardImage() as string}
                rank={currentCard?.getCardPip() as string}
              />
            </Flex>
            <Flex gap="2" flexDir="column">
              <Text fontWeight="light">
                Will the next card be higher or lower?
              </Text>
              <Flex justifyContent="center" spaceX="4">
                <Button
                  variant="subtle"
                  color="gray"
                  onClick={() => drawCard(PREDICTION.HIGHER)}
                >
                  Higher
                </Button>
                <Button
                  variant="subtle"
                  color="gray"
                  onClick={() => drawCard(PREDICTION.LOWER)}
                >
                  Lower
                </Button>
              </Flex>
            </Flex>
          </>
        ) : (
          <GameSummary finalScore={score} onGameReset={() => startNewGame()} />
        )}
      </Container>
    </>
  );
}

export default App;
