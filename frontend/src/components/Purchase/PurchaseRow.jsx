const PurchaseRow = ({ purchase, onClick }) => (
    <tr
        onClick={onClick}
        className="border-t hover:bg-gray-50 cursor-pointer"
    >
        <td className="p-3 text-center">
            {new Date(purchase.purchaseDate).toLocaleDateString()}
        </td>
        <td className="p-3 font-medium">{purchase.itemName}</td>
        <td className="p-3 font-medium">{purchase.supplier.name}</td>
        <td className="p-3 text-center">
            {purchase.quantity} {purchase.unit}
        </td>
        <td className="p-3 text-center">₹{purchase.amountPaid}</td>
        <td className="p-3 text-center">₹{purchase.totalAmount}</td>
        <td className="p-3 text-center">
            <span
                className={`px-2 py-1 rounded text-xs ${purchase.paymentStatus === "Paid"
                    ? "bg-green-100 text-green-700"
                    : purchase.paymentStatus === "Partial"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
            >
                {purchase.paymentStatus}
            </span>
        </td>
    </tr>
);

export default PurchaseRow;
