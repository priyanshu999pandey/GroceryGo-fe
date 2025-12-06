import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "../utils/Axios.js";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import CardProduct from "../components/CardProduct.jsx";
import ValidUrlConvert from "../utils/ValidUrlConvert.js";

const ProductListPage = () => {
  const subCategoryData = useSelector((state) => state.product.subCategory || []);

  const params = useParams();
  console.log(params)
  const [data, setData] = useState([]); // <- init as array
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState();
  const [limit, setLimit] = useState(10);

  const categoryId = params.category?.split("-").slice(-1)[0];
  const subCategoryId = params.subcategory?.split("-").slice(-1)[0];
  const subCategoryName = params.subcategory?.split("-")[0] || "";

  const subCategorybyCategoryWise = (subCategoryData || []).filter(
    (sub) => sub.category && sub.category[0]?._id == categoryId
  );

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const res = await Axios.post("/product/get-productByCategoryIdAndsubCategoryId", {
        categoryId,
        subCategoryId,
        page,
        limit,
      });

      // make sure we always set an array
      const returned = res?.data?.data;
      setData(Array.isArray(returned) ? returned : []);
      setPage(res?.data?.page ?? page);
      setLimit(res?.data?.limit ?? limit);
      setTotalCount(res?.data?.totalCount ?? totalCount);
    } catch (error) {
      console.error("fetchProductData error:", error);
      toast.error(error?.message || "Something went wrong");
      setData([]); // safe fallback
    } finally {
      setLoading(false);
    }
  };
  const handleClicksubCategory = (cat)=>{
    const url = `/${ValidUrlConvert(categoryId)}-`
  }

  // fetch whenever params, page or limit change
  useEffect(() => {
    if (!categoryId || !subCategoryId) return;
    fetchProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, page, limit]);

  return (
    <section className="w-full flex h-[78vh]">
      {/* LEFT SIDEBAR */}
      <div className="w-[30%] lg:w-[20%] bg-white overflow-y-auto scrollbar-none">
        <div className="flex flex-col   w-full ">
          {subCategorybyCategoryWise.map((cat, index) => {
            
            const url = `/${params.category}/${ValidUrlConvert(cat.name)}-${cat._id}`
            return (
            <Link to={url}
            //  onClick={()=>handleClicksubCategory(cat)}
              key={cat._id || index}
              className={`shadow w-full h-20 flex-col items-center gap-3 p-4 lg:flex hover:bg-green-300 ${
                cat._id == subCategoryId ? "bg-green-800 text-white" : "bg-transparent"
              }`}
            >
              {/* <img src={cat.image} className="w-10 h-12 object-cover rounded" alt={cat.name} /> */}
              <p className="text-sm  lg:text-md font-medium">{cat.name}</p>
            </Link>
          )
          } )}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-[70%] lg:w-[80%] bg-white overflow-y-auto p-4">
        <div className="w-full shadow p-3 text-lg font-semibold">{subCategoryName}</div>

        {/* loading / empty states */}
        {loading ? (
          <div className="py-8 text-center">Loading...</div>
        ) : data.length === 0 ? (
          <div className="py-8 text-center">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {data.map((pro, index) => (
              <div key={pro._id || index}>
                <CardProduct data={pro} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductListPage;
