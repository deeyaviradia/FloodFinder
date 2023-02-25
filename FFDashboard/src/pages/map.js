import Head from 'next/head'
import dynamic from 'next/dynamic'
import {Container} from '@chakra-ui/layout'
import {useMemo} from 'react'
import Layout from '../components/Layout'
import Loading from '../components/Loading'

const Map = () => {
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
    <Layout>
      <Head>
        <title>Map - FloodFinder</title>
      </Head>
      <Container
        height='calc(100vh - 60px - 56px)'
        width='100%'
        maxWidth='100%'
        alignContent='center'
        m={0}
        p={0}
      >
        <LeafletMap />
      </Container>
    </Layout>
  )
}

export default Map
