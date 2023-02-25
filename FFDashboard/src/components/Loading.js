import {Center, Text, VStack} from '@chakra-ui/layout'
import {Spinner} from '@chakra-ui/spinner'

const Loading = ({message}) => {
  return (
    <Center height='100%'>
      <VStack spacing={4}>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
        {message && <Text>{message}</Text>}
      </VStack>
    </Center>
  )
}

Loading.defaultProps = {
  message: 'Loading...',
}

export default Loading
