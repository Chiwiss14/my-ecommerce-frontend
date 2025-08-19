
"use client";

import React from "react";
import { usePaystackPayment } from "react-paystack";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const PaystackCheckout = ({ product }) => {
  // ✅ Ensure product is provided
  if (!product) {
    console.error("PaystackCheckout component requires a 'product' prop.");
    return null;
  }

  const { user } = useAuth();
  const router = useRouter();

  const config = {
    reference: new Date().getTime().toString(),
    email: user?.email || "customer@example.com",
    amount: product.price * 100, // Paystack requires kobo (NGN * 100)
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = async (reference) => {
    console.log("✅ Payment success:", reference);

    try {
      // Send reference to backend for verification
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reference, productId: product._id }),
          credentials: "include", // include cookies if needed
        }
      );

      const data = await res.json();
      if (res.ok) {
        router.push("/payment-success");
      } else {
        console.error("❌ Verification failed:", data.message);
        router.push("/payment-failed");
      }
    } catch (err) {
      console.error("❌ Error verifying payment:", err);
      router.push("/payment-failed");
    }
  };

  const onClose = () => {
    console.log("⚠ Payment modal closed");
  };

  // ✅ Return the Buy button
  return (
    <button
      onClick={() => initializePayment(onSuccess, onClose)}
      className="w-full py-2.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold mt-4"
    >
      Buy Now
    </button>
  );
};

export default PaystackCheckout;
