import type { Round } from "./types";

// Static, hand-written rounds used when live generation fails twice in a
// row, so a Claude outage or malformed response never fully dead-ends the
// game. Kept small on purpose - these exist purely as a safety net.
export const FALLBACK_ROUNDS: Round[] = [
  {
    theme: "animals",
    difficulty: "beginner",
    words: [
      { word: "dog", definition: "A friendly animal that barks and likes to play.", emoji: "🐶", syllables: ["dog"], distractors: ["cup", "sun", "run"] },
      { word: "cat", definition: "A small furry animal that says meow.", emoji: "🐱", syllables: ["cat"], distractors: ["hat", "big", "top"] },
      { word: "fish", definition: "An animal that swims and lives in water.", emoji: "🐟", syllables: ["fish"], distractors: ["wish", "book", "lamp"] },
      { word: "bird", definition: "An animal with wings that can fly.", emoji: "🐦", syllables: ["bird"], distractors: ["word", "desk", "milk"] },
      { word: "rabbit", definition: "A small animal with long ears that hops.", emoji: "🐰", syllables: ["rab", "bit"], distractors: ["ticket", "pencil", "window"] },
    ],
    sentences: [
      { text: "The ___ ran across the yard chasing a ball.", answer: "dog", distractors: ["cup", "sun", "run"] },
      { text: "The ___ curled up and took a nap in the sun.", answer: "cat", distractors: ["hat", "big", "top"] },
      { text: "The ___ swam in circles around the little tank.", answer: "fish", distractors: ["wish", "book", "lamp"] },
      { text: "The ___ sang a song from the top of the tree.", answer: "bird", distractors: ["word", "desk", "milk"] },
      { text: "The ___ hopped quickly through the tall grass.", answer: "rabbit", distractors: ["ticket", "pencil", "window"] },
    ],
    passage: {
      text: "Mia has a pet rabbit. The rabbit likes to eat fresh green food and hop around the yard.",
      question: "What does Mia's rabbit like to do?",
      answer: "hop around the yard",
      distractors: ["swim in a lake", "sleep in a tree", "fly over the fence"],
    },
  },
  {
    theme: "food",
    difficulty: "beginner",
    words: [
      { word: "apple", definition: "A round fruit that is red or green.", emoji: "🍎", syllables: ["ap", "ple"], distractors: ["pencil", "window", "ticket"] },
      { word: "bread", definition: "A soft food made from baked flour.", emoji: "🍞", syllables: ["bread"], distractors: ["dress", "clock", "plant"] },
      { word: "milk", definition: "A white drink that comes from cows.", emoji: "🥛", syllables: ["milk"], distractors: ["silk", "desk", "lamp"] },
      { word: "egg", definition: "A food laid by chickens, often eaten for breakfast.", emoji: "🥚", syllables: ["egg"], distractors: ["leg", "top", "sun"] },
      { word: "banana", definition: "A long yellow fruit that is easy to peel.", emoji: "🍌", syllables: ["ba", "na", "na"], distractors: ["umbrella", "computer", "elephant"] },
    ],
    sentences: [
      { text: "She packed a shiny red ___ for her snack.", answer: "apple", distractors: ["pencil", "window", "ticket"] },
      { text: "He spread butter on a warm piece of ___.", answer: "bread", distractors: ["dress", "clock", "plant"] },
      { text: "She poured cold ___ into her glass.", answer: "milk", distractors: ["silk", "desk", "lamp"] },
      { text: "He cracked an ___ into the pan for breakfast.", answer: "egg", distractors: ["leg", "top", "sun"] },
      { text: "She peeled the ___ before eating it.", answer: "banana", distractors: ["umbrella", "computer", "elephant"] },
    ],
    passage: {
      text: "Ben made breakfast this morning. He cracked an egg into a pan and ate it with warm bread.",
      question: "What did Ben eat with his egg?",
      answer: "warm bread",
      distractors: ["cold milk", "a banana peel", "a red apple"],
    },
  },
];

export function pickFallbackRound(): Round {
  return FALLBACK_ROUNDS[Math.floor(Math.random() * FALLBACK_ROUNDS.length)];
}
