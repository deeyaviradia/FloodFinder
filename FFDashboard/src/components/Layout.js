import {Box} from '@chakra-ui/layout'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import Navbar from './Navbar'

const Layout = (props) => (
  <Box display='flex' flexDirection='column' minH='100vh'>
    <Header>
      <Navbar />
    </Header>

    <Main>{props.children}</Main>

    <Footer />
  </Box>
)

export default Layout
