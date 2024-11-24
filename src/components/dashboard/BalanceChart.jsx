import { Card, Typography, Box, Stack, IconButton, Menu, MenuItem } from '@mui/material';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

const CustomTooltip = ({ active, payload, label }) => {
  const theme = useTheme();
  
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: theme.palette.background.paper,
          p: 2,
          borderRadius: 2,
          boxShadow: theme.palette.mode === 'dark' 
            ? '0 4px 20px rgba(0,0,0,0.5)'
            : '0 4px 20px rgba(0,0,0,0.1)',
          border: `1px solid ${theme.palette.divider}`
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Day {label}
        </Typography>
        {payload.map((entry, index) => (
          <Box key={index} sx={{ my: 0.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: entry.color
                }}
              />
              <Typography variant="body2" sx={{ color: '#666' }}>
                {entry.name}:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                ${Number(entry.value).toLocaleString()}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    );
  }
  return null;
};

const BalanceEquityChart = ({ chartData }) => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState('1M');
  const [anchorEl, setAnchorEl] = useState(null);

  const generateChartData = () => {
    return chartData.dates.map((date, index) => ({
      date,
      balance: chartData.balances[index],
      equity: chartData.equity[index]
    }));
  };

  const getCurrentBalance = () => {
    return chartData.balances[chartData.balances.length - 1];
  };

  const getCurrentEquity = () => {
    return chartData.equity[chartData.equity.length - 1];
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    handleClose();
  };

  const formattedChartData = generateChartData();
  const currentEquity = getCurrentEquity();
  const currentBalance = getCurrentBalance();
  const initialEquity = chartData.equity[0];
  const equityChange = ((currentEquity - initialEquity) / initialEquity * 100).toFixed(2);
  const isPositiveChange = equityChange >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ 
        p: 3, 
        borderRadius: 3,
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(145deg, rgba(30,30,30,0.8) 0%, rgba(20,20,20,1) 100%)'
          : theme.palette.background.paper,
        position: 'relative',
        overflow: 'visible'
      }}>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h5" gutterBottom sx={{ 
                fontWeight: 600,
                color: theme.palette.primary.main
              }}>
                Total Balance
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {isPositiveChange ? (
                  <TrendingUpIcon sx={{ color: '#2E7D32' }} />
                ) : (
                  <TrendingDownIcon sx={{ color: '#D32F2F' }} />
                )}
                <Typography 
                  variant="body1" 
                  sx={{
                    color: isPositiveChange ? '#2E7D32' : '#D32F2F',
                    fontWeight: 500
                  }}
                >
                  {isPositiveChange ? '+' : ''}{equityChange}%
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  Balance
                </Typography>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600,
                  color: '#2196F3'
                }}>
                  ${currentBalance.toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  Equity
                </Typography>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600,
                  color: '#FF4444'
                }}>
                  ${currentEquity.toLocaleString()}
                </Typography>
              </Box>
              <IconButton onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {['1W', '1M', '3M', '6M', '1Y', 'ALL'].map((range) => (
              <MenuItem 
                key={range}
                onClick={() => handleTimeRangeChange(range)}
                selected={timeRange === range}
              >
                {range}
              </MenuItem>
            ))}
          </Menu>

          <Box sx={{ 
            width: '100%', 
            height: 350, 
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            borderRadius: 1,
            border: `1px solid ${theme.palette.divider}`,
            '& .recharts-cartesian-grid-horizontal line, .recharts-cartesian-grid-vertical line': {
              stroke: theme.palette.divider,
            },
            '& .recharts-cartesian-axis-line': {
              stroke: theme.palette.divider,
            },
            '& .recharts-cartesian-axis-tick-line': {
              stroke: theme.palette.divider,
            },
            '& .recharts-text': {
              fill: theme.palette.text.secondary,
            }
          }}>
            <ResponsiveContainer>
              <ComposedChart
                data={formattedChartData}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <defs>
                  <pattern 
                    id="grid" 
                    width="80" 
                    height="80" 
                    patternUnits="userSpaceOnUse"
                  >
                    <rect 
                      width="80" 
                      height="80" 
                      fill={theme.palette.background.paper}
                    />
                    <rect 
                      width="80" 
                      height="80" 
                      fill="none" 
                      stroke={theme.palette.divider} 
                      strokeWidth="1"
                    />
                    <line 
                      x1="0" y1="40" x2="80" y2="40" 
                      stroke={theme.palette.divider} 
                      strokeWidth="1"
                    />
                    <line 
                      x1="40" y1="0" x2="40" y2="80" 
                      stroke={theme.palette.divider} 
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={true} 
                  horizontal={true}
                  stroke={theme.palette.divider}
                />
                <XAxis 
                  dataKey="date"
                  axisLine={true}
                  tickLine={true}
                  tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                  stroke={theme.palette.divider}
                />
                <YAxis 
                  axisLine={true}
                  tickLine={true}
                  tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                  tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                  stroke={theme.palette.divider}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="equity"
                  stroke="#FF4444"
                  strokeWidth={2.5}
                  dot={false}
                  style={{ filter: 'url(#redGlow)' }}
                />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#2196F3"
                  strokeWidth={2.5}
                  dot={false}
                  style={{ filter: 'url(#blueGlow)' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Box>
        </Stack>
      </Card>
    </motion.div>
  );
};

export default BalanceEquityChart;