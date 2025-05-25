import axios from "axios";
import React, { useState } from "react";
import BackButton from "../../components/backButton";

export default function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    discount: 0,
    variants: [],
  });

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...product.variants];
    newVariants[index] = {
      ...newVariants[index],
      [field]: value,
    };
    setProduct({ ...product, variants: newVariants });
  };

  const handleImageChange = (index, file) => {
    const newVariants = [...product.variants];
    newVariants[index].image = file;
    newVariants[index].preview = URL.createObjectURL(file);
    setProduct({ ...product, variants: newVariants });
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
          preview: null,
        },
      ],
    });
  };

  const removeVariant = (index) => {
    const newVariants = [...product.variants];
    newVariants.splice(index, 1);
    setProduct({ ...product, variants: newVariants });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const productPayload = {
      name: product.name,
      description: product.description,
      discount: parseInt(product.discount) || 0,
    };

    const variantPayload = product.variants.map((v) => ({
      productVariantName: v.productVariantName,
      productPrice: parseInt(v.productPrice),
      productStock: parseInt(v.productStock),
    }));

    formData.append("product", JSON.stringify({ product: productPayload }));
    formData.append("variant", JSON.stringify({ variant: variantPayload }));

    product.variants.forEach((v, i) => {
      if (v.image) {
        formData.append("files", v.image); // sesuai req.files di backend
      }
    });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_GATE_WAY}/products`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        alert("Product uploaded successfully");
        setProduct({
          name: "",
          description: "",
          discount: 0,
          variants: [],
        });
      } else {
        alert(result.message || "Failed to upload product");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during submission.");
    }
  };

  return (
    <div>
      <BackButton />
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl"
      >
        <h2 className="text-2xl font-bold text-orange-600 mb-4">
          Product Form
        </h2>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-orange-500"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-orange-500"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-6">
          <label className="block font-medium text-gray-700">
            Discount (%)
          </label>
          <input
            type="number"
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-orange-500"
            value={product.discount}
            onChange={(e) =>
              setProduct({ ...product, discount: e.target.value })
            }
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-orange-500 mb-2">
            Product Variants
          </h3>
          {product.variants.map((variant, index) => (
            <div
              key={index}
              className="border p-4 rounded-xl mb-4 shadow-sm relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Variant Name"
                  className="border rounded-md p-2 focus:ring-2 focus:ring-orange-500"
                  value={variant.productVariantName}
                  onChange={(e) =>
                    handleVariantChange(
                      index,
                      "productVariantName",
                      e.target.value
                    )
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  className="border rounded-md p-2 focus:ring-2 focus:ring-orange-500"
                  value={variant.productPrice}
                  onChange={(e) =>
                    handleVariantChange(index, "productPrice", e.target.value)
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Stock"
                  className="border rounded-md p-2 focus:ring-2 focus:ring-orange-500"
                  value={variant.productStock}
                  onChange={(e) =>
                    handleVariantChange(index, "productStock", e.target.value)
                  }
                  required
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(index, e.target.files[0])}
                  className="block text-sm"
                  required
                />
                {variant.preview && (
                  <img
                    src={variant.preview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded border mt-2"
                  />
                )}
              </div>
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="text-sm text-red-500 hover:underline mt-2"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addVariant}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md"
          >
            + Add Variant
          </button>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold"
          >
            Submit Product
          </button>
        </div>
      </form>
    </div>
  );
}
