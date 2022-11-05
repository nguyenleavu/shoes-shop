import {
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { myLoader } from '../../components/Product';
import { db, storage } from '../../firebase/config';
import { products } from './all-products';

type Props = {};

const Update = (props: Props) => {
    const router = useRouter();
    const id = router.query.id;

    const [product, setProduct] = useState<products>();
    const [name, setName] = useState('');
    const [introduce, setIntroduce] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const a = {
        name,
        introduce,
        price,
        description,
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const imageRef = ref(storage, e.target.files[0].name);
            await uploadBytes(imageRef, e.target.files[0])
                .then(() => {
                    getDownloadURL(imageRef)
                        .then((url) => {
                            setImage(url);
                        })
                        .catch((error) => alert('Error'));
                })
                .catch((error) => alert('Error'));
        }
    };

    const handleSubmit = async (e: any, id: string) => {
        e.preventDefault();
        try {
            if (router.query.id) {
                const docRef = doc(db, 'man', id);
                await updateDoc(docRef, {
                    name,
                    introduce,
                    price,
                    image,
                    description,
                });
            }
            toast.success('Update Successful...!!');
            router.push('/admin/all-products');
        } catch (error) {
            toast.error('Update failed !!');
        }
    };

    useEffect(() => {
        const fetchAPI = async () => {
            if (router.query.id) {
                const q = query(
                    collection(db, 'man'),
                    where('id', '==', router.query.id)
                );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc: any) => {
                    setProduct({ uid: doc.id, data: doc.data() });
                    setName(doc.data().name);
                    setIntroduce(doc.data().introduce);
                    setPrice(doc.data().price);
                    setImage(doc.data().image);
                    setDescription(doc.data().description);
                });
            }
        };
        fetchAPI();
    }, [router.query.id]);

    return product ? (
        <div className='py-10 px-4 lg:px-10'>
            <h2 className='text-3xl font-semibold tracking-wide'>
                Update Product
            </h2>
            <form
                className='mt-8'
                onSubmit={(e) => handleSubmit(e, product.uid)}
            >
                <p className='font-semibold mt-4'>Product Name :</p>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='dark:bg-gray-700 border-2 h-10 w-80 px-2 rounded-lg '
                />
                <p className='font-semibold mt-4'>Introduce :</p>
                <input
                    value={introduce}
                    onChange={(e) => setIntroduce(e.target.value)}
                    className='dark:bg-gray-700 border-2 h-10 w-80 px-2 rounded-lg'
                />
                <p className='font-semibold mt-4'>Price :</p>
                <input
                    onChange={(e) => setPrice(Number(e.target.value))}
                    value={price}
                    className='dark:bg-gray-700 border-2 h-10 w-80 px-2 rounded-lg '
                />
                <div className='w-96'>
                    <p className='font-semibold mt-4'>Image :</p>
                    <input
                        onChange={handleChange}
                        type='file'
                        className=' my-4'
                    />
                    <Image
                        loader={myLoader}
                        src={image}
                        alt={product?.data.name}
                        width={200}
                        height={200}
                        unoptimized={true}
                        className='rounded-2xl'
                    />
                </div>
                <p className='font-semibold mt-4'>Description :</p>
                <textarea
                    value={description}
                    className='border-2 min-h-[220px] w-80 px-2 rounded-lg  dark:bg-gray-700'
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button
                    className='block h-16 w-72 bg-black rounded-full mt-8 text-white hover:bg-gray-900 transition-all dark:bg-white dark:text-black dark:hover:bg-gray-200 font-semibold text-lg ml-[12%] lg:ml-0'
                    type='submit'
                >
                    Submit
                </button>
            </form>
        </div>
    ) : (
        <div role='status' className='max-w-sm animate-pulse p-10'>
            <div className='h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-4'></div>
            <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mt-8'></div>
            <div className='h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-80 mt-2'></div>
            <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mt-8'></div>
            <div className='h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-80 mt-2'></div>
            <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mt-8'></div>
            <div className='h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-80 mt-2'></div>
            <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mt-8'></div>
            <div className='h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-80 mt-2'></div>
            <div className='h-52 bg-gray-200 rounded dark:bg-gray-700 w-52 mt-2'></div>
            <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mt-8'></div>
            <div className='h-52 bg-gray-200 rounded dark:bg-gray-700 w-80 mt-2'></div>
        </div>
    );
};

export default Update;
