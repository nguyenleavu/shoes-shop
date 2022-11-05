import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { myLoader } from '../components/Product';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import  { removeAll, removeCart } from '../redux/slice/cartSlice';

type Props = {};

const MyBag = (props: Props) => {
    const products = useAppSelector((state) => state.cart.products);
    const dispatch = useAppDispatch();
    const router = useRouter();

    return (
        <div className='hidden lg:block px-40 mt-40'>
            <div className='flex'>
                <div className='flex-1'>
                    <div className='min-h-[320px] pl-4 pr-12'>
                        <h4 className='text-2xl'>Bag</h4>
                        {products.length > 0 ? (
                            products.map((product: any, index) => (
                                <div
                                    key={index}
                                    className='flex justify-between py-4 border-b-[1px] border-b-gray-300 transition-all'
                                >
                                    <div className='flex'>
                                        <div className='pr-4'>
                                            <Image
                                                src={product.image}
                                                alt={product.image}
                                                width={200}
                                                height={200}
                                                className='rounded-lg'
                                                unoptimized={true}
                                                loader={myLoader}
                                            />
                                        </div>
                                        <div className='w-60 flex flex-col justify-between'>
                                            <div>
                                                <h4 className='text-2xl'>
                                                    {product.name}
                                                </h4>
                                                <span className='mt-2 text-gray-400'>
                                                    {product.introduce}
                                                </span>
                                                <p className='mt-2 text-gray-400'>
                                                    {product.colorText}
                                                </p>
                                                <p className='flex text-gray-400'>
                                                    <span>
                                                        Size : {product.size}
                                                    </span>
                                                    <span className='ml-2'>
                                                        Quantity :{' '}
                                                        {product.quantity}
                                                    </span>
                                                </p>
                                            </div>
                                            <div>
                                                <button className='py-3 px-4 transition-colors hover:bg-gray-300 rounded-full'>
                                                    <i className='fa-regular fa-heart text-2xl'></i>
                                                </button>
                                                <button
                                                    className='py-3 px-4 transition-colors hover:bg-gray-300 rounded-full ml-8'
                                                    onClick={() =>
                                                        dispatch(
                                                            removeCart(
                                                                product.id
                                                            )
                                                        )
                                                    }
                                                >
                                                    <i className='fa-sharp fa-solid fa-trash text-2xl'></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <strong className='text-xl font-medium tracking-wider'>
                                        {product.price}$
                                    </strong>
                                </div>
                            ))
                        ) : (
                            <p>There are no items in your bag.</p>
                        )}
                        {products.length > 0 && (
                            <button
                                className='h-10 w-32 rounded-full bg-pink-400 text-white hover:bg-pink-500 transition-colors mt-4'
                                onClick={() => dispatch(removeAll([]))}
                            >
                                Clear All
                            </button>
                        )}
                    </div>
                </div>
                <div className='w-80 min-h-[320px]'>
                    <h4 className='text-2xl'>Summary</h4>
                    <div className='flex justify-between items-center font-medium mt-8'>
                        <p>Subtotal</p>
                        {products && (
                            <span className=' '>
                                {products.reduce((a, b: any) => a + b.price, 0)}
                                $
                            </span>
                        )}
                    </div>
                    <div className='flex justify-between items-center font-medium mt-3 pb-8 border-b-[1px]'>
                        <p>Estimated Delivery & Handling</p>
                        <p>Free</p>
                    </div>
                    <div className='flex justify-between items-center font-medium mt-4 pb-8 border-b-[1px]'>
                        <p className='font-semibold tracking-wider'>Total</p>
                        <p>{products.reduce((a, b: any) => a + b.price, 0)}$</p>
                    </div>
                    <div className='flex items-center justify-center mt-8'>
                        {products.length > 0 ? (
                            <button
                                className='w-full h-16 bg-black text-white dark:bg-white dark:text-black rounded-full font-medium hover:bg-gray-800 dark:hover:bg-neutral-100 transition-colors'
                                onClick={() => router.push('/checkout')}
                            >
                                Guest Checkout
                            </button>
                        ) : (
                            <button
                                className='w-full h-16 bg-black text-white dark:bg-white dark:text-black rounded-full font-medium hover:bg-gray-800 dark:hover:bg-neutral-100 transition-colors'
                                onClick={() => router.push('/man')}
                            >
                                Guest Checkout
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className='my-16'>
                <span className='text-2xl'>Favourites</span>
                <p className='flex'>
                    Want to view your favourites?{' '}
                    <Link href='/register'>
                        <a className='mx-1 underline cursor-pointer text-neutral-600'>
                            Join us
                        </a>
                    </Link>
                    or
                    <Link href='/login'>
                        <a className='mx-1 underline cursor-pointer text-neutral-600'>
                            Sign in
                        </a>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default MyBag;
