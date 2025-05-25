import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toCurrency } from "../helper/currency";
import BackButton from "../components/backButton";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [productDetail, setProductDetail] = useState({
    variantPrice: 0,
    variantSelected: 0,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_GATE_WAY}/products/${id}`
        );
        const availableVariant = res.data.data?.variants?.find(
          (variant) => variant.productStock > 0
        );
        if (availableVariant) {
          setProductDetail((prev) => ({
            ...prev,
            variantSelected: availableVariant.id || undefined,
          }));
        }
        console.log(productDetail);
        setProductDetail((prev) => ({
          ...prev,
          variantPrice: res.data.data?.variants[0].productPrice,
        }));
        setProduct(res.data.data);
      } catch (err) {
        console.error("Gagal memuat produk:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleCommentSubmit = async () => {
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_GATE_WAY}/comments`, {
        productId: id,
        comment,
      });
      setComment("");

      const res = await axios.get(
        `${import.meta.env.VITE_GATE_WAY}/products/${id}`
      );
      setProduct(res.data.data);
    } catch (err) {
      console.error("Gagal mengirim komentar:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <div className="text-center mt-10">Loading...</div>;

  const image = product.variants[0]?.images[0]?.imageUrl || "default.jpg";

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-10">
      <BackButton />
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gambar Produk */}
          <div>
            <img
              src={`${import.meta.env.VITE_IMAGES}/images/products/${image}`}
              alt={product.name}
              className="w-full aspect-[8/12] object-cover rounded-lg shadow"
            />
          </div>

          {/* Detail Produk */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>

            <div className="text-orange-600 text-2xl font-bold">
              Rp
              {toCurrency(
                productDetail.variantPrice || product.variants[0]?.productPrice
              )}
            </div>

            {/* variants */}
            <div className="mt-4">
              <h2 className="font-semibold mb-2">Pilih Varian:</h2>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.variants?.map((variant, idx) => (
                  <button
                    key={idx}
                    className={`min-w-max px-4 py-2 rounded-full whitespace-nowrap
                            ${
                              variant.productStock === 0
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer"
                            }
                            ${
                              productDetail.variantSelected === variant.id &&
                              "border-2 border-orange-400"
                            }
                          `}
                    onClick={() => {
                      if (variant.productStock > 0) {
                        setProductDetail((prev) => ({
                          ...prev,
                          variantSelected: variant.id,
                        }));
                        setProductDetail((prev) => ({
                          ...prev,
                          variantPrice: variant.productPrice,
                        }));
                      }
                    }}
                    disabled={variant.productStock === 0}
                  >
                    {variant.productVariantName}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-gray-600">
              <h1 className="font-bold">Description: </h1>
              {product.description || "Tidak ada deskripsi"}
            </div>

            {/* Profil Toko */}
            <div className="flex items-center gap-3 mt-4">
              <img
                src={`${import.meta.env.VITE_IMAGES}/images/avatars/${
                  product.store?.storePicture || "default.jpg"
                }`}
                className="w-20 h-20 rounded-full object-cover border-2 border-orange-400"
                alt="Store"
              />
              <div>
                <p className="text-xl font-medium">
                  {product.store?.storeName}
                </p>
                <div className="flex items-center">
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

            {/* Tombol */}
            <div className="flex gap-4 mt-6">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg">
                Tambah ke Keranjang
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">
                Checkout Sekarang
              </button>
            </div>
          </div>
        </div>

        {/* Komentar */}
        <div className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold">Komentar</h2>

          {/* Daftar Komentar */}
          <div className="space-y-3">
            {product.comments?.length > 0 ? (
              product.comments.map((comment, i) => (
                <div key={i} className="bg-gray-100 p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-700">{comment.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">
                Belum ada komentar.
              </p>
            )}
          </div>

          {/* Form Komentar */}
          <div className="mt-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border rounded-lg p-3 resize-none"
              rows={3}
              placeholder="Tulis komentar kamu di sini..."
            ></textarea>
            <button
              onClick={handleCommentSubmit}
              disabled={loading || !comment.trim()}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md disabled:opacity-50"
            >
              {loading ? "Mengirim..." : "Kirim Komentar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
