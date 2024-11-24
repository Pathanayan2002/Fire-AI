import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TablePagination,
  useTheme,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import data from '../../data.json';

const OrderList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ 
      p: 3, 
      backgroundColor: 'background.paper',
      borderRadius: 2,
      transition: 'all 0.2s ease-in-out'
    }}>
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 3, 
          fontWeight: 'bold',
          color: 'text.primary',
          transition: 'color 0.2s ease-in-out'
        }}
      >
        Order History
      </Typography>
      <TableContainer 
        component={Paper} 
        sx={{ 
          boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.25)' : 3,
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor: 'background.paper',
          transition: 'all 0.2s ease-in-out'
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ 
              backgroundColor: isDark ? 'primary.dark' : 'primary.main',
              '& th': { 
                fontWeight: 'bold',
                fontSize: '0.875rem',
                color: 'white',
                borderBottom: 'none'
              }
            }}>
              <TableCell>Symbol</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Open Date</TableCell>
              <TableCell>Open Price</TableCell>
              <TableCell>Close Date</TableCell>
              <TableCell>Close Price</TableCell>
              <TableCell>Lots</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Profit/Loss</TableCell>
              <TableCell>Gain</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.orderHistory
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order, index) => (
                <TableRow 
                  key={index}
                  sx={{ 
                    '&:nth-of-type(odd)': { 
                      backgroundColor: isDark 
                        ? 'rgba(255, 255, 255, 0.05)' 
                        : theme.palette.grey[50] 
                    },
                    '&:hover': { 
                      backgroundColor: isDark 
                        ? 'rgba(255, 255, 255, 0.1)' 
                        : theme.palette.action.hover,
                      transition: 'background-color 0.2s ease'
                    },
                    cursor: 'pointer',
                    '& td': {
                      color: 'text.primary',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                    }
                  }}
                >
                  <TableCell sx={{ fontWeight: 500 }}>{order.symbol}</TableCell>
                  <TableCell>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      color: order.type === 'Buy' 
                        ? theme.palette.success.main 
                        : theme.palette.error.main
                    }}>
                      {order.type === 'Buy' ? (
                        <TrendingUpIcon fontSize="small" />
                      ) : (
                        <TrendingDownIcon fontSize="small" />
                      )}
                      {order.type}
                    </Box>
                  </TableCell>
                  <TableCell>{order.openDate}</TableCell>
                  <TableCell>{order.openPrice}</TableCell>
                  <TableCell>{order.closeDate}</TableCell>
                  <TableCell>{order.closePrice}</TableCell>
                  <TableCell>{order.lots}</TableCell>
                  <TableCell>{order.duration}</TableCell>
                  <TableCell 
                    sx={{ 
                      color: order.profit >= 0 
                        ? theme.palette.success.main 
                        : theme.palette.error.main,
                      fontWeight: 'bold'
                    }}
                  >
                    ${order.profit.toFixed(2)}
                  </TableCell>
                  <TableCell
                    sx={{ 
                      color: order.gain.includes('+') 
                        ? theme.palette.success.main 
                        : theme.palette.error.main,
                      fontWeight: 'bold'
                    }}
                  >
                    {order.gain}
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.orderHistory.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : theme.palette.divider}`,
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : theme.palette.grey[50],
            color: 'text.primary',
            '& .MuiTablePagination-select': {
              borderRadius: 1,
              backgroundColor: 'background.paper'
            },
            '& .MuiTablePagination-selectIcon': {
              color: 'text.primary'
            }
          }}
        />
      </TableContainer>
    </Box>
  );
};

export default OrderList;
