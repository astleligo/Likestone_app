const PurchaseHeader = ({ onAdd }) => (
    <div className="flex justify-between items-center p-6 bg-white border-b">
        <h1 className="text-xl font-semibold">Purchases</h1>
        <button
            onClick={onAdd}
            className="px-4 py-2 bg-black text-white rounded-lg"
        >
            + Add Purchase
        </button>
    </div>
);

export default PurchaseHeader;
