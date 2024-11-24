import { useTheme, Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaymentsIcon from '@mui/icons-material/Payments';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import TodayIcon from '@mui/icons-material/Today';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import WebIcon from '@mui/icons-material/Web';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { GrOrderedList } from 'react-icons/gr';
import { MdKeyboardArrowDown } from "react-icons/md";

function Sidebar() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        height: '100vh',
        width: 256,
        bgcolor: isDark ? 'background.paper' : '#ffffff',
        borderRight: 1,
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        boxShadow: '0 0 10px rgba(0,0,0,0.05)',
      }}
    >
      <Box sx={{ 
        p: 2.5,
        borderBottom: 1, 
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 1,
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="h6" sx={{ color: 'white' }}>D</Typography>
        </Box>
        <Typography variant="h6" sx={{ 
          color: 'text.primary',
          fontWeight: 600,
          letterSpacing: '0.5px'
        }}>
          Dashboard
        </Typography>
      </Box>

      <Box component="nav" sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        <List sx={{ 
          '& .MuiListItem-root': { 
            borderRadius: 1.5,
            mb: 0.5,
            transition: 'all 0.2s ease-in-out' 
          } 
        }}>
          <ListItem
            button
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { 
                bgcolor: 'primary.dark',
                transform: 'translateX(5px)'
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Account Overview" 
              primaryTypographyProps={{ 
                fontSize: '0.95rem',
                fontWeight: 500 
              }}
            />
          </ListItem>

          {[
            { icon: <PaymentsIcon />, text: 'Payouts' },
            { icon: <CardMembershipIcon />, text: 'Certificates' },
            { icon: <LeaderboardIcon />, text: 'Leaderboard' },
            { icon: <GrOrderedList />, text: 'Order List' },
          ].map((item, index) => (
            <ListItem
              button
              key={index}
              sx={{
                color: 'text.primary',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  transform: 'translateX(5px)',
                  '& .MuiListItemIcon-root': { color: 'white' },
                },
              }}
            >
              <ListItemIcon sx={{ color: 'text.primary', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{ 
                  fontSize: '0.95rem',
                  fontWeight: 500 
                }}
              />
            </ListItem>
          ))}

          <Divider sx={{ my: 2.5 }} />
          <Typography 
            variant="caption" 
            sx={{ 
              px: 2, 
              color: 'text.secondary',
              fontWeight: 600,
              letterSpacing: '0.5px'
            }}
          >
            APPS
          </Typography>

          {[
            { icon: <NewspaperIcon />, text: 'News Feed' },
            { icon: <TodayIcon />, text: 'Economic Calendar' },
            { icon: <DevicesOtherIcon />, text: 'WebTrader Platform' },
            { icon: <WebIcon />, text: 'Margin Calculator' },
            { icon: <LeaderboardIcon />, text: 'Profit Calculator' },
          ].map((item, index) => (
            <ListItem
              button
              key={index}
              sx={{
                color: 'text.primary',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  transform: 'translateX(5px)',
                  '& .MuiListItemIcon-root': { color: 'white' },
                },
              }}
            >
              <ListItemIcon sx={{ color: 'text.primary', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{ 
                  fontSize: '0.95rem',
                  fontWeight: 500 
                }}
              />
            </ListItem>
          ))}
        </List>

        <Box sx={{ 
          mt: 3, 
          bgcolor: isDark ? 'background.paper' : '#f8fafc',
          borderRadius: 2,
          p: 2,
          border: 1,
          borderColor: 'divider'
        }}>
          {['Account: 9999999', 'Status: Active', 'Program: $50,000 Evl.'].map((text, index) => (
            <Box
              key={index}
              sx={{
                p: 1.5,
                mb: 1,
                bgcolor: isDark ? 'background.default' : 'background.paper',
                borderRadius: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  transform: 'translateX(5px)'
                },
                color: 'text.primary',
                fontSize: '0.9rem',
                fontWeight: 500
              }}
            >
              {text}
              {index === 0 && <MdKeyboardArrowDown />}
              {index === 1 && (
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'success.main',
                    boxShadow: '0 0 0 2px rgba(46, 204, 113, 0.2)'
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ 
        p: 2, 
        borderTop: 1, 
        borderColor: 'divider',
        bgcolor: isDark ? 'background.paper' : '#f8fafc'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          cursor: 'pointer',
          p: 1,
          borderRadius: 1,
          '&:hover': {
            bgcolor: 'background.default'
          }
        }}>
          <Avatar 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7kSxRPkMCRNFA_90eJNEC-UKSouCd4Reog&s"
            sx={{ 
              width: 40, 
              height: 40,
              border: 2,
              borderColor: 'primary.main'
            }}
          />
          <Box>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                color: 'text.primary',
                fontWeight: 600
              }}
            >
              Daniel Sullivan
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'text.secondary',
                fontSize: '0.8rem'
              }}
            >
              alex@gmail.com
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
