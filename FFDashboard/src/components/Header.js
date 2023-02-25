import {Box} from '@chakra-ui/react'

const Header = (props) => {
  return (
    <Box
      as='header'
      bgColor='white'
      pos='fixed'
      top={0}
      w='100%'
      zIndex={1}
      {...props}
    />
  )
}

export default Header
