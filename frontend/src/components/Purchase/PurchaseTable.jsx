import PurchaseRow from "./PurchaseRow";

const PurchaseTable = ({ purchases, onSelect }) => (
    <div className="p-6">
        <table className="w-full bg-white rounded-xl overflow-hidden">
            <thead className="bg-gray-100 text-sm">
                <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3 text-left">Item</th>
                    <th className="p-3 text-left">Supplier</th>
                    <th className="p-3">Qty</th>
                    <th className="p-3">Paid</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Payment</th>
                </tr>
            </thead>
            <tbody>
                {purchases.map((p) => (
                    <PurchaseRow
                        key={p._id}
                        purchase={p}
                        onClick={() => onSelect(p)}
                    />
                ))}
            </tbody>
        </table>
    </div>
);

export default PurchaseTable;
