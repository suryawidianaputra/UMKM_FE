import { useRef, useState } from "react";
import axios from "axios";
import BackButton from "../../components/backButton";

export default function CreateStoreForm() {
  const [form, setForm] = useState({
    storeName: "",
    storeDescription: "",
  });
  const fileInputRef = useRef();
  const [storePicture, setStorePicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStorePicture(file); // simpan file ke state
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("storeName", form.storeName);
      formData.append("storeDescription", form.storeDescription);
      if (storePicture) {
        formData.append("files", storePicture); // sesuai dengan .array("files") di backend
      }

      const res = await axios.post(
        `${import.meta.env.VITE_GATE_WAY}/stores`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 201) {
        alert("Store created successfully!");
        setForm({ storeName: "", storeDescription: "" });
        setStorePicture(null);
        setPreview(null);
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setErrors(err.response.data.error);
      } else {
        alert("Something went wrong.");
        fileInputRef.current.value = "";
        setIsSubmitting(false);
      }
    } finally {
      setIsSubmitting(false);
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <BackButton />
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md border border-orange-200">
        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
          Create Store
        </h2>

        {/* Preview gambar */}
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-orange-500">
          {preview ? (
            <img
              src={preview}
              alt="Store Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold text-sm">
              Preview
            </div>
          )}
        </div>

        <div className="px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Store Name */}
            <div>
              <label className="block font-medium text-gray-700">
                Store Name
              </label>
              <input
                type="text"
                name="storeName"
                value={form.storeName}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.storeName && (
                <p className="text-red-500 text-sm mt-1">{errors.storeName}</p>
              )}
            </div>

            {/* Upload Gambar */}
            <div>
              <label
                htmlFor="storePicture"
                className="cursor-pointer block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-2 px-4 rounded-xl"
              >
                Choose Store Picture
              </label>
              <input
                id="storePicture"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />

              {errors.storePicture && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.storePicture}
                </p>
              )}
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block font-medium text-gray-700">
                Store Description
              </label>
              <textarea
                name="storeDescription"
                value={form.storeDescription}
                onChange={handleChange}
                rows="4"
                className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              ></textarea>
              {errors.storeDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.storeDescription}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl"
            >
              {isSubmitting ? "Processing..." : "Create Store"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
