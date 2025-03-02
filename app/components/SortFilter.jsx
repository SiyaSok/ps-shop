/** @format */
"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsFilterSquare } from "react-icons/bs";
import { FaGripHorizontal } from "react-icons/fa";
import { AiOutlinePicCenter } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useCart } from "../Context/CartContext";

const SortFilter = ({ productsTotal }) => {
  const [categories, setCategories] = useState([]);
  const [sortCategory, setSortCategory] = useState("createdAt");
  const [category, setCategory] = useState("createdAt");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState(1);
  const [limit, setLimit] = useState(12);

  const { setGrid, grid } = useCart();

  const router = useRouter();

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
    setLimit(newLimit);
    let query;
    if (selectedCategory) {
      query = `?category=${selectedCategory}&limit=${newLimit}&sortBy=${sortCategory}&sortOrder=${sortOrder}`;
    } else {
      query = `?limit=${newLimit}&sortBy=${sortCategory}&sortOrder=${sortOrder}`;
    }

    router.push(`/products${query}`);
  };

  const handleSortByChange = (e) => {
    const newSortBy = e.target.value;
    let query;
    if (selectedCategory) {
      setSortOrder(1);
      setSortCategory(newSortBy);
      setCategory(newSortBy);
      query = `?category=${selectedCategory}&limit=${limit}&sortBy=${sortCategory}&sortOrder=${sortOrder}`;
    } else {
      if (newSortBy === "highToLow") {
        setSortOrder(-1);
        setSortCategory("price");
        setCategory("highToLow");
        query = `?limit=${limit}&sortBy=${"price"}&sortOrder=${"-1"}`;
      } else {
        setSortOrder(1);
        setSortCategory(newSortBy);
        setCategory(newSortBy);
        query = `?limit=${limit}&sortBy=${newSortBy}&sortOrder=${"1"}`;
      }
    }
    router.push(`/products${query}`);
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    let query;
    if (newCategory) {
      query = `?category=${newCategory}&limit=${limit}&sortBy=${sortCategory}&sortOrder=${sortOrder}`;
    } else {
      query = `?limit=${limit}&sortBy=${sortCategory}&sortOrder=${sortOrder}`;
    }

    router.push(`/products${query}`);
  };

  const handleGridChange = (e) => {
    setGrid(parseInt(e.target.value, 10));
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
              value={selectedCategory}
              onChange={handleCategoryChange}>
              <option value=''>Filter</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div className='flex items-center'>
            <FaGripHorizontal className='text-xl' />
            <select
              className='p-2 w-14 bg-transparent '
              value={grid}
              onChange={handleGridChange}>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
          <div>
            <AiOutlinePicCenter className='text-xl' />
          </div>
          <div>|</div>
          <div className='text-sm text-center'>{`Showing 1–${
            limit || 12
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
              <option value='12'>12</option>
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
              value={category}
              onChange={handleSortByChange}>
              <option value=''>Sort By</option>
              <option value='createdAt'>Newest</option>
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
