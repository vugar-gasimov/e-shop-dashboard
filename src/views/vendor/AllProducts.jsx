import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import toast from 'react-hot-toast';

import { MdDeleteOutline, MdOutlineEditNote } from 'react-icons/md';
import { LuPackageSearch } from 'react-icons/lu';
import { BsCardImage } from 'react-icons/bs';

import Pagination from '../Pagination';
import { overrideStyle } from '../../utils/utils';
import Search from '../components/Search';
import {
  clearMessages,
  get_products,
} from '../../store/Reducers/productReducer';

const AllProducts = () => {
  const dispatch = useDispatch();
  const { products, totalProducts, loader, errorMessage, successMessage } =
    useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_products(obj));
  }, [dispatch, currentPage, searchValue, perPage]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearMessages());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(clearMessages());
    }
  }, [dispatch, successMessage, errorMessage]);

  if (loader) {
    return (
      <div>
        {' '}
        <PropagateLoader color='#D1D5DB' cssOverride={overrideStyle} />
      </div>
    );
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[20px] font-bold mb-3 text-indigo-700'>
        All Products
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
              {products.map((d, i) => (
                <tr key={i} className=''>
                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    {i + 1 + (currentPage - 1) * perPage}
                  </td>
                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    <img
                      src={d.images[0]}
                      alt={`Product ${d.name} img`}
                      className='w-[45px] h-[45px] object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'
                    />
                  </td>
                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    {d?.name?.length > 15
                      ? `${d.name.substring(0, 12)}...`
                      : d.name}
                  </td>
                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    {d.category}
                  </td>
                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    {d.brand}
                  </td>
                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    ${d.price}
                  </td>
                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    {d.discount === 0 ? (
                      <span>No Discount</span>
                    ) : (
                      <span>{d.discount}%</span>
                    )}
                  </td>
                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    {d.stock}
                  </td>

                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    <div className='flex justify-start items-center gap-4'>
                      <Link
                        to={`/vendor/dashboard/edit-product/${d._id}`}
                        className='p-[6px] rounded-lg bg-transparent hover:shadow-lg hover:shadow-s/50 hover:text-indigo-800'
                      >
                        <MdOutlineEditNote size={24} />
                      </Link>
                      <Link className='p-[6px] rounded-lg bg-transparent hover:shadow-lg hover:shadow-s/50 hover:text-indigo-800'>
                        <LuPackageSearch size={24} />
                      </Link>
                      <Link className='p-[6px] rounded-lg bg-transparent hover:shadow-lg hover:shadow-s/50 hover:text-indigo-800'>
                        <MdDeleteOutline size={24} />
                      </Link>
                      <Link
                        to={`/vendor/dashboard/add-banner/${d._id}`}
                        className='p-[6px] rounded-lg bg-transparent hover:shadow-lg hover:shadow-s/50 hover:text-indigo-800'
                      >
                        <BsCardImage size={24} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalProducts <= perPage ? (
          ''
        ) : (
          <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalProducts}
              perPage={perPage}
              showItem={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
