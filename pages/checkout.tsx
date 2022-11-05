import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Loader from '../components/Loader';
import { myLoader } from '../components/Product';
import { addOrder } from '../firebase/firebase';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { removeAll } from '../redux/slice/cartSlice';
import { v4 } from 'uuid';

type Props = {};

const CheckOut = (props: Props) => {
    const products = useAppSelector((state) => state.cart.products);
    const userId = useAppSelector((state) => state.auth.userID);
    const dispatch = useAppDispatch();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [street, setStreet] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const date = new Date();
        var current_date =
            date.getFullYear() +
            '-' +
            (date.getMonth() + 1) +
            '-' +
            date.getDate();
        const order = {
            name,
            userId,
            phone,
            houseNumber,
            street,
            date: current_date,
            district,
            city,
            fullAddress,
            products,
            price: products.reduce((a, b: any) => a + b.price, 0),
            id: v4(),
            status: 'Ordered',
        };
        addOrder(order, setLoading);
        setName('');
        setPhone('');
        setHouseNumber('');
        setStreet('');
        setDistrict('');
        setCity('');
        setFullAddress('');
        dispatch(removeAll([]));
    };
    return (
        <>
            {loading && <Loader />}
            {products.length > 0 ? (
                <div className='flex justify-center py-16'>
                    <div className='w-2/6 '>
                        <h2 className='text-4xl font-semibold tracking-wider'>
                            Checkout Details
                        </h2>
                        <form
                            onSubmit={handleSubmit}
                            className='mt-4 border-[1px] border-gray-300 rounded-xl p-4'
                        >
                            <h2 className='text-3xl font-medium tracking-wide'>
                                Shipping Address
                            </h2>
                            <div className='mt-4 font-medium'>
                                <p>Recipient Name :</p>
                                <input
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder='Recipient Name'
                                    className='border-gray-200 border-2 w-full h-10 px-2 rounded-lg mt-2 dark:bg-gray-900 dark:border-gray-700'
                                />
                            </div>
                            <div className='mt-4 font-medium'>
                                <p>Phone :</p>
                                <input
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder='Phone'
                                    className='border-gray-200 border-2 w-full h-10 px-2 rounded-lg mt-2 dark:bg-gray-900 dark:border-gray-700'
                                />
                            </div>
                            <div className='mt-4 font-medium'>
                                <p>House number :</p>
                                <input
                                    required
                                    value={houseNumber}
                                    onChange={(e) =>
                                        setHouseNumber(e.target.value)
                                    }
                                    placeholder='House number'
                                    className='border-gray-200 border-2 w-full h-10 px-2 rounded-lg mt-2 dark:bg-gray-900 dark:border-gray-700'
                                />
                            </div>
                            <div className='mt-4 font-medium'>
                                <p>Street :</p>
                                <input
                                    required
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                    placeholder='Street'
                                    className='border-gray-200 border-2 w-full h-10 px-2 rounded-lg mt-2 dark:bg-gray-900 dark:border-gray-700'
                                />
                            </div>
                            <div className='mt-4 font-medium'>
                                <p>District :</p>
                                <input
                                    required
                                    placeholder='District'
                                    value={district}
                                    onChange={(e) =>
                                        setDistrict(e.target.value)
                                    }
                                    className='border-gray-200 border-2 w-full h-10 px-2 rounded-lg mt-2 dark:bg-gray-900 dark:border-gray-700'
                                />
                            </div>
                            <div className='mt-4 font-medium'>
                                <p>City :</p>
                                <input
                                    required
                                    placeholder='City'
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className='border-gray-200 border-2 w-full h-10 px-2 rounded-lg mt-2 dark:bg-gray-900 dark:border-gray-700'
                                />
                            </div>
                            <div className='mt-4 font-medium'>
                                <p>Full Address :</p>
                                <input
                                    required
                                    value={fullAddress}
                                    onChange={(e) =>
                                        setFullAddress(e.target.value)
                                    }
                                    placeholder='Address'
                                    className='border-gray-200 border-2 w-full h-10 px-2 rounded-lg mt-2 dark:bg-gray-900 dark:border-gray-700'
                                />
                            </div>
                            <div className=' flex items-center justify-center h-20'>
                                <button
                                    type='submit'
                                    className='h-10 w-32 rounded-full bg-black text-white hover:bg-slate-700 transition-colors dark:bg-white dark:text-black dark:hover:bg-slate-100 font-medium'
                                >
                                    Checkout
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className='w-2/6 border-[1px] border-gray-300 rounded-xl p-4 mt-14 mx-4'>
                        <h2 className='text-3xl font-medium tracking-wide'>
                            Checkout Summary
                        </h2>
                        <p className='mt-2 font-normal text-gray-500'>
                            Cart items(s) : <span>{products.length}</span>
                        </p>
                        <div className='flex items-center justify-between'>
                            <p className='text-xl font-medium'>Subtotal :</p>
                            <span className='text-2xl tracking-wide text-pink-400'>
                                $
                                {products.reduce((a, b: any) => a + b.price, 0)}
                            </span>
                        </div>
                        <div className='mt-4'>
                            {products.map((product: any, index) => (
                                <div
                                    key={index}
                                    className='border-[1px] border-gray-300 rounded-lg p-4 mb-2'
                                >
                                    <h3 className='font-medium text-xl'>
                                        {product.name}
                                    </h3>
                                    <div className='mt-4 flex justify-between'>
                                        <div>
                                            <p className='text-base'>
                                                Quantity : {product.quantity}
                                            </p>
                                            <p className='text-base'>
                                                Unit Price : ${product.price}
                                            </p>
                                            <p className='text-base'>
                                                Set Price : ${product.price}
                                            </p>
                                        </div>
                                        <div>
                                            <Image
                                                loader={myLoader}
                                                src={product.image}
                                                alt={product.name}
                                                width={80}
                                                height={80}
                                                unoptimized={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className='h-[60.5vh] flex items-center flex-col py-16'>
                    <h1 className='text-4xl font-semibold tracking-wide'>
                        Checkout Successful
                    </h1>
                    <p className='text-xl mt-4 font-medium'>
                        Thanks you for your purchase
                    </p>
                    <div className='mt-16'>
                        <Link href='/my-orders'>
                            <a className='bg-black block text-white p-4 rounded-lg font-medium hover:bg-gray-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-slate-100'>
                                View Order Status
                            </a>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default CheckOut;
