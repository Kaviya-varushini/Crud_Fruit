import { useState, useEffect } from "react";
import FruitList from "./components/FruitList";
import AddFruitForm from "./components/AddFruitForm";
import { getFruits, addFruit, deleteFruit } from "./services/api";
import "./App.css";

function App() {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const loadFruits = async () => {
    try {
      setError("");
      setLoading(true);
      const { data } = await getFruits();
      setFruits(data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load fruits. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFruits();
  }, []);

  const handleAdd = async (fruit) => {
    await addFruit(fruit); // errors are handled inside the form
    await loadFruits(); // refresh without page reload
  };

  const handleDelete = async (fruit) => {
    if (!window.confirm(`Delete "${fruit.name}"? This cannot be undone.`)) return;

    try {
      setDeletingId(fruit._id);
      await deleteFruit(fruit._id);
      await loadFruits();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete fruit");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>🍎 Fruit Manager</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Add
        </button>
      </header>

      {loading && <p className="status">Loading...</p>}
      {error && (
        <p className="error">
          {error} <button className="link" onClick={loadFruits}>Retry</button>
        </p>
      )}
      {!loading && !error && (
        <FruitList fruits={fruits} onDelete={handleDelete} deletingId={deletingId} />
      )}

      {showForm && <AddFruitForm onSubmit={handleAdd} onClose={() => setShowForm(false)} />}
    </div>
  );
}

export default App;