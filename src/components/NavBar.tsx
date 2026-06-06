import { Flex, Text } from '@chakra-ui/react'
import { ColorModeButton } from './ui/color-mode'
import { useNavStore } from '../store/navStore'

// const TABS: Tab[] = ['projects', 'blog']

export default function NavBar() {
  const { activeTab, setActiveTab } = useNavStore()

  return (
    <Flex py={4} align="center">
      <Text
        fontWeight={activeTab === 'home' ? "semibold" : "normal"}
        cursor="pointer"
        onClick={() => setActiveTab('home')}
      >
        Raghav M
      </Text>
      <Flex gap={6} ml="auto" align="center">
        {/* {TABS.map((tab) => (
          <Text
            key={tab}
            cursor="pointer"
            textTransform="capitalize"
            borderBottom={activeTab === tab ? '2px solid currentColor' : '2px solid transparent'}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Text>
        ))} */}
        <ColorModeButton />
      </Flex>
    </Flex>
  )
}
