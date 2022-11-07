import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
    return (
        <Html>
            <Head>
                <link
                    rel='stylesheet'
                    href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css'
                    integrity='sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=='
                    crossOrigin='anonymous'
                    referrerPolicy='no-referrer'
                />
                <link
                    href='https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&family=Quicksand:wght@300;400;500;600;700&display=swap'
                    rel='stylesheet'
                ></link>
                <link
                    href='https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&family=Quicksand:wght@300;400;500;600;700&display=swap'
                    rel='stylesheet'
                ></link>
            </Head>
            <body className='dark:bg-[#151515] dark:text-[#ddd]'>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;
