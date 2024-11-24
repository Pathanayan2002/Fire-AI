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
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const notifications = data.notifications;
    const totalPages = Math.ceil(notifications.length / itemsPerPage);

    // Get current notifications
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentNotifications = notifications.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="flex gap-8">
            {/* Stats Cards Grid */}
            <div className="w-1/2">
                <div className="grid grid-cols-2 gap-6">
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
                </div>
            </div>

            {/* Notifications Table */}
            <div className="w-1/2">
                <div className="bg-white rounded-xl shadow-[0_2px_8px_rgb(0,0,0,0.08)] p-5 border border-gray-100">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-2 rounded-lg">
                                <HiExclamationCircle className="text-red-500 text-xl" />
                            </div>
                            <div>
                                <h3 className="text-gray-800 font-semibold">Notifications</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Recent alerts and updates</p>
                            </div>
                        </div>
                        <select className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all">
                            <option>Last 30 Days</option>
                            <option>Last 7 Days</option>
                            <option>Today</option>
                        </select>
                    </div>

                    {/* Notifications List */}
                    <div className="space-y-3">
                        {currentNotifications.map((notification, index) => (
                            <div 
                                key={index}
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
                            >
                                <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-800 font-medium">
                                            {notification.message}
                                        </p>
                                        <span className="text-xs text-gray-500">
                                            {notification.time}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-500 mt-0.5 block">
                                        {notification.type}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                        <div className="text-xs text-gray-500">
                            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, notifications.length)} of {notifications.length}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`p-1.5 rounded-md transition-all ${
                                    currentPage === 1
                                        ? 'text-gray-300 cursor-not-allowed'
                                        : 'text-gray-500 hover:bg-gray-100'
                                }`}
                            >
                                <IoIosArrowBack className="text-lg" />
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`w-8 h-8 rounded-md text-sm transition-all ${
                                        currentPage === index + 1
                                            ? 'bg-red-50 text-red-600 font-medium'
                                            : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`p-1.5 rounded-md transition-all ${
                                    currentPage === totalPages
                                        ? 'text-gray-300 cursor-not-allowed'
                                        : 'text-gray-500 hover:bg-gray-100'
                                }`}
                            >
                                <IoIosArrowForward className="text-lg" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationCards;
