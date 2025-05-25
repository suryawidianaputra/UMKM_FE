import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { icons } from "../../assets/assets";
import BackButton from "../../components/backButton";

export default function EditProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    discount: 0,
    variants: [],
  });
  const [loading, setLoading] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_GATE_WAY}/products/${productId}`,
          { withCredentials: true }
        );
        const data = res.data.data;

        console.log(res.data);

        const variantsWithFile = data.variants.map((v) => ({
          id: v.id,
          productVariantName: v.productVariantName,
          productPrice: v.productPrice,
          productStock: v.productStock,
          imageUrl: v.images[0]?.imageUrl
            ? `${import.meta.env.VITE_IMAGES}/images/products/${
                v.images[0].imageUrl
              }`
            : "au",
          image: null,
        }));

        setProduct({
          id: data.id,
          name: data.name,
          description: data.description,
          discount: data.discount,
          variants: variantsWithFile,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleVariantChange = (index, key, value) => {
    const updatedVariants = [...product.variants];
    updatedVariants[index][key] = value;
    setProduct({ ...product, variants: updatedVariants });
  };

  const handleFileChange = (index, file) => {
    const updatedVariants = [...product.variants];
    updatedVariants[index].image = file;
    updatedVariants[index].imageUrl = URL.createObjectURL(file);
    setProduct({ ...product, variants: updatedVariants });
  };

  const addVariant = () => {
    setProduct({
      ...product,
      variants: [
        ...product.variants,
        {
          productVariantName: "",
          productPrice: "",
          productStock: "",
          image: null,
          imageUrl: null,
        },
      ],
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!product.name.trim()) {
      alert("Product name cannot be empty");
      return;
    }

    setLoadingUpdate(true);

    const formData = new FormData();

    const oldImageUrls = product.variants
      .filter((v) => !v.image && v.imageUrl)
      .map((v) => {
        const parts = v.imageUrl.split("/");
        return parts[parts.length - 1];
      });

    const cleanVariants = product.variants.map((v) => ({
      id: v.id,
      productPrice: Number(v.productPrice) || 0,
      productStock: Number(v.productStock) || 0,
      productVariantName: v.productVariantName,
    }));

    const cleanProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      discount: Number(product.discount) || 0,
    };

    formData.append("product", JSON.stringify(cleanProduct));
    formData.append("variant", JSON.stringify({ variant: cleanVariants }));
    formData.append("oldImageUrls", JSON.stringify(oldImageUrls));

    product.variants.forEach((v) => {
      if (v.image) formData.append("files", v.image);
    });

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_GATE_WAY}/products/${product.id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
      alert("Error updating product");
    } finally {
      navigate(-1);
      setLoadingUpdate(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <BackButton />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-orange-600 mb-6">
          Edit Product
        </h1>
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-orange-500 font-medium">
              Product Name
            </label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-orange-500 font-medium">
              Description
            </label>
            <textarea
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-orange-500 font-medium">
              Discount (%)
            </label>
            <input
              type="number"
              value={product.discount}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setProduct({ ...product, discount: isNaN(val) ? 0 : val });
              }}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-orange-600 mb-2">
              Variants
            </h2>
            {product.variants.map((v, i) => (
              <div
                key={v.id || i}
                className="border border-orange-200 rounded p-4 space-y-2 mb-4"
              >
                <div>
                  <label className="block text-orange-500 font-medium">
                    Variant name
                  </label>
                  <input
                    type="text"
                    value={v.productVariantName}
                    onChange={(e) =>
                      handleVariantChange(
                        i,
                        "productVariantName",
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-orange-500 font-medium">
                    Price
                  </label>
                  <input
                    type="number"
                    value={v.productPrice}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      handleVariantChange(
                        i,
                        "productPrice",
                        isNaN(val) ? 0 : val
                      );
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-orange-500 font-medium">
                    Stock
                  </label>
                  <input
                    type="number"
                    value={v.productStock}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      handleVariantChange(
                        i,
                        "productStock",
                        isNaN(val) ? 0 : val
                      );
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-orange-500 font-medium">
                    Image
                  </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileChange(i, e.target.files[0]);
                      }
                    }}
                    className="w-full bg-orange-500 text-white p-2 rounded-sm"
                  />
                  {v.imageUrl && (
                    <img
                      src={v.imageUrl}
                      alt={v.productVariantName || "variant-image"}
                      className="mt-2 h-60 w-60 object-cover rounded-sm"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            {/* <button
            type="button"
            onClick={addVariant}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md"
          >
            + Add Variant
          </button> */}
            <button
              type="submit"
              disabled={loadingUpdate}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded shadow disabled:opacity-50"
            >
              {loadingUpdate ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
