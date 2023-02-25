import Head from 'next/head'
import {Avatar, Box, Stack, Text} from '@chakra-ui/react'
import Layout from '../components/Layout'

const About = () => {
  return (
    <Layout>
      <Head>
        <title>About - FloodFinder</title>
      </Head>
      <Stack
        py={16}
        px={8}
        spacing={{base: 8, md: 10}}
        align='center'
        direction='column'
      >
        <Text textAlign='justify' maxW='4xl'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Box textAlign='center'>
          <Avatar alt='First Last' mb={2} />
          <Text fontWeight={600}>First Last</Text>
          <Text fontSize='sm' color='gray.400'>
            Student
          </Text>
        </Box>
      </Stack>
    </Layout>
  )
}

export default About
