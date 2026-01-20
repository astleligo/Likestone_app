import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import PurchaseHeader from "../../components/Purchase/PurchaseHeader";
import PurchaseTable from "../../components/Purchase/PurchaseTable";
import PurchaseModal from "../../components/Purchase/PurchaseModal";
import AddPurchaseModal from "../../components/Purchase/AddPurchaseModal";

const API_URL = import.meta.env.VITE_API_URL;

const PurchasePage = () => {
    const [purchases, setPurchases] = useState([]);
    const [selected, setSelected] = useState(null);
    const [showAdd, setShowAdd] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${API_URL}/purchase`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPurchases(res.data);
            } catch {
                toast.error("Failed to load purchases");
            } finally {
                setLoading(false);
            }
        };
        fetchPurchases();
    }, []);

    console.log(purchases)

    const handleAdd = async (data) => {
        const t = toast.loading("Saving purchase...");
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(`${API_URL}/purchase`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPurchases((prev) => [res.data, ...prev]);
            setShowAdd(false);
            toast.success("Purchase added", { id: t });
        } catch {
            toast.error("Failed to add purchase", { id: t });
        }
    };

    if (loading) return <div className="p-6">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100">
            <PurchaseHeader onAdd={() => setShowAdd(true)} />

            <PurchaseTable
                purchases={purchases}
                onSelect={setSelected}
            />

            {showAdd && (
                <AddPurchaseModal
                    onClose={() => setShowAdd(false)}
                    onSave={handleAdd}
                />
            )}

            {selected && (
                <PurchaseModal
                    purchase={selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </div>
    );
};

export default PurchasePage;
