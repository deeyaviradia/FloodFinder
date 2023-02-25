import NextLink from 'next/link'
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  Wrap,
  WrapItem,
  Link,
  SimpleGrid,
  LinkBox
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import {useMemo} from 'react'
import dynamic from 'next/dynamic'
import Loading from './Loading'
import YoutubeEmbed from "./YoutubeVideo";

const WaterBlob = (props) => {
  return (
    <Icon
      width='100%'
      viewBox='0 0 578 440'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z'
        fill='currentColor'
      />
    </Icon>
  )
}

const Hero = () => {
  const LeafletMap = useMemo(
    () =>
      dynamic(() => import('../components/LeafletMap'), {
        loading: () => <Loading message='Loading map...' />,
        // Disable server-side rendering for leaflet because the library doesn't support it.
        ssr: false,
      }),
    []
  )

  return (
    <Container maxW='8xl' pt={10}>
      <Stack
        align='center'
        spacing={{base: 8, md: 10}}
        m={{base: 20, md: 28}}
        direction='column'
      >
        <Stack direction={{base: 'column', md: 'row'}} height={340}>
          <Stack flex={1} spacing={{base: 5, md: 10}}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{base: '3xl', sm: '4xl', lg: '6xl'}}
            >
              <Text as='span' color='blue.500'>
                Locate floods and automate the response !
              </Text>
            </Heading>
            <Text color='gray.500'>
            FloodFinder is an early action system using real time traffic and private cameras(e.g. ring doorbell) feeds to detect floods.  
            </Text>
            <Stack
              spacing={{base: 4, sm: 6}}
              direction={{base: 'column', sm: 'row'}}
            ></Stack>
          </Stack>
          <Flex flex={1} position='relative' w='full'>
            <WaterBlob
              w='150%'
              h='150%'
              position='absolute'
              top='-50%'
              left={0}
              zIndex={-1}
              color='blue.100'
            />
            <Box
              position='relative'
              height='300px'
              rounded='2xl'
              boxShadow='2xl'
              width='full'
              overflow='hidden'
            >
              <Image
                alt='Hero Image'
                fit='cover'
                align='center'
                w='100%'
                h='100%'
                src='/cover-photo.jpg'
              />
            </Box>
          </Flex>
        </Stack>
        
        {/* <Container
          id='map'
          height={700}
          width='100%'
          maxWidth='100%'
          p={0}
          borderWidth={2}
          mb={250}
        >
          <LeafletMap />
        </Container> */}
        <Container id='about' width='100%' maxWidth='100%' p={0} mt={250}>
          <Stack
            py={16}
            px={8}
            spacing={{base: 8, md: 10}}
            align='center'
            direction='column'
          >
            <Text textAlign='justify' maxW='4xl'>
            As humans continue to pour greenhouse gases into the atmosphere, oceans have tempered the effect. The world's seas have absorbed more than 90 percent of the heat from these gases, but it’s taking a toll on our oceans. Average sea levels have swelled over 8 inches since 1880, with about three of those inches gained in the last 25 years. Sea level rise driven by climate change is making wetlands wetter in many parts of the world. Even in states where the long-term mean precipitation hasn’t changed, in most cases the wettest events have intensified.
            </Text>
            <Text textAlign='justify' maxW='4xl'>
            In 2017, San Jose was hit with heavy rain that resulted in creeks and reservoirs overflowing that overwhelmed the area. The flood resulted in $100 million in economic losses and 14,000 people displaced. The biggest issue during the 2017 flood was the city’s failure to notify its residents that their neighborhoods were under imminent danger of flooding. By the time San Jose put an evacuation order into place, many residents were already standing waist-deep in water. Since 1950, the city has dealt with 13 floods, and the absence of any warning has remained a consistent issue due to the lack of real-time flood data. 
            </Text>
            <Text textAlign='justify' maxW='4xl'>
            The Early Action system is an adaptive measure for climate change and an important component of disaster risk management strategies. To resolve this lack of real time data/information issue, I am proposing the implementation of the FloodFinder project which applies deep learning algorithms to traffic and private camera feeds. 
            </Text>
            <Text textAlign='justify' maxW='4xl'>
            1. Deep learning algorithms are used on the traffic and private (ring bell) camera feeds to calculate water surface area in each frame to determine the difference between puddles and water accumulations. 
            </Text>
            <Text textAlign='justify' maxW='4xl'>
            2. Citizens can view the dashboard with map layers to see all the camera locations and real time feeds with a percentage calculated by the AI to determine the water surface area. It will also show city owned water manholes and the water pipes to help city officials direct the water drainage during flash flooding.
            </Text>
            <Text textAlign='justify' maxW='4xl'>
            3. It seeks to develop Urban Water Resilience in San Jose and work toward achieving the targets set in five different Sustainable Development Goals: SDG 9 “Industry, Innovation, and Infrastructure”, SDG 11 “Sustainable cities and communities”, SDG 13 “Climate actions”, and SDG 15 “Life on land”.  
            </Text>

            <Text textAlign='justify' maxW='4xl'>
            San Jose city map showcases the near real time traffic camera feeds with layered drain pipes and storm holes. This holistic layered map portrays where the water on the streets would drain and the direction in which the water in these drain pipes will flow.
            </Text>

            <Text textAlign='justify' maxW='4xl'>
            The color of traffic camera icons on the map is proportional to the flooded water area in the picture taken by the camera. We leverage advanced computer vision science like image segmentation to process and analyze the picture from near real time camera feed. A well trained Panoptic image segmentation model is used to differentiate the water logged areas in the camera picture and mask it with different colors to quickly display it. This algorithm also calculates the percentage of water covered area to raise appropriate warning levels.
            </Text>

            <Text textAlign='justify' maxW='4xl'>
            For the demonstration purpose we have populated real traffic camera images captured from different traffic cameras in the US. We have purposefully used a few water logged images to showcase how the traffic camera icons on the map would exhibit in various colors. When clicked on these cameras, a captured image is shown. If the water has accumulated enough, the camera icon will not be Blue in color and will show regular and segmented images. This will help the consumer to access the situation rapidly.
            </Text>

            <Container id='video' width='100%' maxWidth='100%' p={0} mt={250}>
              <Stack
                py={16}
                px={8}
                spacing={{base: 3, md: 10}}
                align='center'
                direction='column'
              >
                <div className="App">
                  <YoutubeEmbed embedId="VJhmUoSImUM" />
                </div>
              </Stack>
            </Container>
            <Box textAlign='center'>
              
              <Wrap>
                <WrapItem>
                  &nbsp;<Avatar size="xl" name='Deeya Viradia' src="https://floodfinder.org/pic/Deeya.jpg" />{" "}
                </WrapItem>
              </Wrap>
              <Heading size='md' my='2' mx="-4">
                <Link color='blue.400' href='https://deeyaviradia.com' isExternal> 
                    Deeya Viradia 
                    <ExternalLinkIcon mx='2px' />
                </Link> 
              </Heading>
              {/* <Text fontWeight={600}>Deeya Viradia</Text> */}
              <Text fontSize='sm' color='gray.400'>
                Student
              </Text>
            </Box>
          </Stack>
        </Container>
        <Box pb={10}>
          <NextLink href='/map' passHref>
            <Button as='a' colorScheme='blue' px={6} rounded='full' size='lg'>
              View map
            </Button>
          </NextLink>
        </Box>

     
      </Stack>
    </Container>
  )
}

export default Hero
