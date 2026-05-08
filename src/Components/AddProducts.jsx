// src/Components/AddProducts.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const AddProducts = () => {
  const [product_name, setProductname] = useState("");
  const [product_description, setProductdescription] = useState("");
  const [product_cost, setProductcost] = useState("");
  const [photo, setProductphoto] = useState("");
  const [category, setCategory] = useState("");

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const fileRef = useRef();

  // Fetch categories
  useEffect(() => {
    axios
      .get("http://masairevis.alwaysdata.net/api/getcategories")
      .then((res) => setCategories(res.data))
      .catch(() => setError("Failed to load categories"));
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    if (!category) {
      setError("Please select a category");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("product_name", product_name);
      data.append("product_description", product_description);
      data.append("product_cost", product_cost);
      data.append("photo", photo);
      data.append("category_id", Number(category));

      const response = await axios.post(
        "http://masairevis.alwaysdata.net/api/addproducts",
        data
      );

      setSuccess(response.data.message);

      // reset form
      setProductname("");
      setProductdescription("");
      setProductcost("");
      setCategory("");
      setProductphoto("");

      if (fileRef.current) {
        fileRef.current.value = null;
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      }}
    >
      <div className="col-md-6">
        <div
          className="card shadow p-4"
          style={{
            borderRadius: "20px",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            color: "white",
          }}
        >
          <h2 className="text-center mb-4 neon-text">Upload a Product</h2>

          <form onSubmit={submit}>
            {loading && <p className="text-warning">Uploading product...</p>}
            {success && <p className="text-success">{success}</p>}
            {error && <p className="text-danger">{error}</p>}

            <div className="mb-3">
              <input
                type="text"
                placeholder="Product Name"
                className="form-control bg-transparent text-white"
                value={product_name}
                onChange={(e) => setProductname(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <textarea
                placeholder="Product Description"
                className="form-control bg-transparent text-white"
                value={product_description}
                onChange={(e) => setProductdescription(e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                placeholder="Product Cost"
                className="form-control bg-transparent text-white"
                value={product_cost}
                onChange={(e) => setProductcost(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-control bg-transparent text-white"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option
                    key={cat.category_id}
                    value={cat.category_id}
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">
                Upload Product Photo
              </label>
              <input
                ref={fileRef}
                type="file"
                className="form-control bg-transparent text-white"
                onChange={(e) => setProductphoto(e.target.files[0])}
                accept="image/*"
                required
              />
              {photo && (
                <small className="text-info">{photo.name}</small>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-info w-100 fw-bold"
              disabled={loading || !category}
            >
              {loading ? "Uploading..." : "Upload Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;