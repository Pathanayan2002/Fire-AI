import { HiOutlineCash } from "react-icons/hi";
import { CiInboxOut } from "react-icons/ci";
import { HiOutlineChartPie, HiDotsVertical } from "react-icons/hi";
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Card, Stack, Typography, IconButton, Select, MenuItem, useTheme, alpha } from '@mui/material';
import data from '../../data.json';

const TotalProfit = () => {
    const theme = useTheme();
    const { accountOverview } = data;
    const isDark = theme.palette.mode === 'dark';
    
    const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
    const total = accountOverview.mostTraded.length;
    const chartData = accountOverview.mostTraded.map((pair, index) => ({
        id: index,
        value: (1/total) * 100,
        label: pair,
        color: colors[index]
    }));

    return (
        <div className='w-full pb-6'>
            <div className='flex flex-col gap-4 w-full'>
                <div className='grid grid-cols-2 gap-4'>
                    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-3 w-full`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <HiOutlineCash className="text-white text-2xl bg-blue-500 rounded-full p-1" />
                                <div className={`text-sm ${isDark ? 'text-gray-200' : 'text-black'}`}>Profit Target
                                    <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'} block text-xs`}>Of $120,567.50</span>
                                </div>
                            </div>
                            <div className="text-gray-400 cursor-pointer">⋮</div>
                        </div>
                        <div className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-black'} mt-2`}>
                            ${(8908.99).toLocaleString()}
                            <div className="text-sm text-gray-400">
                                <hr className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} my-1.5`} />
                                <span className="text-gray-400 text-xs block">
                                    Enquity Pass Level <span className="text-blue-500 text-xs">$124,900.00</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-3 w-full`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CiInboxOut className="text-white text-2xl bg-orange-500 rounded-full p-1" />
                                <div className={`text-sm ${isDark ? 'text-gray-200' : 'text-gray-500'}`}>Daily Loss Limit
                                    <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'} block text-xs`}>Of $120,567.50</span>
                                </div>
                            </div>
                            <div className="text-gray-400 cursor-pointer">⋮</div>
                        </div>
                        <div className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-black'} mt-2`}>
                            ${(12908.99).toLocaleString()}
                            <div className="text-sm text-gray-400">
                                <hr className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} my-1.5`} />
                                <span className="text-gray-400 text-xs block">
                                    Enquity Breach Level <span className="text-orange-500 text-xs">$124,900.00</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-[0_2px_8px_rgb(0,0,0,0.08)] p-5 w-full border ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                            <div className={`${isDark ? 'bg-gray-700' : 'bg-gradient-to-r from-blue-50 to-indigo-50'} p-2 rounded-lg`}>
                                <HiOutlineChartPie className="text-indigo-600 text-xl" />
                            </div>
                            <div>
                                <h3 className={`${isDark ? 'text-gray-100' : 'text-gray-800'} font-semibold`}>Most Traded</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Trading volume distribution</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <select className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all">
                                <option>This Month</option>
                                <option>Last Month</option>
                            </select>
                            <button className="p-1.5 hover:bg-gray-50 rounded-md transition-colors">
                                <HiDotsVertical className="text-gray-400 text-lg" />
                            </button>
                        </div>
                    </div>

                    {/* Currency Pairs Grid */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="grid grid-cols-3 gap-3 flex-1 min-w-0">
                            {chartData.map((item) => (
                                <div key={item.id} 
                                     className={`flex items-center gap-2 p-2 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} rounded-md transition-colors cursor-pointer group overflow-hidden`}
                                >
                                    <div className="w-1 h-3.5 rounded-sm flex-shrink-0" 
                                         style={{ backgroundColor: item.color }} 
                                    />
                                    <span className={`text-xs font-medium ${isDark ? 'text-gray-300 group-hover:text-gray-100' : 'text-gray-600 group-hover:text-gray-800'} uppercase truncate`}>
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className={`flex items-center ${isDark ? 'bg-gray-700' : 'bg-blue-50'} rounded-lg px-3 py-2`}>
                            <div className="flex items-center gap-2">
                                <div className="text-xs text-gray-500">Total</div>
                                <div className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>{chartData.length}</div>
                            </div>
                        </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="relative flex justify-center mt-4">
                        <div className="relative w-[250px]">
                            <PieChart
                                series={[
                                    {
                                        data: chartData,
                                        highlightScope: { faded: 'global', highlighted: 'item' },
                                        faded: { innerRadius: 30, additionalRadius: -30 },
                                        startAngle: -90,
                                        endAngle: 90,
                                        innerRadius: 55,
                                        outerRadius: 75,
                                        paddingAngle: 1,
                                    },
                                ]}
                                height={140}
                                width={250}
                                legend={{ hidden: true }}
                                margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="text-xs text-gray-500 mb-0.5">Trading Volume</div>
                                <div className="text-base font-semibold text-gray-800">
                                    {chartData.length} pairs
                                </div>
                                <div className="text-xs text-gray-400 mt-0.5">Active now</div>
                            </div>
                        </div>
                        
                        {/* Volume Indicators */}
                        <div className="absolute -bottom-1 w-full flex justify-between px-8">
                            <div className="text-xs text-gray-500">
                                <span className="font-medium text-gray-800">24.5K</span> min
                            </div>
                            <div className="text-xs text-gray-500">
                                <span className="font-medium text-gray-800">165.3K</span> max
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalProfit;
