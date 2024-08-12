import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuImagePlus } from 'react-icons/lu';

const AddProduct = () => {
  const categories = [
    {
      id: 1,
      name: 'Sports',
    },
    {
      id: 2,
      name: 'T-shirt',
    },
    {
      id: 3,
      name: 'Phone',
    },
    {
      id: 4,
      name: 'Computer',
    },
    {
      id: 5,
      name: 'Watch',
    },
    {
      id: 6,
      name: 'Pants',
    },
  ];

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
  const [allCategory, setAllCategory] = useState(categories);
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
  const [images, setImages] = useState([]);
  const [imagesShow, setImagesShow] = useState([]);
  const imageHandler = (e) => {
    const files = e.target.files;
    const length = files.length;
    if (length > 0) {
      setImages([...images, ...files]);
    }
  };
  console.log(images);

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[20px] font-bold mb-3 text-indigo-700'>
        Add Product
      </h1>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-lg'>
        <div className='flex justify-end items-center pb-4'>
          <Link className='bg-indigo-600 hover:shadow-indigo-700/50 hover:shadow-lg text-indigo-100 rounded-lg px-7 py-2 my-2'>
            All products
          </Link>
        </div>
        <div>
          <form>
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
                    {allCategory.map((c, i) => (
                      <span
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
              <label
                htmlFor='image'
                className='flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-orange-500 w-full text-indigo-100'
              >
                <span>
                  <LuImagePlus size={28} />
                </span>
                <span>Select image</span>
              </label>
              <input
                multiple
                type='file'
                name='image'
                id='image'
                onChange={imageHandler}
                className='hidden'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
