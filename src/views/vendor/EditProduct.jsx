import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCategories } from '../../store/Reducers/categoryReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearMessages,
  get_product,
  edit_product,
} from '../../store/Reducers/productReducer';
import { overrideStyle } from './../../utils/utils';
import { PropagateLoader } from 'react-spinners';
import toast from 'react-hot-toast';

const EditProduct = () => {
  const { productId } = useParams();

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { product, loader, successMessage, errorMessage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(
      getCategories({
        page: '',
        perPage: '',
        searchValue: '',
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(get_product(productId));
  }, [dispatch, productId]);

  const [state, setState] = useState({
    name: '',
    description: '',
    discount: '',
    price: '',
    brand: '',
    stock: '',
  });

  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState('');
  const [allCategory, setAllCategory] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      let srcValue = allCategory.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(srcValue);
    } else {
      setAllCategory(categories);
    }
  };

  const [imagesShow, setImagesShow] = useState([]);

  const changeImage = (img, files) => {
    if (files.length > 0) {
      console.log(img);
      console.log(files[0]);
    }
  };

  useEffect(() => {
    setState({
      name: product.name || '',
      description: product.description || '',
      discount: product.discount || '',
      price: product.price || '',
      brand: product.brand || '',
      stock: product.stock || '',
    });
    setCategory(product.category || '');
    setImagesShow(product.images || []);
  }, [product]);

  useEffect(() => {
    if (categories.length > 0) {
      setAllCategory(categories);
    }
  }, [categories]);

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

  const update = (e) => {
    e.preventDefault();
    const obj = {
      name: state.name,
      description: state.description,
      discount: state.discount,
      price: state.price,
      brand: state.brand,
      stock: state.stock,
      productId: productId,
    };
    dispatch(edit_product(obj));
  };

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[20px] font-bold mb-3 text-indigo-700'>
        Edit Product
      </h1>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-lg'>
        <div className='flex justify-end items-center pb-4'>
          <Link
            to='/vendor/dashboard/all-products'
            className='bg-indigo-600 hover:shadow-indigo-700/50 hover:shadow-lg text-indigo-100 rounded-lg px-7 py-2 my-2'
          >
            All products
          </Link>
        </div>
        <div>
          <form onSubmit={update}>
            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-indigo-100'>
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='name'>Product name</label>
                <input
                  onChange={inputHandler}
                  value={state.name}
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Product name'
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-indigo-600 border border-slate-700 rounded-lg text-indigo-100'
                />
              </div>
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='brand'>Brand name</label>
                <input
                  onChange={inputHandler}
                  value={state.brand}
                  type='text'
                  name='brand'
                  id='brand'
                  placeholder='Brand name'
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-indigo-600 border border-slate-700 rounded-lg text-indigo-100'
                />
              </div>
            </div>
            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-indigo-100'>
              <div className='flex flex-col w-full gap-1 relative'>
                <label htmlFor='category'>Category</label>
                <input
                  readOnly
                  onClick={() => setCateShow(!cateShow)}
                  onChange={inputHandler}
                  value={category}
                  type='text'
                  name='category'
                  id='category'
                  placeholder='--select category--'
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-indigo-600 border border-slate-700 rounded-lg text-indigo-100'
                />
                <div
                  className={`absolute top-[101%] bg-indigo-600 rounded-lg w-full transition-all ${
                    cateShow ? 'scale-100' : 'scale-0'
                  }`}
                >
                  <div className='w-full px-4 py-2 fixed'>
                    <input
                      value={searchValue}
                      onChange={categorySearch}
                      type='text'
                      placeholder='Search...'
                      className='px-3 py-1 focus:border-indigo-500 outline-none bg-indigo-400 border border-slate-700 rounded-lg text-indigo-700  overflow-hidden'
                    />
                  </div>
                  <div className='pt-14'></div>
                  <div className='flex justify-start items-start flex-col h-[200px] overflow-x-hidden'>
                    {allCategory.length > 0 &&
                      allCategory.map((c, i) => (
                        <span
                          key={c.name}
                          className={`px-4 py-2 hover:bg-indigo-500 hover:text-indigo-50 hover:shadow-lg w-full cursor-pointer ${
                            category === c.name && 'bg-indigo-500'
                          }`}
                          onClick={() => {
                            setCateShow(false);
                            setCategory(c.name);
                            setSearchValue('');
                            setAllCategory(categories);
                          }}
                        >
                          {c.name}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='stock'>Stock</label>
                <input
                  onChange={inputHandler}
                  value={state.stock}
                  type='text'
                  name='stock'
                  id='stock'
                  placeholder='Stock'
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-indigo-600 border border-slate-700 rounded-lg text-indigo-100'
                />
              </div>
            </div>
            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-indigo-100'>
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='price'>Price</label>
                <input
                  onChange={inputHandler}
                  value={state.price}
                  type='number'
                  name='price'
                  id='price'
                  placeholder='Price'
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-indigo-600 border border-slate-700 rounded-lg text-indigo-100'
                />
              </div>
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='discount'>Discount</label>
                <input
                  onChange={inputHandler}
                  value={state.discount}
                  type='number'
                  name='discount'
                  id='discount'
                  placeholder='Discount by %'
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-indigo-600 border border-slate-700 rounded-lg text-indigo-100'
                />
              </div>
            </div>
            <div className='flex flex-col w-full gap-1 mb-5'>
              <label className='text-indigo-100' htmlFor='description'>
                Description
              </label>
              <textarea
                onChange={inputHandler}
                value={state.description}
                name='description'
                id='description'
                placeholder='Description...'
                className='px-4 py-2 focus:border-indigo-500 outline-none bg-indigo-600 border border-slate-700 rounded-lg text-indigo-100'
                cols='10'
                rows='4'
              ></textarea>
            </div>
            <div className='grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-indigo-100 mb-4'>
              {imagesShow &&
                imagesShow.length > 0 &&
                imagesShow.map((img, i) => (
                  <div key={i}>
                    <label htmlFor={i}>
                      <img
                        src={img}
                        alt={`${img.description || `Product Image ${i + 1}`}`}
                      />
                    </label>
                    <input
                      onChange={(e) => changeImage(img, e.target.files)}
                      type='file'
                      id={i}
                      className='hidden'
                    />
                  </div>
                ))}
            </div>
            <div>
              <button
                disabled={loader}
                aria-busy={loader}
                className={`bg-indigo-600 text-white rounded-lg py-2 px-7 my-2 ${
                  loader
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:bg-indigo-400 hover:shadow-indigo-400/40 hover:shadow-md cursor-pointer'
                }`}
              >
                {loader ? (
                  <div className='flex justify-center w-36 items-center'>
                    <PropagateLoader color='#fff' cssOverride={overrideStyle} />
                  </div>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
