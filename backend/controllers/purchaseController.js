const Purchase = require("../models/Purchase.js");
const Supplier = require("../models/Supplier.js");

const updateSupplierBalance = async (supplierId) => {
    const purchases = await Purchase.find({ supplier: supplierId });

    let totalPurchases = 0;
    let totalPaid = 0;

    purchases.forEach((p) => {
        totalPurchases += Number(p.totalAmount || 0);
        totalPaid += Number(p.amountPaid || 0);
    });

    const balance = totalPurchases - totalPaid;

    await Supplier.findByIdAndUpdate(supplierId, {
        totalPurchases,
        totalPaid,
        balance,
    });
};

const addPurchase = async (req, res) => {
    try {
        const {
            supplier,
            category,
            itemName,
            unit,
            quantity,
            rate,
            additionalCosts,
            amountPaid,
            // purchaseFor,          
            // storageLocation,      
            // project: purchaseFor === "Project" ? project : null,
            //     site: storageLocation === "Site" ? site : null,
            // purchasedBy: req.user._id
        } = req.body;

        const newPurchase = await Purchase.create({
            supplier,
            category,
            itemName,
            unit,
            quantity,
            rate,
            additionalCosts,
            amountPaid,
        });

        await updateSupplierBalance(supplier);

        res.status(201).json({
            message: "Purchase added successfully",
            purchase: newPurchase,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find()
            .populate("supplier", "name phone")
            .sort({ createdAt: -1 });
        res.json(purchases);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getPurchasesBySupplier = async (req, res) => {
    try {
        const { supplierId } = req.params;
        const purchases = await Purchase.find({ supplier: supplierId })
            .populate("supplier", "name phone")
            .sort({ createdAt: -1 });

        res.json(purchases);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const editPurchase = async (req, res) => {
    try {
        const { id } = req.params;

        const purchase = await Purchase.findById(id);
        if (!purchase)
            return res.status(404).json({ message: "Purchase not found" });

        Object.assign(purchase, req.body);
        await purchase.save(); // 🔥 triggers pre-save hook

        await updateSupplierBalance(purchase.supplier);

        res.json({
            message: "Purchase updated successfully",
            purchase,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const patchPurchase = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPurchase = await Purchase.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        if (!updatedPurchase)
            return res.status(404).json({ message: "Purchase not found" });

        await updateSupplierBalance(updatedPurchase.supplier);

        res.json({
            message: "Purchase partially updated successfully",
            purchase: updatedPurchase,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deletePurchase = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPurchase = await Purchase.findByIdAndDelete(id);

        if (!deletedPurchase)
            return res.status(404).json({ message: "Purchase not found" });

        await updateSupplierBalance(deletedPurchase.supplier);

        res.json({
            message: "Purchase deleted successfully",
            purchase: deletedPurchase,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    addPurchase,
    getAllPurchases,
    getPurchasesBySupplier,
    editPurchase,
    patchPurchase,
    deletePurchase,
};
