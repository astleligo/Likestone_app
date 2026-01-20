import React from "react";
import { X } from "lucide-react";

const SupplierDetailsModal = ({ supplier, onClose }) => {
    if (!supplier) return null;

    const {
        name,
        phone,
        category,
        totalPurchases,
        balance,
        accountDetails = {},
    } = supplier;

    return (
        <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl p-6 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                >
                    <X size={22} />
                </button>

                {/* Title */}
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Supplier Details
                </h2>

                {/* Supplier Info */}
                <div className="flex items-center justify-between p-4 w-full">

                    <div className="space-y-3 p-2">
                        <div className="flex justify-between gap-2">
                            <p className="font-medium text-gray-700">Name:</p>
                            <p>{name || "N/A"}</p>
                        </div>

                        <div className="flex justify-between gap-2">
                            <p className="font-medium text-gray-700">Phone:</p>
                            <p>{phone || "N/A"}</p>
                        </div>

                        <div className="flex justify-between gap-2">
                            <p className="font-medium text-gray-700">Category:</p>
                            <p>{category || "N/A"}</p>
                        </div>

                        <div className="flex justify-between gap-2">
                            <p className="font-medium text-gray-700">Total Purchases:</p>
                            <p>₹{totalPurchases || 0}</p>
                        </div>

                        <div className="flex justify-between gap-2">
                            <p className="font-medium text-gray-700">Balance:</p>
                            <p className="text-red-600 font-semibold">
                                ₹{balance?.toFixed(2) || 0}
                            </p>
                        </div>
                    </div>

                    {/* Account Details */}
                    <div className="flex items-center flex-col p-2">

                        <h3 className="text-lg font-semibold mb-2 text-gray-800">
                            Account Details
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <p className="font-medium text-gray-700">Account Holder:</p>
                                <p>{accountDetails.accountHolderName || "N/A"}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-medium text-gray-700">Bank Name:</p>
                                <p>{accountDetails.bankName || "N/A"}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-medium text-gray-700">Account Number:</p>
                                <p>{accountDetails.accountNumber || "N/A"}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-medium text-gray-700">IFSC Code:</p>
                                <p>{accountDetails.ifscCode || "N/A"}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-medium text-gray-700">UPI ID:</p>
                                <p>{accountDetails.upiId || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full flex items-center justify-center-bg-blue-400">

                </div>

                {/* Close Button */}
                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SupplierDetailsModal;
