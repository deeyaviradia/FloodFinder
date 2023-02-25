import {
  Box,
  Collapse,
  Flex,
  IconButton,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import {HamburgerIcon, CloseIcon} from '@chakra-ui/icons'
import Logo from './Logo'
import Link from './Link'
import ROUTES from '../constants/routes'

const WithSubnavigation = () => {
  const {isOpen, onToggle} = useDisclosure()

  return (
    <Box as='nav'>
      <Flex
        align='center'
        bg='white'
        borderBottom={1}
        borderColor='gray.200'
        borderStyle='solid'
        minH='60px'
        px={{base: 4}}
        py={{base: 2}}
      >
        <Flex
          flex={{base: 1, md: 'auto'}}
          ml={{base: -2}}
          display={{base: 'flex', md: 'none'}}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant='ghost'
            aria-label='Toggle Navigation'
          />
        </Flex>
        <Flex
          flex={{base: 1, sm: 'initial'}}
          justify={{base: 'center', md: 'start'}}
        >
          <Logo />

          <Flex
            alignItems='center'
            display={{base: 'none', md: 'flex'}}
            ml={10}
          >
            <DesktopNav />
          </Flex>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}

const DesktopNav = () => {
  return (
    <Stack direction='row' spacing={4}>
      {ROUTES.map((route) => (
        <Link p={2} href={route.href} key={route.label}>
          {route.label}
        </Link>
      ))}
    </Stack>
  )
}

const MobileNav = () => {
  return (
    <Stack
      bg='white'
      p={4}
      display={{md: 'none'}}
      borderBottom='1px'
      borderBottomColor='gray.200'
    >
      {ROUTES.map((route) => (
        <MobileNavItem key={route.label} {...route} />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({label, href}) => {
  return (
    <Stack spacing={4}>
      <Flex
        py={2}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Link p={2} href={href}>
          {label}
        </Link>
      </Flex>
    </Stack>
  )
}

export default WithSubnavigation
