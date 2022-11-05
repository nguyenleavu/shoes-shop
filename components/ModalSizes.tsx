import Image from 'next/image';
import React from 'react';
import { myLoader } from './Product';

type Props = {
    setModal: () => void;
};

const ModalSizes = ({ setModal }: Props) => {
    return (
        <div
            className='fixed  inset-0 lg:flex items-center justify-center bg-[#000000B3] z-50 transition-all hidden scroll-smooth'
            onClick={setModal}
        >
            <div className='bg-white h-5/6 w-3/5 overflow-y-auto  p-12 relative transition-all dark:bg-[#353535] rounded-lg' onClick={e=>e.stopPropagation()}>
                <button
                    className='h-12 w-12  absolute top-0 right-0 hover:bg-[#00000010]'
                    onClick={setModal}
                >
                    <i className='fa-solid fa-xmark text-3xl'></i>
                </button>
                <h2 className='text-3xl font-semibold '>
                    {"MEN'S AND WOMEN'S ADIDAS FOOTWEAR SIZING"}
                </h2>
                <a
                    href='#measure'
                    className='block underline text-base font-medium tracking-wider mt-9'
                >
                    HOW TO MEASURE
                </a>
                <span className='flex items-center justify-center mt-8 h-12 w-32 text-center border-[1px] border-black rounded dark:border-white'>
                    Cm
                </span>
                <div className='mt-4 grid'>
                    <Image
                        loader={myLoader}
                        src='https://cdn11.bigcommerce.com/s-htymzqignw/product_images/uploaded_images/size-chart-text.jpg'
                        alt=''
                        width='1000'
                        height='1000'
                    />
                </div>
                <div className='mt-16'>
                    <p className='text-3xl font-semibold italic'>
                        IN BETWEEN SIZES?
                    </p>
                    <p className='mt-4'>For tight fit, go one size down.</p>
                    <p className='mt-2'>For loose fit, go one size up.</p>
                </div>
                <div className='mt-16' id='measure'>
                    <p>HOW TO MEASURE</p>
                    <p>
                        Follow these easy steps to get the right size. For the
                        best fit, measure your feet at the end of the day.
                    </p>
                    <div className='p-4 flex bg-gray-300'>
                        <div className='w-1/2 text-sm px-3 font-medium'>
                            <p>
                                1.Step on а piece of paper with your heel
                                slightly touching a wall behind.
                            </p>
                            <p className='mt-4'>
                                2.Мark the end of your longest toe on the paper
                                (you might need a friend to help you) and
                                measure from the wall to the marking.
                            </p>
                            <p className='mt-4'>
                                3.Do the same for the other foot and compare
                                measurements with our size chart to get the
                                right size.
                            </p>
                        </div>
                        <div>
                            <Image
                                loader={myLoader}
                                src='https://www.adidas.com.vn/glass/react/189f074/assets/img/size-charts/shoes/how-to-measure-shoes.png'
                                alt=''
                                width='400'
                                height='400'
                            />
                        </div>
                    </div>
                    <div className='mt-16'>
                        <p className='text-3xl italic font-semibold'>
                            NOT THE RIGHT SIZE OR COLOUR?
                        </p>
                        <p className='mt-4'>
                            No problem, we offer returns within 30 days.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalSizes;
