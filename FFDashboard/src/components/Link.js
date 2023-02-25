import NextLink from 'next/link'
import {Button} from '@chakra-ui/react'

const Link = ({href, children, ...rest}) => {
  return (
    <NextLink href={href ?? '/'} passHref>
      <Button
        as='a'
        colorScheme='blue'
        px={2}
        py={1}
        rounded={'md'}
        variant='ghost'
        {...rest}
      >
        {children}
      </Button>
    </NextLink>
  )
}

export default Link
