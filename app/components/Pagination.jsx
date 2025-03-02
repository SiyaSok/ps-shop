/** @format */

import Link from "next/link";

/** @format */
const Pagination = ({ page, pageSize, totalItems }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <section className='container mt-10 mx-auto flex justify-center items-center my-8'>
      {page > 1 ? (
        <Link
          href={`products?page=${page - 1}`}
          className='mr-2 px-4 py-2 text-white bg-black rounded'>
          Previous
        </Link>
      ) : null}

      <span className='mr-2 px-4 py-2 text-white bg-black rounded'>
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Link
          href={`products?page=${page + 1}`}
          className='mr-2 px-4 py-2 text-white bg-black rounded'>
          Next
        </Link>
      ) : null}
    </section>
  );
};

export default Pagination;
