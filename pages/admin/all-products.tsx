import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { ProductType } from '../../config/@type';
import { myLoader } from '../../components/Product';
import Image from 'next/image';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

type Props = {
    products: products[];
};

export type products = {
    uid: string;
    data: ProductType;
};

const AllProducts = ({ products }: Props) => {
    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'man', id));
            toast.success('Delete Successful...!!');
            window.location.reload();
        } catch {
            toast.error('Delete Failed!!');
        }
    };

    return !!products ? (
        <div className=' p-2 lg:p-4'>
            <h2 className='text-3xl font-semibold tracking-wide'>
                All Products
            </h2>
            <p>
                <strong className='tracking-wide mr-1'>
                    {products.length}
                </strong>
                <span className='text-stone-500'> Products found</span>
            </p>
            <div className='all-product'>
                {products.map((item: products, index: number) => (
                    <div
                        key={item.uid}
                        className='bg-even flex items-center p-2 lg:p-5 justify-between text-base font-medium rounded-lg'
                    >
                        <strong className='hidden lg:block w-6'>{index + 1}</strong>
                        <Image
                            loader={myLoader}
                            src={item.data.image}
                            alt={item.data.name}
                            width={100}
                            height={100}
                            unoptimized={true}
                            className='rounded-lg'
                        />
                        <p className='w-72 mx-4 max-w-[120px] lg:px-0'>{item.data.name}</p>
                        <p className='w-20 hidden lg:block'>{item.data.type}</p>
                        <span className='w-20'>{item.data.price}</span>
                        <div className='flex justify-between w-20'>
                            <Link
                                href={`/admin/${item.data.id}`}
                                className='cursor-pointer'
                            >
                                <a>
                                    <i className='fa-solid fa-pen-to-square text-xl'></i>
                                </a>
                            </Link>
                            <span
                                className=' cursor-pointer'
                                onClick={() => handleDelete(item.uid)}
                            >
                                <i className='fa-solid fa-trash text-xl'></i>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <p>heelo</p>
    );
};
export async function getStaticProps() {
    let products: any = [];
    const querySnapshot = await getDocs(collection(db, 'man'));
    querySnapshot.forEach((doc: any) => {
        products.push({ uid: doc.id, data: doc.data() });
    });

    return {
        props: {
            products,
        },
    };
}

export default AllProducts;
