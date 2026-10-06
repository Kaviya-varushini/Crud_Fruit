import { useState } from "react";

const initialForm = { name: "", description: "", unit: "", price: "" };

function AddFruitForm({ onSubmit, onClose }) {
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.name.trim()) return setError("Name is required");
        if (form.unit === "" || Number(form.unit) < 0) return setError("Unit must be 0 or more");
        if (form.price === "" || Number(form.price) < 0) return setError("Price must be 0 or more");

        try {
            setSubmitting(true);
            await onSubmit({
                name: form.name.trim(),
                description: form.description.trim(),
                unit: Number(form.unit),
                price: Number(form.price),
            });
            setForm(initialForm);
            onClose();
        } catch (err) {
            const data = err.response?.data;
            setError(data?.errors?.join(", ") || data?.message || "Failed to add fruit");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>Add Fruit</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name *
                        <input name="name" value={form.name} onChange={handleChange} />
                    </label>

                    <label>
                        Description
                        <textarea name="description" rows="3" value={form.description} onChange={handleChange} />
                    </label>

                    <label>
                        Unit (quantity) *
                        <input type="number" min="0" step="1" name="unit" value={form.unit} onChange={handleChange} />
                    </label>

                    <label>
                        Price (per unit) *
                        <input type="number" min="0" step="0.01" name="price" value={form.price} onChange={handleChange} />
                    </label>

                    <p className="hint">Total is calculated automatically after saving.</p>

                    {error && <p className="error">{error}</p>}

                    <div className="modal-actions">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={submitting}>
                            {submitting ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddFruitForm;