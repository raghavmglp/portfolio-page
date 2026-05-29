import { useState } from "react"
import {
  Box,
  Button,
  Dialog,
  Flex,
  Portal,
  Text,
  CloseButton,
} from "@chakra-ui/react"
import { QUIZ_CARDS } from "../data/quizData"

function pickRandom(seen: Set<number>): number {
  const pool = QUIZ_CARDS.map(c => c.id).filter(id => !seen.has(id))
  const source = pool.length > 0 ? pool : QUIZ_CARDS.map(c => c.id)
  return source[Math.floor(Math.random() * source.length)]
}

function Flashcard({ question, answer }: { question: string; answer: string }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <Box
      w="full"
      cursor="pointer"
      onClick={() => setFlipped(f => !f)}
      style={{ perspective: "1000px" }}
    >
      <Box
        w="full"
        position="relative"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.45s",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <Box
          w="full"
          minH="200px"
          p={5}
          border="1px solid"
          borderColor="border"
          bg="bg.subtle"
          display="flex"
          flexDirection="column"
          gap={3}
          style={{ backfaceVisibility: "hidden" }}
        >
          <Text fontSize="xs" color="fg.muted" textTransform="uppercase" letterSpacing="wide">Question</Text>
          <Text fontSize="sm" lineHeight="tall" flex={1} style={{ whiteSpace: "pre-line" }}>{question}</Text>
          <Text fontSize="xs" color="fg.muted">tap to reveal →</Text>
        </Box>

        {/* Back */}
        <Box
          position="absolute"
          inset={0}
          p={5}
          border="1px solid"
          borderColor="border"
          bg="bg.subtle"
          display="flex"
          flexDirection="column"
          gap={3}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <Text fontSize="xs" color="fg.muted" textTransform="uppercase" letterSpacing="wide">Answer</Text>
          <Text fontSize="lg" fontWeight="semibold" flex={1}>{answer}</Text>
          <Text fontSize="xs" color="fg.muted">tap to flip back →</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default function QuizModal() {
  const [seen, setSeen] = useState<Set<number>>(new Set())
  const [currentId, setCurrentId] = useState<number>(() => pickRandom(new Set()))
  const [cardKey, setCardKey] = useState(0)

  const card = QUIZ_CARDS.find(c => c.id === currentId)!
  const remaining = QUIZ_CARDS.length - seen.size

  function handleOpen(open: boolean) {
    if (!open) return
    const newSeen = new Set(seen).add(currentId)
    if (newSeen.size === QUIZ_CARDS.length) newSeen.clear()
    const nextId = pickRandom(newSeen)
    setSeen(new Set(seen).add(currentId))
    setCurrentId(nextId)
    setCardKey(k => k + 1)
  }

  return (
    <Dialog.Root size="md" motionPreset="slide-in-bottom" onOpenChange={d => handleOpen(d.open)}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" borderRadius={0} _dark={{ borderColor: "#434c5e" }}>
          quiz me
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW={{ base: "calc(100vw - 2rem)", md: "lg" }}>
            <Dialog.Header display="flex" alignItems="center" justifyContent="space-between">
              <Flex align="center" gap={3}>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Flex>
            </Dialog.Header>
            <Dialog.Body pb={6}>
              <Flashcard key={cardKey} question={card.question} answer={card.answer} />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
