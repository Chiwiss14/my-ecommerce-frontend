"use client";

import React from "react";
import { usePaystackPayment } from "react-paystack";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const PaystackCheckout = ({ product }) => {
  // ✅ All hooks must be called at the top of the function
  const { user } = useAuth();
  const router = useRouter();

  // ✅ Use optional chaining to safely access 'product.price'
  const config = {
    reference: new Date().getTime().toString(),
    email: user?.email || "customer@example.com",
    amount: product?.price ? product.price * 100 : 0, 
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  };
  
  // ✅ Call the hook after 'config' is defined
  const initializePayment = usePaystackPayment(config);

  // ❌ Now, you can add your conditional return
  if (!product) {
    console.error("PaystackCheckout component requires a 'product' prop.");
    return null;
  }

  const onSuccess = async (reference) => {
    console.log("✅ Payment success:", reference);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reference, productId: product._id }),
          credentials: "include", 
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