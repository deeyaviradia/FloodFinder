import Head from 'next/head'
import Hero from '../components/Hero'
import Layout from '../components/Layout'

const Index = () => {
  return (
    <Layout>
      <Head>
        <title>Home - FloodFinder</title>
      </Head>
      <Hero />
    </Layout>
  )
}

export default Index
