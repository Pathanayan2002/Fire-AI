import { HiOutlineCash } from "react-icons/hi";
import { CiInboxOut } from "react-icons/ci";
import { HiOutlineChartPie, HiDotsVertical } from "react-icons/hi";
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Card, Stack, Typography, IconButton, Select, MenuItem, useTheme, alpha } from '@mui/material';
import data from '../../data.json';

const TotalProfit = () => {
    const theme = useTheme();
    const { accountOverview } = data;
    
    const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
    const total = accountOverview.mostTraded.length;
    const chartData = accountOverview.mostTraded.map((pair, index) => ({
        id: index,
        value: (1/total) * 100,
        label: pair,
        color: colors[index]
    }));

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: '3xl' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
                {/* Profit Target Card */}
                <Card sx={{ p: 3, borderRadius: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Box sx={{ 
                                p: 1, 
                                borderRadius: '50%', 
                                bgcolor: 'primary.main'
                            }}>
                                <HiOutlineCash style={{ fontSize: 24, color: 'white' }} />
                            </Box>
                            <Box>
                                <Typography variant="body2" color="text.primary">
                                    Profit Target
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Of $120,567.50
                                </Typography>
                            </Box>
                        </Stack>
                        <IconButton size="small">
                            <HiDotsVertical />
                        </IconButton>
                    </Stack>

                    <Typography variant="h5" sx={{ mt: 2, fontWeight: 600 }}>
                        ${(8908.99).toLocaleString()}
                    </Typography>
                    <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                        <Typography variant="caption" color="text.secondary">
                            Enquity Pass Level{' '}
                            <Typography component="span" variant="caption" color="primary.main">
                                $124,900.00
                            </Typography>
                        </Typography>
                    </Box>
                </Card>

                {/* Daily Loss Limit Card */}
                <Card sx={{ p: 3, borderRadius: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Box sx={{ 
                                p: 1, 
                                borderRadius: '50%', 
                                bgcolor: 'warning.main'
                            }}>
                                <CiInboxOut style={{ fontSize: 24, color: 'white' }} />
                            </Box>
                            <Box>
                                <Typography variant="body2" color="text.primary">
                                    Daily Loss Limit
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Of $120,567.50
                                </Typography>
                            </Box>
                        </Stack>
                        <IconButton size="small">
                            <HiDotsVertical />
                        </IconButton>
                    </Stack>

                    <Typography variant="h5" sx={{ mt: 2, fontWeight: 600 }}>
                        ${(12908.99).toLocaleString()}
                    </Typography>
                    <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                        <Typography variant="caption" color="text.secondary">
                            Enquity Breach Level{' '}
                            <Typography component="span" variant="caption" color="warning.main">
                                $124,900.00
                            </Typography>
                        </Typography>
                    </Box>
                </Card>
            </Box>

            {/* Most Traded Card */}
            <Card sx={{ p: 3, borderRadius: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{ 
                            p: 1.5, 
                            borderRadius: 2,
                            bgcolor: theme.palette.mode === 'dark' 
                                ? alpha(theme.palette.primary.main, 0.2)
                                : alpha(theme.palette.primary.main, 0.1)
                        }}>
                            <HiOutlineChartPie style={{ 
                                fontSize: 20,
                                color: theme.palette.primary.main
                            }} />
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" fontWeight={600}>
                                Most Traded
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Trading volume distribution
                            </Typography>
                        </Box>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                        <Select
                            size="small"
                            defaultValue="thisMonth"
                            sx={{ 
                                minWidth: 120,
                                '& .MuiSelect-select': { py: 1 }
                            }}
                        >
                            <MenuItem value="thisMonth">This Month</MenuItem>
                            <MenuItem value="lastMonth">Last Month</MenuItem>
                        </Select>
                        <IconButton size="small">
                            <HiDotsVertical />
                        </IconButton>
                    </Stack>
                </Stack>

                {/* Currency Pairs Grid */}
                <Stack direction="row" spacing={3} alignItems="center" mb={3}>
                    <Box sx={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 2,
                        flex: 1
                    }}>
                        {chartData.map((item) => (
                            <Box
                                key={item.id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    p: 1,
                                    borderRadius: 1,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        bgcolor: alpha(theme.palette.primary.main, 0.05)
                                    }
                                }}
                            >
                                <Box sx={{ 
                                    width: 4,
                                    height: 16,
                                    borderRadius: 1,
                                    bgcolor: item.color
                                }} />
                                <Typography 
                                    variant="caption" 
                                    sx={{ 
                                        fontWeight: 500,
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    {item.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    <Box sx={{ 
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.1)
                    }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="caption" color="text.secondary">
                                Total
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                                {chartData.length}
                            </Typography>
                        </Stack>
                    </Box>
                </Stack>

                {/* Pie Chart */}
                <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Box sx={{ position: 'relative', width: 250 }}>
                        <PieChart
                            series={[{
                                data: chartData,
                                highlightScope: { faded: 'global', highlighted: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -30 },
                                startAngle: -90,
                                endAngle: 90,
                                innerRadius: 55,
                                outerRadius: 75,
                                paddingAngle: 1,
                            }]}
                            height={140}
                            width={250}
                            legend={{ hidden: true }}
                            margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                        />
                        <Box sx={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Typography variant="caption" color="text.secondary">
                                Trading Volume
                            </Typography>
                            <Typography variant="subtitle1" fontWeight={600} sx={{ my: 0.5 }}>
                                {chartData.length} pairs
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Active now
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{
                        position: 'absolute',
                        bottom: -4,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        px: 4
                    }}>
                        <Typography variant="caption" color="text.secondary">
                            <Typography component="span" variant="caption" fontWeight={600}>
                                24.5K
                            </Typography>
                            {' '}min
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            <Typography component="span" variant="caption" fontWeight={600}>
                                165.3K
                            </Typography>
                            {' '}max
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};

export default TotalProfit;
