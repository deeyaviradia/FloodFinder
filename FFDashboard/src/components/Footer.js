import {Box, Text} from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box as='footer' bg='gray.50' color='gray.700' py={4} paddingLeft={4}>
      <Text>© 2021 FloodFinder. All rights reserved</Text>
    </Box>
  )
}

export default Footer
