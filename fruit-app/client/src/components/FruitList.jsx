function FruitList({ fruits, onDelete, deletingId }) {
    if (fruits.length === 0) {
        return <p className="empty">No fruits yet. Click "Add" to create one.</p>;
    }

    return (
        <div className="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Unit</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {fruits.map((fruit) => (
                        <tr key={fruit._id}>
                            <td className="mono">{fruit._id}</td>
                            <td>{fruit.name}</td>
                            <td>{fruit.description || "—"}</td>
                            <td>{fruit.unit}</td>
                            <td>{fruit.price.toFixed(2)}</td>
                            <td>{fruit.total.toFixed(2)}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => onDelete(fruit)}
                                    disabled={deletingId === fruit._id}
                                >
                                    {deletingId === fruit._id ? "Deleting..." : "Delete"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FruitList;