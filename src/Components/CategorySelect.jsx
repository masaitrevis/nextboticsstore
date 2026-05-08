// CategorySelect.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function CategorySelect({ setCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/getcategories")
      .then(res => setCategories(res.data));
  }, []);

  return (
    <select onChange={(e) => setCategory(e.target.value)}>
      <option>Select Category</option>
      {categories.map(cat => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}

export default CategorySelect;