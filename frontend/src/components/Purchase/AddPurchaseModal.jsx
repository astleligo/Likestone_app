import { useState } from "react";
import AdditionalCostInput from "./AdditionalCostInput";

const AddPurchaseModal = ({ onClose, onSave }) => {
    const [form, setForm] = useState({
        itemName: "",
        quantity: "",
        rate: "",
        unit: "Kg",
        purchaseFor: "Office",
        storageLocation: "Inventory",
        additionalCosts: [],
    });

    const submit = () => onSave(form);

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white w-full max-w-xl rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold">Add Purchase</h2>

                <input
                    placeholder="Item Name"
                    className="input"
                    onChange={(e) =>
                        setForm({ ...form, itemName: e.target.value })
                    }
                />

                <div className="grid grid-cols-2 gap-3">
                    <input placeholder="Quantity" className="input" />
                    <input placeholder="Rate" className="input" />
                </div>

                <AdditionalCostInput
                    costs={form.additionalCosts}
                    setCosts={(c) => setForm({ ...form, additionalCosts: c })}
                />

                <div className="flex gap-2">
                    <button onClick={onClose} className="flex-1 border rounded py-2">
                        Cancel
                    </button>
                    <button onClick={submit} className="flex-1 bg-black text-white rounded py-2">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPurchaseModal;
