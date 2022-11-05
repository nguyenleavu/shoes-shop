import Image from 'next/image';
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { v4 } from 'uuid';
import { myLoader } from '../../components/Product';
import { ProductType } from '../../config/@type';
import {
    addProduct,
    upLoadAllImage,
    upLoadImage,
    upLoadImageColor,
} from '../../firebase/firebase';

type Props = {};

const AddProduct = (props: Props) => {
    const [name, setName] = useState('');
    const [introduce, setIntroduce] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number>();
    const [code, setCode] = useState('');
    const [url, setUrl] = useState<string>('');
    const [listUrl, setListUrls] = useState<string[]>([]);
    const [allImage, setAllImages] = useState<string[]>([]);

    const upLoadImageProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        upLoadImage(e, setUrl);
    };

    const uploadColorProduct = (images: any) => {
        upLoadImageColor(images, setListUrls);
    };

    const uploadAllImageProduct = (images: any) => {
        upLoadAllImage(images, setAllImages);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newProduct :ProductType = {
            id: v4(),
            name,
            type,
            introduce,
            price,
            code,
            description,
            image: url,
            color: listUrl,
            other: allImage,
        };
        addProduct(newProduct);
        setName('')
        setIntroduce('')
        setType('')
        setDescription('')
        setPrice(undefined)
        setCode('')
        setUrl('')
        setListUrls([])
        setAllImages([])
    };

    return (
        <div className='py-10 px-4 lg:px-20'>
            <h2 className='text-3xl font-semibold tracking-wide'>
                Add Products
            </h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <p className='font-medium mt-8 text-lg'>Name :</p>
                <input
                    required
                    placeholder='Name product'
                    className=' border-2 border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-white px-2 h-10 w-80 rounded-lg  mt-2'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <p className='font-medium mt-8 text-lg'>Introduce :</p>
                <input
                    required
                    placeholder="woman's shoes or man or....."
                    className='border-2 border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-white px-2 h-10 w-80 rounded-lg  mt-2'
                    value={introduce}
                    onChange={(e) => setIntroduce(e.target.value)}
                />

                <p className='font-medium mt-8 text-lg'>Price :</p>
                <input
                    required
                    placeholder='Price'
                    className=' border-2 border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-white px-2 h-10 w-80 rounded-lg  mt-2'
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />

                <p className='font-medium mt-8 text-lg'>Type :</p>
                <label className='flex items-center text-lg'>
                    <input
                        type='radio'
                        name='type'
                        value='man'
                        checked={true}
                        className='h-4 w-4 border-2 border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-white '
                        onChange={(e) => setType(e.target.value)}
                    />
                    <span className='ml-4'>man</span>
                </label>
                <label className='flex items-center text-lg'>
                    <input
                        type='radio'
                        name='type'
                        value='woman'
                        className='h-4 w-4'
                        onChange={(e) => setType(e.target.value)}
                    />
                    <span className='ml-4'>woman</span>
                </label>
                <label className='flex items-center text-lg'>
                    <input
                        type='radio'
                        name='type'
                        value='kids'
                        className='h-4 w-4'
                        onChange={(e) => setType(e.target.value)}
                    />
                    <span className='ml-4'>kids</span>
                </label>

                <p className='font-medium mt-8 text-lg'>Code :</p>
                <input
                    required
                    placeholder='Code'
                    className='px-2 h-10 w-80 rounded-lg mt-2 border-2 border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-white'
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />

                <p className='font-medium mt-8 text-lg'>Description :</p>
                <textarea
                    className='px-2 h-40 w-96 rounded-lg mt-2 border-2 border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-white'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <p className='font-medium mt-8 text-lg'>Image :</p>
                <input
                    type='file'
                    className='mt-2'
                    onChange={upLoadImageProduct}
                />
                {url && (
                    <div className='mt-4'>
                        <Image
                            loader={myLoader}
                            src={url}
                            alt={url}
                            width={200}
                            height={200}
                            unoptimized={true}
                            className='rounded-lg'
                        />
                    </div>
                )}

                <p className='font-medium mt-8 text-lg'>Images Color :</p>
                <input
                    type='file'
                    className='mt-2'
                    multiple
                    onChange={(e) => uploadColorProduct(e.target.files)}
                />

                <div className='grid grid-cols-5 gap-4 mt-4'>
                    {listUrl &&
                        listUrl.map((src: string, index: number) => (
                            <Image
                                key={index}
                                loader={myLoader}
                                src={src}
                                alt={src}
                                width={200}
                                unoptimized={true}
                                height={200}
                                className='rounded-lg'
                            />
                        ))}
                </div>

                <p className='font-medium mt-8 text-lg'>All Images Product: </p>
                <input
                    type='file'
                    className='mt-2'
                    multiple
                    onChange={(e) => uploadAllImageProduct(e.target.files)}
                />
                <div className='grid grid-cols-5 gap-4 mt-4'>
                    {allImage &&
                        allImage.map((src: string, index: number) => (
                            <Image
                                key={index}
                                loader={myLoader}
                                src={src}
                                alt={src}
                                width={200}
                                unoptimized={true}
                                height={200}
                                className='rounded-lg'
                            />
                        ))}
                </div>

                <button
                    className='block h-16 w-72 bg-black rounded-full mt-8 text-white hover:bg-gray-900 transition-all dark:bg-white dark:text-black dark:hover:bg-gray-200 font-semibold text-lg ml-[12%] lg:ml-0'
                    type='submit'
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
