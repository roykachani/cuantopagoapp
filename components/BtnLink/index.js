import Link from 'next/link';

const BtnLink = ({ input, href }) => {
  return (
    <>
      <Link href={href}>
        <div className="text-lg w-28 text-center cursor-pointer text-teal-700 hover:text-gray-200 hover:rounded-md hover:shadow-sm  hover:bg-teal-600 ">
          {input}
        </div>
      </Link>
    </>
  );
};

export default BtnLink;
