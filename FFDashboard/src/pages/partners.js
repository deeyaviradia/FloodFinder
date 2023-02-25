import Head from 'next/head'
import {SimpleGrid } from '@chakra-ui/react'
import {Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import {Box, Image, Stack, Text, Link, Divider, Heading, LinkBox} from '@chakra-ui/react'
import {  List,  ListItem,  ListIcon,  OrderedList,  UnorderedList} from '@chakra-ui/react'
import Layout from '../components/Layout'
import NextLink from 'next/link'
import { ExternalLinkIcon } from '@chakra-ui/icons'


const About = () => {
  return (
    <Layout>
      <Head>
        <title>News & Awards - FloodFinder</title>
      </Head>
      <Stack
        py={16}
        px={8}
        spacing={{base: 8, md: 10}}
        align='center'
        direction='column'
      >


         <SimpleGrid spacing={4} columns={2}>
        <LinkBox as='article' maxW='sm' p='5'  height='150px' borderWidth='1px' rounded='md'>
          <Image
            w='175px'
            h='125px'
            objectFit='fit'
            src='/Code4SanJoseLogo.png'
            alt='Code 4 SanJose'
            mx='50'
          />
          <br></br>
          
          <Heading size='sm' my='2'>
                
          </Heading>
          
        </LinkBox>

        <LinkBox as='article' maxW='sm' p='5'  height='150px' borderWidth='1px' rounded='md'>
          <Image
            w='300px'
            h='100px'
            objectFit='fit'
            src='/Crowd4SDG.png'
            alt='Crowd4SDG'
            mx='5'
          />
          <br></br>
          <br></br>
             <Heading size='sm' my='2'>
                
          </Heading>
        </LinkBox>


      </SimpleGrid>

      
    
      </Stack>
    </Layout>
  )
}

export default About
