import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const GetProducts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const image_url = 'http://masairevis.alwaysdata.net/static/images/';

  // Fetch products from backend
  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        'http://masairevis.alwaysdata.net/api/getproductdetails'
      );
      setProducts(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container py-5" style={{ minHeight: '100vh', color: 'white' }}>
      <h1 className="text-center mb-4">Available Products</h1>
      {error && <p className="text-danger text-center">{error}</p>}

      <div className="row justify-content-center">
        {products.map((product) => (
          <div className="col-md-4 col-sm-6 mb-4" key={product.id}>
            <div
              className="card shadow-sm"
              style={{
                borderRadius: '15px',
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <img
                src={image_url + product.photo}
                alt={product.product_name}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="text-info">{product.product_name}</h5>
                {/* Display category if available */}
                {product.category_name && (
                  <p className="text-light fst-italic mb-1">
                    Category: {product.category_name}
                  </p>
                )}
                <p className="text-light flex-grow-1">
                  {product.product_description.length > 100
                    ? product.product_description.substring(0, 100) + '...'
                    : product.product_description}
                </p>
                <p className="text-warning fw-bold">Ksh {product.product_cost}</p>
                <button
                  className="btn btn-info w-100 mt-2 fw-bold"
                  onClick={() => navigate('/mpesa', { state: { product } })}
                >
                  Purchase Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetProducts;