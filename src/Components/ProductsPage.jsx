import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductsPage = ({ cart, addToCart, removeFromCart, search }) => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);

  const baseURL = "https://masairevis.alwaysdata.net";

  useEffect(() => {
    axios.get(`${baseURL}/api/getcategories`)
      .then(res => setCategories(res.data));

    axios.get(`${baseURL}/api/getproductdetails`)
      .then(res => setProducts(res.data));
  }, []);

  const filtered = products.filter(p => {
    const matchCategory = selected ? p.category_id === selected : true;
    const matchSearch = p.product_name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="row">

      {/* CATEGORIES */}
      <div className="col-md-3 text-white">
        <h5 className="text-info mb-3">Categories</h5>

        <button
          className="btn btn-light w-100 mb-2"
          onClick={() => setSelected(null)}
        >
          All
        </button>

        {categories.map(c => (
          <button
            key={c.category_id}
            className="btn btn-outline-light w-100 mb-2"
            onClick={() => setSelected(c.category_id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div className="col-md-9">

        <div className="row">

          {filtered.map(p => (
            <div className="col-md-4 mb-4" key={p.product_id}>

              <div className="card shadow-sm h-100">

                <img
                  src={`${baseURL}/static/images/${p.photo}`}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  alt={p.product_name}
                />

                <div className="card-body d-flex flex-column">

                  {/* PRODUCT NAME */}
                  <h5 className="text-dark">
                    {p.product_name}
                  </h5>

                  {/* CATEGORY */}
                  <p className="text-muted mb-1">
                    {p.category_name}
                  </p>

                  {/* 🔥 DESCRIPTION FIX */}
                  <p className="small text-secondary">
                    {p.product_description}
                  </p>

                  {/* PRICE */}
                  <h6 className="text-primary">
                    KES {p.product_cost}
                  </h6>

                  <div className="mt-auto">

                    {/* ADD TO CART */}
                    <button
                      className="btn btn-primary w-100 mb-2"
                      onClick={() => addToCart(p)}
                    >
                      Add to Cart
                    </button>

                    {/* REMOVE FROM CART */}
                    <button
                      className="btn btn-outline-danger w-100"
                      onClick={() => removeFromCart(p.product_id)}
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default ProductsPage;