import axios from "axios";
// import Card from "../../components/card/card";
import CreateStoreForm from "./fromStore";

import { useEffect, useState } from "react";
import { icons } from "../../assets/assets";
import { toCurrency } from "../../helper/currency";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/backButton";

export default function Store() {
  const navigate = useNavigate();
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStoreData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_GATE_WAY}/stores`,
          { withCredentials: true }
        );
        setStoreData(response.data.data);
        console.log(response.data);
      } catch (err) {
        console.error("Failed to fetch store:", err);
        setStoreData(null);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    getStoreData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="min-h-screen flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ) : !storeData ? (
        <CreateStoreForm />
      ) : (
        <div className="bg-gray-100">
          <BackButton />
          <div className="w-full min-h-screen flex justify-center  py-4">
            <div className="w-[95%] max-w-4xl bg-white rounded-xl shadow-md flex flex-col items-center sm:items-start gap-6 overflow-hidden">
              <div className="bg-orange-500 w-full flex items-center px-4 min-h-[20vh] gap-2 flex-col md:flex-row py-2">
                {/* Foto Toko */}
                <div className="flex-shrink-0">
                  <img
                    src={icons.store} //storeData?.storePicture ||
                    alt="Foto Toko"
                    className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
                  />
                </div>

                {/* Info Toko */}
                <div className="flex flex-col justify-center sm:justify-start items-center sm:items-start ml-1">
                  <h2 className="text-white text-2xl font-bold">
                    {storeData?.storeName}
                  </h2>
                  <p className="text-white text-sm">
                    {storeData?.storeDescription}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-400 text-xl mr-1">★</span>
                    <span className="text-yellow-400 text-xl mr-1">★</span>
                    <span className="text-yellow-400 text-xl mr-1">★</span>
                    <span className="text-yellow-400 text-xl mr-1">★</span>
                    <span className="text-gray-300 text-xl mr-1">★</span>
                    <span className="text-sm text-white ml-2">
                      (4.0 dari 253 penilaian)
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Section */}
              <div className="w-full px-4 pb-8">
                <div className="flex gap-2 mb-5 items-center ">
                  <h2 className="text-2xl font-bold text-orange-600">
                    Produk Toko{" "}
                  </h2>
                  <button
                    onClick={() => navigate("/store/product/add")}
                    className="bg-orange-500 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition"
                  >
                    + Tambah Produk
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {storeData?.products.length == 0 ? (
                    <div className="col-span-full text-center py-10 text-gray-500">
                      <p>Belum ada produk yang ditambahkan.</p>
                      <button
                        onClick={() => navigate("/store/product/add")}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition cursor-pointer"
                      >
                        + Tambah Produk
                      </button>
                    </div>
                  ) : (
                    storeData?.products?.map((data) => (
                      <div
                        key={data.id}
                        onClick={() =>
                          navigate(`/store/product/${data.id}/edit`)
                        }
                        className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200"
                      >
                        <img
                          src={`${
                            import.meta.env.VITE_IMAGES
                          }/images/products/${
                            data.variants[0]?.images[0]?.imageUrl
                          }`}
                          alt={data.name}
                          className="w-full aspect-[8/12] object-cover"
                        />

                        <div className="p-4 flex flex-col gap-1">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {data.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Varian: {data.variants.length}
                          </p>
                          {data.variants[0]?.productPrice && (
                            <p className="text-orange-600 font-bold mt-1">
                              Rp
                              {toCurrency(data?.variants[0]?.productPrice)}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
