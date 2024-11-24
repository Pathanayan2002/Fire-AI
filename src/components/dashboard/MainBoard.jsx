import BalanceChart from './BalanceChart';
import TotalProfit from './totalProfit';
import NotificationCards from './notification';
import OrderList from './OrderList';
export default function MainBoard({ chartData }) {
  return (
    <>
    <div className='flex  gap-4 w-full max-w-[68rem] h-[120px] p-6 lg:ml-64'>
      <div className='flex flex-col gap-4 w-[50rem]'>
              <BalanceChart chartData={chartData} />
          </div>
          <div className='flex flex-col gap-4'>
        <TotalProfit />

      </div>
    </div>
      <div className='flex flex-col gap-4 w-full max-w-[68rem] h-[120px] p-6 lg:ml-64 mt-[26rem] '>
         <div className='flex flex-col gap-4 w-[65rem] mb-10'>
        <NotificationCards />
        </div>
      
    </div>
         <div className='flex flex-col gap-4 w-full max-w-[68rem] h-[120px] p-6 lg:ml-64 mt-[20rem] '>
          <OrderList />
        </div> 
    </>
  );
}