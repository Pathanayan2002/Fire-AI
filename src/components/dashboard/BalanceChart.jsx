import { Card, Typography, Box, Stack, IconButton, Menu, MenuItem } from '@mui/material';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { motion } from 'framer-motion';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.95)',
          p: 2,
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          border: '1px solid rgba(0,0,0,0.05)'
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
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
        position: 'relative',
        overflow: 'visible'
      }}>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h5" gutterBottom sx={{ 
                fontWeight: 600,
                background: 'linear-gradient(45deg, #1976D2, #2E7D32)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
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
            filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.1))',
            backgroundColor: '#ffffff',
            borderRadius: 1,
            border: '1px solid rgba(0,0,0,0.1)',
            backgroundImage: 'linear-gradient(0deg, rgba(248,249,250,1) 0%, rgba(255,255,255,1) 100%)',
            '& .recharts-cartesian-grid-horizontal line, .recharts-cartesian-grid-vertical line': {
              stroke: 'rgba(0,0,0,0.07)',
            },
            '& .recharts-cartesian-axis-line': {
              stroke: 'rgba(0,0,0,0.2)',
            },
            '& .recharts-cartesian-axis-tick-line': {
              stroke: 'rgba(0,0,0,0.2)',
            },
            '& .recharts-default-tooltip': {
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }
          }}>
            <ResponsiveContainer>
              <ComposedChart
                data={formattedChartData}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <defs>
                  {/* Shadow filter for the blue line */}
                  <filter id="blueGlow" height="300%" width="300%" x="-100%" y="-100%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  {/* Shadow filter for the red line */}
                  <filter id="redGlow" height="300%" width="300%" x="-100%" y="-100%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  {/* Grid pattern */}
                  <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                    <rect width="80" height="80" fill="#f8f9fa"/>
                    <rect width="80" height="80" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
                    <line x1="0" y1="40" x2="80" y2="40" stroke="rgba(0,0,0,0.03)" strokeWidth="1"/>
                    <line x1="40" y1="0" x2="40" y2="80" stroke="rgba(0,0,0,0.03)" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={true} 
                  horizontal={true}
                  stroke="rgba(0,0,0,0.07)"
                />
                <XAxis 
                  dataKey="date"
                  axisLine={true}
                  tickLine={true}
                  tick={{ fill: '#666', fontSize: 12 }}
                  stroke="rgba(0,0,0,0.2)"
                />
                <YAxis 
                  axisLine={true}
                  tickLine={true}
                  tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                  tick={{ fill: '#666', fontSize: 12 }}
                  stroke="rgba(0,0,0,0.2)"
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