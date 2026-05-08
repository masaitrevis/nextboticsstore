import React, { useState } from "react";

const MakePayment = ({ cart, setCart, user }) => {

  const [phone, setPhone] = useState("");

  const total = cart.reduce((sum, item) => sum + Number(item.product_cost), 0);

  const pay = async () => {

    const formData = new FormData();
    formData.append("amount", total);
    formData.append("phone", phone);

    const res = await fetch(
      "https://masairevis.alwaysdata.net/api/mpesa_payment",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await res.json();
    alert(data.message);

    // 💥 CLEAR CART AFTER PAYMENT INITIATION
    localStorage.removeItem(`cart_${user.email}`);
    setCart([]);
  };

  return (
    <div className="container text-white mt-4">

      <h3>Checkout</h3>

      <div className="card bg-primary p-3">

        {cart.map((item, i) => (
          <div key={i} className="d-flex justify-content-between">
            <span>{item.product_name}</span>
            <span>KES {item.product_cost}</span>
          </div>
        ))}

        <hr />
        <h4>Total: KES {total}</h4>

      </div>

      <input
        className="form-control mt-3"
        placeholder="Phone 2547..."
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button className="btn btn-success w-100 mt-3" onClick={pay}>
        Pay with MPESA
      </button>

    </div>
  );
};

export default MakePayment;