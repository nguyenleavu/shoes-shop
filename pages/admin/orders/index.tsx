import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React from 'react';
import { OrderType } from '../../../config/@type';
import { db } from '../../../firebase/config';

type Props = {
    orders: DataProps[];
};

type DataProps = {
    uuid: string;
    data: OrderType;
};

const Order = ({ orders }: Props) => {
    const router = useRouter();
    return (
        <div className='py-16 min-h-[60.5vh] px-2 lg:px-20'>
            <div className=''>
                <h2 className='text-4xl font-semibold tracking-wide'>
                    All Orders
                </h2>
                <p className='text-lg mt-4 text-gray-600'>
                    Open an order to Change Order Status
                </p>
                <div>
                    <div className='flex justify-between h-14 font-semibold bg-black text-white px-4 rounded-lg mt-8 border-[1px] border-gray-600 dark:bg-gray-50 dark:text-black'>
                        <span className='flex items-center'>
                            Stt
                        </span>
                        <p className='flex items-center'>Date</p>
                        <p className='lg:flex items-center min-w-[320px] hidden'>
                            Order ID
                        </p>
                        <p className='flex items-center'>
                            Amount
                        </p>
                        <p className='flex items-center ml-4'>Status</p>
                    </div>
                    <div>
                        {orders &&
                            orders.map((item: DataProps, index: number) => (
                                <div
                                    key={item.data.id}
                                    className='flex justify-between h-12 px-4 border-[1px] border-gray-400 rounded-lg mt-2 font-normal bg-gray-200 dark:bg-slate-800 cursor-pointer hover:bg-gray-300 transition-colors '
                                    onClick={()=>router.push(`/admin/orders/${item.data.id}`)}
                                >
                                    <span className='flex items-center'>
                                        {index + 1}
                                    </span>
                                    <p className='flex items-center'>
                                        {item.data.date}
                                    </p>
                                    <p className='lg:flex items-center min-w-[250px] hidden'>
                                        {item.data.id}
                                    </p>
                                    <p className='flex items-center ml-4'>
                                        ${item.data.price}
                                    </p>
                                    <p
                                        className={
                                            item.data.status === 'Ordered'
                                                ? 'flex items-center text-red-500'
                                                : item.data.status ===
                                                  'Delivered'
                                                ? 'flex items-center text-blue-500'
                                                : 'flex items-center text-yellow-500'
                                        }
                                    >
                                        {item.data.status}

                                        {item.data.status === 'Ordered' && (
                                            <span className=' ml-2 text-xl'>
                                                <i className='fa-solid fa-truck-ramp-box'></i>
                                            </span>
                                        )}
                                        {item.data.status === 'Delivered' && (
                                            <span className=' ml-2 text-xl'>
                                                <i className='fa-solid fa-truck'></i>
                                            </span>
                                        )}
                                        {item.data.status === 'Shipped' && (
                                            <span className=' ml-2 text-xl'>
                                                <i className='fa-solid fa-truck-fast'></i>
                                            </span>
                                        )}
                                    </p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export async function getStaticProps() {
    let orders: any = [];
    const querySnapshot = await getDocs(collection(db, 'orders'));
    querySnapshot.forEach((doc: any) => {
        orders.push({ uid: doc.id, data: doc.data() });
    });

    return {
        props: {
            orders,
        },
    };
}

export default Order;
