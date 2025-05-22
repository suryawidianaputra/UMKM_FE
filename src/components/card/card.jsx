import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

export default function Card() {
  const [data, setData] = useState(null);

  const { datas, error, loading } = useFetch("https://api.jikan.moe/v4/anime");
  useEffect(() => {
    setData(datas);
  }, [datas]);

  if (loading) return <h1>Loading bang.............</h1>;

  return (
    <div className="mt-10 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4 p-5">
      {data?.data?.map((data, i) => (
        <div key={i} className="w-full ">
          <img
            src={data.images.webp.image_url}
            alt=""
            className="w-full aspect-[8/12]"
          />
          <h1>{data.title}</h1>
        </div>
      ))}
    </div>
  );
}
