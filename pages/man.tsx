import { collection, getDocs, query, where } from 'firebase/firestore';
import Loader from '../components/Loader';
import Product from '../components/Product';
import { ProductType } from '../config/@type';
import { db } from '../firebase/config';

type Props = {
    products: ProductType[];
};

const Man = ({ products }: Props) => {
    return products ? (
        <div className='grid grid-cols-2 gap-2 lg:grid-cols-3 px-4 lg:px-16 ld:gap-3 py-10 bg-white dark:bg-[#151515]'>
            {products.map((item: ProductType, index: number) => (
                <div
                    key={index}
                    className='product-translate opacity-0'
                    style={{ animationDelay: `${index / 10 + 0.2}s` }}
                >
                    <Product data={item} />
                </div>
            ))}
        </div>
    ) : (
        <Loader />
    );
};

export async function getStaticProps() {
    let products: any = [];
    const q = query(collection(db, 'man'), where('type', '==', 'man'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any) => {
        products.push(doc.data());
    });

    return {
        props: {
            products,
        },
    };
}

export default Man;
