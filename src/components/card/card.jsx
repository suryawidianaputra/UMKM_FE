import { useState, useEffect } from "react";
import { toCurrency } from "../../helper/currency";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export default function Card() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const { datas, error, loading } = useFetch(
    `${import.meta.env.VITE_GATE_WAY}/products/random`
  );
  useEffect(() => {
    setData(datas);
    console.log(datas?.data[0]);
  }, [datas]);

  if (loading) return <h1>Loading bang.............</h1>;

  return (
    <div className="mt-10 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-6 px-5">
      {data?.data?.map((data, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200 cursor-pointer"
          onClick={() => navigate(`/product/${data.id}`)}
        >
          <img
            src={`${import.meta.env.VITE_IMAGES}/images/products/${
              data.variants[0]?.images[0]?.imageUrl
            }`}
            alt={data.name}
            className="w-full aspect-[8/12] object-cover"
          />

          <div className="p-4 flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-gray-800">{data.name}</h3>
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
      ))}
    </div>
  );
}
