import Link from 'next/link';

const Notfound = () => {
    return (
        <div className="flex justify-center items-center h-[80vh]">
            <div>
                <h2 className="text-3xl font-semibold">404 || Not Found</h2>
                <p className="py-4">Could not find requested resource</p>
                <p className="hover:scale-110 active:scale-100 text-center text-xl p-4 rounded duration-200 cursor-pointer text-white bg-blue-crayola">
                    <Link href="/">Return Home</Link>
                </p>
            </div>
        </div>
    );
};

export default Notfound;
