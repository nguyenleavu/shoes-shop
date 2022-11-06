import { collection, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase/config';
import { OrderType, ProductsOrderType } from '../../../config/@type';
import Image from 'next/image';
import { myLoader } from '../../../components/Product';
import { updateStatus } from '../../../firebase/firebase';
import Loader from '../../../components/Loader';

type Props = {};

const OrderDetails = (props: Props) => {
    const router = useRouter();
    const [status, setStatus] = useState('Ordered');
    const [order, setOrder] = useState<OrderType>();
    const [id, setId] = useState('');

    const handleUpdate = () => {
        updateStatus(id, status);
        router.back();
    };

    useEffect(() => {
        const fetchAPI = async () => {
            if (router.query.id) {
                const q = query(
                    collection(db, 'orders'),
                    where('id', '==', router.query.id)
                );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc: any) => {
                    setOrder(doc.data());
                    setId(doc.id);
                });
            }
        };
        fetchAPI();
    }, [router.query.id]);

    return order ? (
        <div className='flex flex-col items-center min-h-[60.5vh] p-2 lg:p-10'>
            <h2 className='text-3xl font-semibold tracking-wide'>
                Order Detail
            </h2>
            <button
                className='p-2 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-all mt-4'
                onClick={() => router.back()}
            >
                <i className='fa-solid fa-arrow-left mx-2'></i>
                <span>Back to Orders</span>
            </button>
            <div>
                <p className='mt-8 hidden lg:block'>
                    <span className='mr-4 font-semibold text-black '>
                        Order ID :
                    </span>
                    {order.id}
                </p>
                <p className='mt-2 hidden lg:block'>
                    <span className='mr-0 lg:mr-4 font-semibold text-black'>
                        Order Amount :
                    </span>
                    ${order.price}
                </p>
                <p className='mt-2 hidden lg:block'>
                    <span className='mr-4 font-semibold text-black'>
                        Order Status :
                    </span>
                    {order.status}
                </p>
                <p className='mt-2 hidden lg:block'>
                    <span className='mr-4 font-semibold text-black'>
                        Shipping Address :
                    </span>
                    {order.fullAddress}
                </p>
                <p className='mt-2 hidden lg:block'>
                    <span className='mr-4 font-semibold text-black'>
                        City :
                    </span>
                    {order.city}
                </p>
            </div>

            <div className=''>
                <div className='flex justify-between h-14 font-semibold bg-black text-white px-4 rounded-lg mt-8 border-[1px] border-gray-600 dark:bg-gray-50 dark:text-black min-w-[340px] lg:min-w-[800px]'>
                    <span className='flex items-center'>Stt</span>
                    <p className='flex items-center'>Product</p>
                    <p className='flex items-center'>Order ID</p>
                    <p className='flex items-center'>Price</p>
                    <p className='flex items-center'>Quantity</p>
                </div>
                <div className=''>
                    {order.products.map(
                        (item: ProductsOrderType, index: number) => (
                            <div
                                key={index}
                                className='flex justify-between min-h-[48px] px-4 border-[1px] border-gray-400 rounded-lg mt-2 font-normal bg-gray-200 dark:bg-slate-800 cursor-pointer hover:bg-gray-300 transition-colors '
                            >
                                <span className='mt-2'>{index + 1}</span>
                                <p className='flex flex-col mt-2'>
                                    <span>
                                        <Image
                                            loader={myLoader}
                                            src={item.image}
                                            alt={item.name}
                                            width={100}
                                            height={100}
                                            unoptimized={true}
                                            className='rounded-lg'
                                        />
                                    </span>
                                </p>
                                <p className='pl-4 mt-2'>{item.id}</p>
                                <p className='mt-2'>{item.price}</p>
                                <p className='ml-8 mt-2'>{item.quantity}</p>
                            </div>
                        )
                    )}
                </div>
                <div className='flex justify-center mt-2 lg:m-8'>
                    <div className='lg:w-3/5 border-2 border-gray-400 rounded flex items-center flex-col p-4 w-full'>
                        <h2 className='text-2xl font-semibold'>
                            Update Status
                        </h2>
                        <div className='flex mt-4'>
                            <span className='font-medium mx-2'>Ordered : </span>
                            <label
                                htmlFor='Ordered'
                                className='theme mr-2 cursor-pointer'
                            >
                                <input
                                    onChange={(e) => setStatus(e.target.value)}
                                    type='radio'
                                    name='order-type'
                                    id='Ordered'
                                    value='Ordered'
                                    className='hidden'
                                />
                            </label>
                        </div>
                        <div className='flex mt-4'>
                            <span className='font-medium mx-2'>Shipped :</span>
                            <label
                                htmlFor='Shipped'
                                className='theme mr-2 cursor-pointer'
                            >
                                <input
                                    onChange={(e) => setStatus(e.target.value)}
                                    type='radio'
                                    name='order-type'
                                    id='Shipped'
                                    value='Shipped'
                                    className='hidden'
                                />
                            </label>
                        </div>

                        <div className='flex mt-4'>
                            <span className='font-medium mx-2'>
                                Delivered :
                            </span>
                            <label
                                htmlFor='Delivered'
                                className='theme mr-2 cursor-pointer'
                            >
                                <input
                                    value='Delivered'
                                    onChange={(e) => setStatus(e.target.value)}
                                    type='radio'
                                    name='order-type'
                                    id='Delivered'
                                    className='hidden'
                                />
                            </label>
                        </div>
                        <button
                            className='mt-8 h-10 w-32 rounded-full bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors'
                            onClick={handleUpdate}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Loader />
    );
};

export default OrderDetails;
