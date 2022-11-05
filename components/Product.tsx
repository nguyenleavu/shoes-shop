import Image from 'next/image';
import { useRouter } from 'next/router';
import { ProductType } from '../config/@type';

type Props = {
    data: ProductType;
};
export const myLoader = ({ src }: any) => {
    return src;
};

const Product = ({ data }: Props) => {
    const router = useRouter();
    return (
        <div
            className='bg-[#f6f6f6] border-black rounded-none lg:rounded-sm  cursor-pointer '
            onClick={() => router.push(`/${data.id}`)}
        >
            <Image
                loader={myLoader}
                src={data.image}
                alt=''
                className='product md:rounded-none'
                width='800'
                height='800'
                unoptimized={true}
            />
            <div className='h-30 lg:h-40 bg-white dark:bg-[#151515] text-[#252525] dark:text-[#ddd] rounded-none'>
                <h3 className='font-semibold text-base lg:text-2xl pt-4 text-black dark:text-white '>
                    {data.name}
                </h3>
                <p className='text-sm lg:text-base tracking-wider'>
                    {data.introduce}
                </p>
                <strong className='text-sm lg:text-base tracking-widest'>
                    {data.price}$
                </strong>
            </div>
        </div>
    );
};

export default Product;
