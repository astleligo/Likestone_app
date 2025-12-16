const mongoose = require("mongoose");
const Inventory = require("./Inventory"); // Import for post-save updates

const AdditionalCostSchema = new mongoose.Schema(
    {
        type: { type: String, required: true }, // e.g. 'Labour', 'Vehicle Rent'
        amount: { type: Number, required: true, min: 0 },
        notes: { type: String, trim: true },
    },
    { _id: false }
);

const InvoiceFileSchema = new mongoose.Schema(
    {
        filename: String,
        url: String, // if uploaded to S3 or server
    },
    { _id: false }
);

const purchaseSchema = new mongoose.Schema(
    {
        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        itemName: {
            type: String,
            required: true,
            trim: true,
        },
        unit: {
            type: String,
            enum: [
                "Bag",
                "Kg",
                "Ton",
                "Litre",
                "Piece",
                "Box",
                "Bundle",
                "Foot",
                "Meter",
                "Dozen",
                "Set",
                "Sheet",
                "Packet",
                "Roll",
                "Carton",
            ],
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 0,
        },
        rate: {
            type: Number,
            required: true,
            min: 0,
        },
        additionalCosts: {
            type: [AdditionalCostSchema],
            default: [],
        },
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        purchaseDate: {
            type: Date,
            default: Date.now,
        },

        // Payment Info
        modeOfPayment: {
            type: String,
            enum: ["Cash", "Bank", "UPI", "Cheque", "Credit"],
            default: "Credit",
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Partial", "Paid"],
            default: "Pending",
        },
        amountPaid: {
            type: Number,
            default: 0,
            min: 0,
        },
        paidOn: {
            type: Date,
        },

        // Who handled the purchase
        purchasedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        // Purpose
        purchaseFor: {
            type: String,
            enum: ["Office", "Project"],
            required: true,
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
        },

        // Storage information
        storageLocation: {
            type: String,
            enum: ["Site", "Inventory"],
            required: true,
        },

        // If stored directly to a project site
        site: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Site",
        },

        // Invoice upload metadata
        invoice: InvoiceFileSchema,

        // Internal bookkeeping
        inventoryUpdated: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

/* 🧮 Auto-calculate totalAmount before save */
purchaseSchema.pre("save", function (next) {
    const qty = Number(this.quantity || 0);
    const rate = Number(this.rate || 0);
    const baseTotal = qty * rate;
    const additionalTotal = (this.additionalCosts || []).reduce(
        (sum, c) => sum + Number(c.amount || 0),
        0
    );
    this.totalAmount = baseTotal + additionalTotal;

    // auto-set payment status
    if (this.amountPaid >= this.totalAmount) {
        this.paymentStatus = "Paid";
        if (!this.paidOn) this.paidOn = new Date();
    } else if (this.amountPaid > 0) {
        this.paymentStatus = "Partial";
    } else {
        this.paymentStatus = "Pending";
    }

    next();
});

/* 🔁 Post-save: Update Inventory if goods are stored in Inventory */
purchaseSchema.post("save", async function (doc) {
    try {
        if (doc.storageLocation === "Inventory" && !doc.inventoryUpdated) {
            const existingItem = await Inventory.findOne({
                itemName: doc.itemName,
                category: doc.category,
                unit: doc.unit,
                supplier: doc.supplier,
            });

            if (existingItem) {
                // Increment existing quantity
                existingItem.quantity += doc.quantity;
                existingItem.rate = doc.rate; // optional: update latest rate
                await existingItem.save();
            } else {
                // Create new inventory item
                await Inventory.create({
                    category: doc.category,
                    itemName: doc.itemName,
                    supplier: doc.supplier,
                    unit: doc.unit,
                    quantity: doc.quantity,
                    rate: doc.rate,
                    purchaseDate: doc.purchaseDate,
                    billFile: doc.invoice?.url || "",
                });
            }

            // Mark purchase as updated to prevent duplicate increments
            doc.inventoryUpdated = true;
            await doc.save();
        }
    } catch (err) {
        console.error("Error updating inventory after purchase:", err);
    }
});

const Purchase = mongoose.model("Purchase", purchaseSchema);
module.exports = Purchase;
