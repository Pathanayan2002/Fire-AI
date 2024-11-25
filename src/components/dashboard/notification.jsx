import { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  IconButton, 
  Select, 
  MenuItem, 
  useTheme,
  Card,
  Stack,
  alpha 
} from '@mui/material';
import { HiExclamationCircle } from 'react-icons/hi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaTrophy, FaChartLine, FaPercentage, FaBalanceScale, FaChartBar, FaExchangeAlt } from 'react-icons/fa';
import data from '../../data.json';

const StatCard = ({ icon: Icon, title, value, percentage, trend }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Card
      elevation={0}
      sx={{
        p: 1,
        borderRadius: 2,
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
          borderColor: 'primary.main',
        }
      }}
    >
      <Box sx={{ 
        position: 'absolute',
        top: 0,
        right: 0,
        width: 80,
        height: 80,
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
        borderBottomLeftRadius: '100%',
        zIndex: 0
      }} />
      
      <Stack spacing={1} sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ 
            p: 1,
            borderRadius: 2,
            bgcolor: isDark ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.primary.main, 0.1)
          }}>
            <Icon style={{ 
              fontSize: 20,
              color: theme.palette.primary.main
            }} />
          </Box>
          {percentage !== undefined && (
            <Typography
              variant="body2"
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 5,
                bgcolor: percentage > 0 
                  ? alpha(theme.palette.success.main, 0.1)
                  : alpha(theme.palette.error.main, 0.1),
                color: percentage > 0 
                  ? theme.palette.success.main
                  : theme.palette.error.main,
                fontWeight: 600
              }}
            >
              {percentage > 0 ? '+' : ''}{percentage}%
            </Typography>
          )}
        </Box>

        <Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="h5" sx={{ 
            color: 'text.primary',
            fontWeight: 700,
            letterSpacing: '-0.5px'
          }}>
            {value}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};

const NotificationCards = () => {
    const theme = useTheme();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const notifications = data.notifications;
    const totalPages = Math.ceil(notifications.length / itemsPerPage);
    const [timeRange, setTimeRange] = useState('30');

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentNotifications = notifications.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <Box sx={{ display: 'flex', gap: 4 }}>
            {/* Stats Cards Grid */}
            <Box sx={{ width: '50%' }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
                    <StatCard
                        icon={FaTrophy}
                        title="Average Win"
                        value="$642.00"
                        percentage={7.2}
                        trend={true}
                    />
                    <StatCard
                        icon={FaChartLine}
                        title="Average Loss"
                        value="$0.00"
                        percentage={0}
                        trend={true}
                    />
                    <StatCard
                        icon={FaPercentage}
                        title="Profit Factor"
                        value="6.4"
                        trend={true}
                    />
                    <StatCard
                        icon={FaChartBar}
                        title="Best Trade"
                        value="$8,908.99"
                        percentage={12.3}
                        trend={true}
                    />
                    <StatCard
                        icon={FaBalanceScale}
                        title="Win Ratio"
                        value="67.5%"
                        percentage={5.8}
                        trend={true}
                    />
                    <StatCard
                        icon={FaExchangeAlt}
                        title="Risk Reward"
                        value="1:2.5"
                        trend={true}
                    />
                </Box>
            </Box>

            {/* Notifications Table */}
            <Box sx={{ width: '50%' }}>
                <Card sx={{ p: 3, borderRadius: 3 }}>
                    {/* Header */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Box sx={{ 
                                p: 1,
                                borderRadius: 2,
                                bgcolor: theme.palette.mode === 'dark' 
                                    ? alpha(theme.palette.error.main, 0.2)
                                    : alpha(theme.palette.error.main, 0.1)
                            }}>
                                <HiExclamationCircle style={{ 
                                    fontSize: 24,
                                    color: theme.palette.error.main
                                }} />
                            </Box>
                            <Box>
                                <Typography variant="h6" color="text.primary" fontWeight={600}>
                                    Notifications
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Recent alerts and updates
                                </Typography>
                            </Box>
                        </Stack>
                        
                        <Select
                            size="small"
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            sx={{ 
                                minWidth: 130,
                                '& .MuiSelect-select': {
                                    py: 1,
                                    fontSize: '0.875rem'
                                }
                            }}
                        >
                            <MenuItem value="30">Last 30 Days</MenuItem>
                            <MenuItem value="7">Last 7 Days</MenuItem>
                            <MenuItem value="1">Today</MenuItem>
                        </Select>
                    </Stack>

                    {/* Notifications List */}
                    <Stack spacing={1}>
                        {currentNotifications.map((notification, index) => (
                            <Paper
                                key={index}
                                elevation={0}
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    border: `1px solid ${theme.palette.divider}`,
                                    '&:hover': {
                                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                                        borderColor: 'primary.main'
                                    }
                                }}
                            >
                                <Stack direction="row" spacing={2}>
                                    <Box sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        bgcolor: 'error.main',
                                        mt: 1
                                    }} />
                                    <Box sx={{ flex: 1 }}>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body2" color="text.primary" fontWeight={500}>
                                                {notification.message}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {notification.time}
                                            </Typography>
                                        </Stack>
                                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                                            {notification.type}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>
                        ))}
                    </Stack>

                    {/* Pagination */}
                    <Stack 
                        direction="row" 
                        justifyContent="space-between" 
                        alignItems="center"
                        sx={{ 
                            mt: 3, 
                            pt: 2, 
                            borderTop: `1px solid ${theme.palette.divider}` 
                        }}
                    >
                        <Typography variant="caption" color="text.secondary">
                            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, notifications.length)} of {notifications.length}
                        </Typography>
                        
                        <Stack direction="row" spacing={1}>
                            <IconButton 
                                size="small"
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                disabled={currentPage === 1}
                                sx={{ 
                                    color: 'text.secondary',
                                    '&.Mui-disabled': {
                                        color: 'action.disabled'
                                    }
                                }}
                            >
                                <IoIosArrowBack />
                            </IconButton>
                            
                            {[...Array(totalPages)].map((_, index) => (
                                <IconButton
                                    key={index}
                                    size="small"
                                    onClick={() => setCurrentPage(index + 1)}
                                    sx={{
                                        minWidth: 32,
                                        color: currentPage === index + 1 ? 'primary.main' : 'text.secondary',
                                        bgcolor: currentPage === index + 1 ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                                        '&:hover': {
                                            bgcolor: currentPage === index + 1 
                                                ? alpha(theme.palette.primary.main, 0.2)
                                                : alpha(theme.palette.action.hover, 0.1)
                                        }
                                    }}
                                >
                                    {index + 1}
                                </IconButton>
                            ))}
                            
                            <IconButton 
                                size="small"
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                disabled={currentPage === totalPages}
                                sx={{ 
                                    color: 'text.secondary',
                                    '&.Mui-disabled': {
                                        color: 'action.disabled'
                                    }
                                }}
                            >
                                <IoIosArrowForward />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Card>
            </Box>
        </Box>
    );
};

export default NotificationCards;
