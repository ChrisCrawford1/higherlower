import { PIP_TO_VALUE_MAP, PIPS, SUITS } from "./enum";

export interface IDeck {
  drawCard(): Card | null;
  deckLength(): number;
  shuffle(): void;
}

export interface ICard {
  getCardImage(): string;
  getFullCardName(): string;
  getCardPip(): string;
  getCardValue(): number;
}

export class Card implements ICard {
  suit: string;
  pip: string;
  value: number;

  constructor(suit: string, pip: string, value: number) {
    this.suit = suit;
    this.pip = pip;
    this.value = value;
  }

  getCardImage(): string {
    switch (this.suit) {
      case "hearts":
        return "❤️";
      case "spades":
        return "♠";
      case "diamonds":
        return "♦️";
      case "clubs":
        return "♣️";
      default:
        return "?";
    }
  }

  getCardPip(): string {
    return this.pip;
  }

  getFullCardName(): string {
    const alphaPipMap: { [key: string]: string } = {
      A: "Ace",
      J: "Jack",
      Q: "Queen",
      K: "King",
    };

    let name = this.pip;
    if (alphaPipMap.hasOwnProperty(name)) {
      name = alphaPipMap[name];
    }

    return `${name} of ${this.suit
      .charAt(0)
      .toUpperCase()}${this.suit.substring(1)}`;
  }

  getCardValue(): number {
    return this.value;
  }
}

export class Deck implements IDeck {
  deck: Card[];

  constructor(deck: Card[]) {
    this.deck = deck;
  }

  drawCard(): Card | null {
    if (this.deckLength() === 0) {
      return null;
    }

    return this.deck.pop() as Card;
  }

  deckLength(): number {
    return this.deck.length;
  }

  shuffle(): void {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.deck[i];

      this.deck[i] = this.deck[j];
      this.deck[j] = temp;
    }
  }
}

export const GenerateNewDeck = (): IDeck => {
  let deckCards: Card[] = [];
  for (let suit of Object.values(SUITS)) {
    for (let pip of PIPS) {
      let value = PIP_TO_VALUE_MAP[pip as keyof typeof PIP_TO_VALUE_MAP];
      deckCards.push(new Card(suit, pip, value));
    }
  }

  return new Deck(deckCards);
};
