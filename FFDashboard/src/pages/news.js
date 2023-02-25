import Head from 'next/head'
import {SimpleGrid } from '@chakra-ui/react'
import {Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import {Box, Image, Stack, Text, Link, Divider, Heading, LinkBox} from '@chakra-ui/react'
import {  List,  ListItem,  ListIcon,  OrderedList,  UnorderedList,} from '@chakra-ui/react'
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
        <LinkBox as='article' maxW='sm' p='5'  height='500px' borderWidth='1px' rounded='md'>
          
          <Image
            w='250px'
            h='150px'
            objectFit='fit'
            src='/CrowdSDG.png'
            alt='CrowdSDG'
            mx='30'
            
          />
          <br></br>
          <Box as='time' dateTime='2021-01-15 15:30:00 +0000 UTC'>
            Francois Grey @ UNECE Side Event, Geneva 
            <br></br>6 April 2022
          </Box>
          <Heading size='md' my='2'>
              <Link color='blue.500' href='https://www.unitar.org/sites/default/files/media/file/Crowd4SDG%20Innovation%20Process%20%28GEAR%20Cycle%29_Francois%20Grey.pdf' isExternal> 
                The Crowd4SDG Innovation Process (GEAR Cycle) <ExternalLinkIcon mx='2px' />
              </Link> 
            {/* </LinkOverlay> */}
          </Heading>
          <Text>
            The overall aim of the Crowd4SDG project is to explore and assess whether, to what degree and according to which scientific standards citizen science can contribute to the twin tasks of:
              <UnorderedList>
                <ListItem>tracking progress towards the SDGs</ListItem>
                <ListItem>generating grassroots innovation that enable such progress</ListItem>
              </UnorderedList>
          </Text>
        </LinkBox>

        <LinkBox as='article' maxW='sm' p='5'  height='500px' borderWidth='1px' rounded='md'>
          <br></br>
          <Image
            w='250px'
            h='100px'
            objectFit='fit'
            src='/3BL_CSR_WIRE.png'
            alt='3BL_CSR_WIRE'
            mx='30'
          />
          <br></br>
          <br></br>
          <Box as='time' dateTime='2021-01-15 15:30:00 +0000 UTC'>
            SUBMITTED BY HP INC<br></br>
            2 June 2022
          </Box>
          <Heading size='md' my='2'>
              <Link color='blue.500' href='https://www.csrwire.com/press_releases/746191-meet-girls-who-are-saving-world#:~:text=other%20sustainable%20practices.-,FloodFinder,-(Project%20lead%3A%20Deeya' isExternal> 
                Meet the Girls Who Are Saving the World <ExternalLinkIcon mx='2px' />
              </Link> 
            {/* </LinkOverlay> */}
          </Heading>
          <Text>
            Launched as part of the MIT Solv[ED] Youth Innovation Challenge, the Girls Save the World program invited girls ages 13 to 18 to submit their ideas for solving an environmental or societal challenge in their community by using technology.
          </Text>
        </LinkBox>

        <LinkBox as='article' maxW='sm' p='5'  height='500px' borderWidth='1px' rounded='md'>
          <br></br>
          <Image
            w='250px'
            h='125px'
            objectFit='fit'
            src='/KRON4.png'
            alt='KRON4'
            mx='30'
          />
          <br></br>
          <Box as='time' dateTime='2021-01-15 15:30:00 +0000 UTC'>
            Amy Larson<br></br>
            12 April 2022
          </Box>
          <Heading size='md' my='2'>
              <Link color='blue.500' href='https://www.kron4.com/news/bay-area/san-jose-high-school-student-designs-flood-tracker/' isExternal> 
                San Jose high school student designs flood tracker <ExternalLinkIcon mx='2px' />
              </Link> 
            {/* </LinkOverlay> */}
          </Heading>
          <Text>
            A San Jose high school student who designed a real-time flood tracker was chosen as one of 10 finalists for HP’s “Girls Save The World” campaign.
          </Text>
        </LinkBox>

        <LinkBox as='article' maxW='sm' p='5'  height='500px' borderWidth='1px' rounded='md'>
          <Image
            w='200px'
            h='150px'
            objectFit='fit'
            src='/Wow.png'
            alt='Wow!'
            mx='90'
          />
          <br></br>
          <Box as='time' dateTime='2021-01-15 15:30:00 +0000 UTC'>
            Alastair Macdonald <br></br>
            26 August 2022
          </Box>
          <Heading size='md' my='2'>
              <Link color='blue.500' href='https://www.wow-news.eu/posts/summer-series-4-deeya-and-the-art-of-invention' isExternal> 
                Summer Series #4: Deeya and the art of invention <ExternalLinkIcon mx='2px' />
              </Link> 
            {/* </LinkOverlay> */}
          </Heading>
          <Text>
            "She could get computers to recognize when the cameras were showing flood water in the streets and then alert people to the danger."
          </Text>
        </LinkBox>

        <LinkBox as='article' maxW='sm' p='5'  height='500px' borderWidth='1px' rounded='md'>
          <Image
            w='170px'
            h='150px'
            objectFit='fit'
            src='/adsabs.harvard.edu_logo.svg'
            alt='adsabs.harvard.edu'
            mx='90'
          />
          <br></br>
          <Box as='time' dateTime='2021-01-15 15:30:00 +0000 UTC'>
            AGU Fall Meeting, New Orleans, LA <br></br>
            Fall 2021
          </Box>
          <Heading size='md' my='2'>
              <Link color='blue.500' href='https://ui.adsabs.harvard.edu/abs/2021AGUFM.A44C..08V/abstract' isExternal> 
                Publication Abstract @ adsabs.harvard.edu <ExternalLinkIcon mx='2px' />
              </Link> 
          </Heading>
          <Text>
            Resolve lack of real time flood information using traffic cameras feeds and applying Mask R-CNN region based convolutional neural network to detect flooded areas and the water height in urban cities. This leverage existing infrastructure and resources such as traffic camera to detect floods in real time which ease the cost on cities for a quick adoption.
          </Text>
        </LinkBox>

      </SimpleGrid>

      </Stack>
    </Layout>
  )
}

export default About
