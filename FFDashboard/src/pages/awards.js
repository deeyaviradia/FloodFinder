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
        <LinkBox as='article' maxW='sm' p='5'  height='500px' borderWidth='1px' rounded='md'>
          <br></br>
          <br></br>
          <Image
            w='350px'
            h='125px'
            objectFit='fit'
            src='/MIT_Solved_logo.png'
            alt='MIT SOLV[ED]'
            
          />
          <br></br>
          <br></br>
          
          <Box as='time' dateTime='2021-01-15 15:30:00 +0000 UTC'>
            2022
          </Box>
          <Heading size='md' my='2'>
              <Link color='blue.500' href='https://garage.hp.com/us/en/impact/hp-girls-save-the-world-finalists.html#:~:text=other%20sustainable%20practices.-,FloodFinder,-(Project%20lead%3A%20Deeya' isExternal> 
                MIT Solv[ED] Youth Innovation Challenge <ExternalLinkIcon mx='2px' />
              </Link> 
          </Heading>
          <Text>
            Finalist of HP’s Girls Save the World  as part of  MIT Solv[ED] Youth Innovation Challenge
          </Text>
        </LinkBox>

        <LinkBox as='article' maxW='sm' p='5'  height='500px' borderWidth='1px' rounded='md'>
          <br></br>
          <Image
            w='150px'
            h='150px'
            objectFit='fit'
            src='/NLI-logo.png'
            alt='NLI'
            mx='90'
          />
          <br></br>
          <br></br>
          <Box as='time' dateTime='2021-01-15 15:30:00 +0000 UTC'>
            2022
          </Box>
          <Heading size='md' my='2'>
              <Link color='blue.500' href='https://www.earthisland.org/' isExternal> 
                John Goddard Prize Winner for Environmental Leadership <ExternalLinkIcon mx='2px' />
              </Link> 
            {/* </LinkOverlay> */}
          </Heading>
          <Text>
            Awarded in recognition of dedication to social and environmental leadership.
          </Text>
        </LinkBox>

        <LinkBox as='article' maxW='sm' p='5'  height='500px' borderWidth='1px' rounded='md'>
          <br></br>
           <br></br>
          <Image
            w='300px'
            h='85px'
            objectFit='fit'
            src='/Action+For+Nature+Logo+Horizontal.png'
            alt='Action+For+Nature+Logo+Horizontal'
          />
          <br></br>
           <br></br>
          <Box as='time' dateTime='2021-01-15 15:30:00 +0000 UTC'>
            2022
          </Box>
          <Heading size='md' my='2'>
              <Link color='blue.500' href='https://actionfornature.org/eco-hero-awards/2022-awards#:~:text=NOTABLES-,Deeya%20Viradia,-Age%2016%0ASan' isExternal> 
                INTERNATIONAL YOUNG ECO-HERO AWARD <ExternalLinkIcon mx='2px' />
              </Link> 
            {/* </LinkOverlay> */}
          </Heading>
          <Text>
            Using established data, Deeya designed a FloodFinder application to be used by citizens and emergency personnel during and after flash flooding with the goal of using real-time data to enable fast action during flood emergencies.
          </Text>
        </LinkBox>

        <LinkBox as='article' maxW='sm' p='5'  height='500px' borderWidth='1px' rounded='md'>
          <Image
            w='185px'
            h='150px'
            objectFit='fit'
            src='/xylem_logo.svg'
            alt='Xylem'
            mx='90'
          />
          <br></br>
          <Box as='time' dateTime='2021-01-15 15:30:00 +0000 UTC'>
            2022
          </Box>
          <Heading size='md' my='2'>
              <Link color='blue.500' href='https://www.xylem.com/en-us/sustainability/community/xylem-ignite/innovation-challenge/?utm_source=Xylem+2022&utm_campaign=62d3b70b52-EMAIL_CAMPAIGN_2020_08_27_09_32_COPY_01&utm_medium=email&utm_term=0_877081c583-62d3b70b52-356117232&mc_cid=62d3b70b52&mc_eid=e4df671f5f' isExternal> 
                Xylem Global Student Innovation Challenge <ExternalLinkIcon mx='2px' />
              </Link> 
          </Heading>
          <Text>
            Awarded 6 Weeks of Entrepreneurship Mentoring.
          </Text>
        </LinkBox>

        <LinkBox as='article' maxW='sm' p='5'  height='500px' borderWidth='1px' rounded='md'>
          <Image
            w='185px'
            h='150px'
            objectFit='fit'
            src='/Congres_Logo.png'
            alt='Congres logo'
            mx='90'
          />
          <br></br>
          <Box as='time' dateTime='2021-01-15 15:30:00 +0000 UTC'>
            2021
          </Box>
          <Heading size='md' my='2'>
              <Link color='blue.500' href='https://static.wixstatic.com/media/93caec_f11846aee2f54c049d59472f5921fe54~mv2.png' isExternal> 
                Congressional Recognition <ExternalLinkIcon mx='2px' />
              </Link> 
          </Heading>
          <Text>
            Awarded for "Congressional App Challenge" in the Congressional Science, Technology, Engineering and Math Academic Competition for High School Students.
          </Text>
        </LinkBox>


        <LinkBox as='article' maxW='sm' p='5'  height='500px' borderWidth='1px' rounded='md'>
          <br></br>
          <Image
            w='300px'
            h='100px'
            objectFit='fit'
            src='/GTI-logo.png'
            alt='GTI'
            mx='5'
          />
          <br></br>
          <br></br>
          
          <Box as='time' dateTime='2021-01-15 15:30:00 +0000 UTC'>
            2020
          </Box>
          <Heading size='md' my='2'>
              <Link color='blue.500' href='https://gt-initiative.org/education-programs/accelerator/' isExternal> 
                 Open17 - Invite to SDG Accelerator program.<ExternalLinkIcon mx='2px' />
              </Link> 
          </Heading>
          <Text>
            
            Students supported by the SDG Accelerator benefit from coaching sessions on the social innovation process. They use their own ideas as case studies for the coaching activities. 
          </Text>
        </LinkBox>

      </SimpleGrid>

      
    
      </Stack>
    </Layout>
  )
}

export default About
