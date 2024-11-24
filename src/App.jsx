import { Box } from '@mui/material';
import Sidebar from './components/layout/Sidebar'
import MainBoard from './components/dashboard/MainBoard'
import Header from './components/layout/header'
import data from './data.json'
import { ThemeContextProvider } from './theme/ThemeContext'

function App() {
  return (
    <ThemeContextProvider>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Header />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <MainBoard chartData={data.chartData} />
          </Box>
        </Box>
      </Box>
    </ThemeContextProvider>
  )
}

export default App