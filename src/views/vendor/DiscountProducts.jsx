import React, { useState } from 'react';
import Search from '../components/Search';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { MdDeleteOutline, MdOutlineEditNote } from 'react-icons/md';
import { LuPackageSearch } from 'react-icons/lu';

const DiscountProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [perPage, setPerPage] = useState(5);
  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[20px] font-bold mb-3 text-indigo-700'>
        Discount Products
      </h1>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <Search
          setPerPage={setPerPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />
        <div className='relative overflow-x-auto mt-5'>
          <table className='w-full text-sm text-left text-[#d0d2d6]  '>
            <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
              <tr className=''>
                <th scope='col' className='py-3 px-4'>
                  No
                </th>
                <th scope='col' className='py-3 px-4'>
                  Image
                </th>
                <th scope='col' className='py-3 px-4'>
                  Name
                </th>
                <th scope='col' className='py-3 px-4'>
                  Category
                </th>
                <th scope='col' className='py-3 px-4'>
                  Brand
                </th>
                <th scope='col' className='py-3 px-4'>
                  Price
                </th>
                <th scope='col' className='py-3 px-4'>
                  Discount
                </th>
                <th scope='col' className='py-3 px-4'>
                  Stock
                </th>
                <th scope='col' className='py-3 px-4'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className=''>
              {[1, 2, 3, 4, 5].map((d, i) => (
                <tr key={i} className=''>
                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    {d}
                  </td>
                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    <img
                      src={`http://localhost:3000/images/category/${d}.jpg`}
                      alt='Product image.'
                      className='w-[45px] h-[45px] rounded-lg'
                    />
                  </td>
                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    Men full sleeve
                  </td>
                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    Item name
                  </td>
                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    Veirdo
                  </td>
                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    $320
                  </td>
                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    10%
                  </td>
                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    23
                  </td>

                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    <div className='flex justify-start items-center gap-4'>
                      <Link className='p-[6px] rounded-lg bg-transparent hover:shadow-lg hover:shadow-s/50 hover:text-indigo-800'>
                        <MdOutlineEditNote size={24} />
                      </Link>
                      <Link className='p-[6px] rounded-lg bg-transparent hover:shadow-lg hover:shadow-s/50 hover:text-indigo-800'>
                        <LuPackageSearch size={24} />
                      </Link>
                      <Link className='p-[6px] rounded-lg bg-transparent hover:shadow-lg hover:shadow-s/50 hover:text-indigo-800'>
                        <MdDeleteOutline size={24} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={50}
            perPage={perPage}
            showItem={3}
          />
        </div>
      </div>
    </div>
  );
};

export default DiscountProducts;
