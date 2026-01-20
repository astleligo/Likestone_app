const PurchaseModal = ({ purchase, onClose }) => (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
        <div className="bg-white w-full max-w-xl rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">{purchase.itemName}</h2>

            <div className="grid grid-cols-2 gap-4 text-sm">
                <p><b>Quantity:</b> {purchase.quantity}</p>
                <p><b>Rate:</b> ₹{purchase.rate}</p>
                <p><b>Total:</b> ₹{purchase.totalAmount}</p>
                <p><b>Status:</b> {purchase.paymentStatus}</p>
                <p><b>Storage:</b> {purchase.storageLocation}</p>
                <p><b>Purpose:</b> {purchase.purchaseFor}</p>
            </div>

            {purchase.additionalCosts?.length > 0 && (
                <div>
                    <h3 className="font-medium">Additional Costs</h3>
                    {purchase.additionalCosts.map((c, i) => (
                        <p key={i}>• {c.type} – ₹{c.amount}</p>
                    ))}
                </div>
            )}

            <button
                onClick={onClose}
                className="w-full mt-4 py-2 bg-gray-900 text-white rounded"
            >
                Close
            </button>
        </div>
    </div>
);

export default PurchaseModal;
