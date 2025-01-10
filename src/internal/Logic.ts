import { ICard } from "./Deck";
import { PREDICTION, RESULT } from "./enum";

const determineOutcome = (currentCard: ICard, nextCard: ICard): RESULT => {
  if (currentCard.getCardValue() < nextCard.getCardValue()) {
    return RESULT.HIGHER;
  }

  if (currentCard.getCardValue() > nextCard.getCardValue()) {
    return RESULT.LOWER;
  }

  if (currentCard.getCardValue() === nextCard.getCardValue()) {
    return RESULT.DRAW;
  }

  throw new Error("Invalid card values");
};

export const IsPlayerCorrect = (
  currentCard: ICard,
  nextCard: ICard,
  prediction: PREDICTION
): boolean => {
  const outcome = determineOutcome(currentCard, nextCard);

  if (outcome === RESULT.DRAW) {
    // TODO: ?
  }

  return outcome === prediction.valueOf();
};
