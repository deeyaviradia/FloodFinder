import {Alert, AlertIcon} from '@chakra-ui/alert'
import {Heading, Stack} from '@chakra-ui/layout'
import {Image} from '@chakra-ui/image'
import {Skeleton} from '@chakra-ui/skeleton'
import useImagesForCamera from '../hooks/useImagesForCamera'

const CameraPopup = ({lat, long}) => {
  const {data, isLoading, isError} = useImagesForCamera(lat, long)

  if (isLoading) {
    return (
      <Stack>
        <Skeleton height={19} width={170} />
        <Skeleton height={170} width={170} />
        <Skeleton height={170} width={170} />
      </Stack>
    )
  }

  if (isError) {
    return (
      <Alert status='error'>
        <AlertIcon />
        An error has occurred. Please try again later.
      </Alert>
    )
  }

  return (
    <>
      <Heading as='h5' size='sm' marginBottom={3} maxWidth={170}>
        {data.images[0].caption}
      </Heading>
      <Stack direction='column' spacing={3}>
        <Image src={data.images[0].filePath} boxSize={170} objectFit='cover' />
        {data.images[0].analyzedFilePath && (
          <Image
            src={data.images[0].analyzedFilePath}
            boxSize={170}
            objectFit='cover'
          />
        )}
      </Stack>
    </>
  )
}

export default CameraPopup
