import {ChakraProvider} from '@chakra-ui/react'
import {SWRConfig} from 'swr'
import fetcher from '../utils/fetcher'

function MyApp({Component, pageProps}) {
  return (
    <ChakraProvider resetCSS>
      <SWRConfig
        value={{
          fetcher: fetcher,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </ChakraProvider>
  )
}

export default MyApp
