// import React, { useState } from 'react';
// import Accordion from '../component/Accordion';
// import { Typography } from 'antd';
// import Search from 'antd/es/input/Search';

// const ReportPage = () => {
//   const [searchText, setSearchText] = useState('')

//   return (
//     <div className='space-y-2'>
//       <div className='flex justify-between'>
//         <Typography.Title level={3}>Report</Typography.Title>
//         <div>
//           <Search
//             placeholder='Customer or Table'
//             value={searchText}
//             onChange={e => setSearchText(e.target.value)}
//           />
//         </div>
//       </div>
//       <div className='grid grid-cols-7 border p-3 text-center rounded-md bg-primary text-white font-semibold'>
//         <h1>Date</h1>
//         <h1>Customer</h1>
//         <h1>Table</h1>
//         <h1>Items</h1>
//         <h1>Qty</h1>
//         <h1>Restaurants</h1>
//         <h1>Total</h1>
//       </div>
//       <div className='overflow-auto'>
//         <Accordion />
//       </div>
//     </div>
//   );
// };

// export default ReportPage;

// ReportPage.js
import React, { useState } from 'react';
import Accordion from '../component/Accordion';
import { Typography } from 'antd';
// import { Search } from 'antd';
import Search from 'antd/es/input/Search';


const ReportPage = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <div className='space-y-2'>
      <div className='flex justify-between'>
        <Typography.Title level={3}>Report</Typography.Title>
        <div>
          <Search
            placeholder='Customer or Table'
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <div className='grid grid-cols-7 border p-3 text-center rounded-md bg-primary text-white font-semibold'>
        <h1>Date</h1>
        <h1>Customer</h1>
        <h1>Table</h1>
        <h1>Items</h1>
        <h1>Qty</h1>
        <h1>Restaurants</h1>
        <h1>Total</h1>
      </div>
      <div className='overflow-auto'>
        <Accordion searchText={searchText} />
      </div>
    </div>
  );
};

export default ReportPage;
