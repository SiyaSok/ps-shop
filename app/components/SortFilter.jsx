/** @format */
"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsFilterSquare } from "react-icons/bs";
import { FaGripHorizontal } from "react-icons/fa";
import { AiOutlinePicCenter } from "react-icons/ai";

const SortFilter = ({
  onLimitChange,
  onSortChange,
  onCategoryChange,
  limit,
  productsTotal,
  filteredCategory,
}) => {
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }

    fetchCategories();
  }, []);

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value, 10);
    onLimitChange(newLimit);
  };

  const handleSortByChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    onSortChange(newSortBy);
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    onCategoryChange(newCategory);
  };

  return (
    <div className='bg-orange-100 p-4'>
      <div className='container mx-auto flex flex-col md:flex-row items-center gap-4 md:justify-between'>
        {/* Sorting */}
        <div className='flex flex-wrap items-center gap-4 w-full md:w-auto justify-center'>
          <div className='flex items-center'>
            <BsFilterSquare className='mr-2 text-2xl md:text-4xl' />
            <select
              className='p-2 w-24 bg-transparent '
              value={filteredCategory}
              onChange={handleCategoryChange}>
              <option value=''>Filter</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <FaGripHorizontal className='text-xl' />
          </div>
          <div>
            <AiOutlinePicCenter className='text-xl' />
          </div>
          <div>|</div>
          <div className='text-sm text-center'>{`Showing 1–${
            limit || 16
          } of ${productsTotal} results`}</div>
        </div>

        {/* Category Filter */}
        <div className='flex flex-wrap items-center gap-4 w-full md:w-auto justify-center'>
          {/* Limit Selection */}
          <div className='flex items-center gap-2'>
            <label className='block text-sm font-medium'>Show:</label>
            <select
              className='p-2 border rounded'
              value={limit}
              onChange={handleLimitChange}>
              <option value=''>Show</option>
              <option value='2'>2</option>
              <option value='4'>4</option>
              <option value='8'>8</option>
              <option value='16'>16</option>
              <option value='32'>32</option>
              <option value='64'>64</option>
              <option value='128'>128</option>
            </select>
          </div>

          {/* Sort Selection */}
          <div className='flex items-center gap-2'>
            <label className='block text-sm font-medium'>Sort By:</label>
            <select
              className='w-34 p-2 border rounded'
              value={sortBy}
              onChange={handleSortByChange}>
              <option value=''>Sort By</option>
              <option value='highToLow'>Price: High to Low</option>
              <option value='price'>Price: Low to High</option>
              <option value='category'>Category</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortFilter;
