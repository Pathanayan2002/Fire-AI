import { useContext } from 'react';
import { Box, IconButton, useTheme, Button, Tooltip } from '@mui/material';
import { IoMdShare } from "react-icons/io"
import { CiDollar } from "react-icons/ci"
import { FaKey } from "react-icons/fa6";
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { ColorModeContext } from '../../theme/ThemeContext';

const Header = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ 
      bgcolor: 'background.paper', 
      borderBottom: 1,
      borderColor: 'divider',
      position: 'sticky',
      top: 0,
      zIndex: 1100,
    }}>
      <Box sx={{ 
        px: 4, 
        py: 2, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
         <h1 className='text-xl font-bold'>Trading</h1>
        <Box sx={{ ml: '290px' }}>
         
          <h1 className={`text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
            Welcome back, Alex
          </h1>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Tooltip title={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
            <IconButton 
              onClick={colorMode.toggleColorMode} 
              sx={{
                bgcolor: 'background.alternate',
                '&:hover': {
                  bgcolor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {isDark ? (
                <LightModeRoundedIcon sx={{ color: 'primary.light' }} />
              ) : (
                <DarkModeRoundedIcon sx={{ color: 'primary.main' }} />
              )}
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            startIcon={<CiDollar />}
            sx={{
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            Request Payout
          </Button>
          <Button
            variant="outlined"
            startIcon={<IoMdShare />}
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                borderColor: 'primary.dark',
                bgcolor: 'background.alternate',
              },
            }}
          >
            Share Matrices
          </Button>
          <IconButton
            sx={{
              bgcolor: 'background.alternate',
              '&:hover': {
                bgcolor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <FaKey className="text-primary" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
