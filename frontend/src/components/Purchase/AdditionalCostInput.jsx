const AdditionalCostInput = ({ costs, setCosts }) => {
    const addCost = () =>
        setCosts([...costs, { type: "", amount: "" }]);

    return (
        <div>
            <h3 className="font-medium mb-2">Additional Costs</h3>

            {costs.map((c, i) => (
                <div key={i} className="flex gap-2 mb-2">
                    <input placeholder="Type" className="input" />
                    <input placeholder="Amount" className="input" />
                </div>
            ))}

            <button
                onClick={addCost}
                className="text-sm text-blue-600"
            >
                + Add Cost
            </button>
        </div>
    );
};

export default AdditionalCostInput;
