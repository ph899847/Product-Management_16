
import { useState } from "react";
import "./App.css";

function App() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
  });

  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = product.name.trim();
    const price = Number(product.price);
    const quantity = Number(product.quantity);

    if (
      !name ||
      !product.category ||
      product.price === "" ||
      product.quantity === ""
    ) {
      setError("Please fill in all fields.");
      setSuccess("");
      return;
    }

    if (
      !Number.isFinite(price) ||
      price <= 0 ||
      !Number.isInteger(quantity) ||
      quantity < 0
    ) {
      setError(
        "Enter a valid price greater than 0 and a whole quantity of 0 or more."
      );
      setSuccess("");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      price,
      category: product.category,
      quantity,
    };

    setProducts((prev) => [...prev, newProduct]);

    setProduct({
      name: "",
      price: "",
      category: "",
      quantity: "",
    });

    setError("");
    setSuccess("Product added successfully!");
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    setSuccess("Product deleted successfully!");
    setError("");
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Product Management</h1>
          <p>Manage your products in one place.</p>
        </div>
        <span className="header-icon">📦</span>
      </header>

      <main className="container">
        <section className="form-card">
          <h2>Add New Product</h2>
          <p className="subtitle">
            Enter the product details below.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter product name"
                value={product.name}
                onChange={handleChange}
                maxLength={100}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price (₹)</label>
              <input
                id="price"
                type="number"
                name="price"
                placeholder="Enter price"
                min="0.01"
                step="0.01"
                value={product.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Food">Food</option>
                <option value="Books">Books</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                type="number"
                name="quantity"
                placeholder="Enter quantity"
                min="0"
                step="1"
                value={product.quantity}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <p className="message error" role="alert">
                {error}
              </p>
            )}

            {success && (
              <p className="message success" role="status">
                {success}
              </p>
            )}

            <button type="submit" className="add-btn">
              + Add Product
            </button>
          </form>
        </section>

        <section className="table-card">
          <div className="table-heading">
            <div>
              <h2>Product List</h2>
              <p className="subtitle">
                All products added to the application.
              </p>
            </div>
            <span className="count">
              Total: {products.length}
            </span>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="empty">
                      No products added yet.
                    </td>
                  </tr>
                ) : (
                  products.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td className="product-name">{item.name}</td>
                      <td>
                        ₹
                        {item.price.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td>
                        <span className="category-badge">
                          {item.category}
                        </span>
                      </td>
                      <td>{item.quantity}</td>
                      <td>
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => handleDelete(item.id)}
                          aria-label={`Delete ${item.name}`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer>
        Product Management System | Built with React
      </footer>
    </div>
  );
}

export default App;