// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import PaymentWrapper from "@/components/PaymentWrapper";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";

// export default function CheckoutPage() {
//   const router = useRouter();
//   const [clientSecret, setClientSecret] = useState("");
//   const [amount, setAmount] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch cart total and create payment intent
//     const fetchPaymentIntent = async () => {
//       try {
//         // Replace with your actual cart total
//         const cartTotal = 999;
//         setAmount(cartTotal);

//         const response = await fetch("/api/create-payment-intent", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ amount: cartTotal }),
//         });

//         const data = await response.json();
//         setClientSecret(data.clientSecret);
//       } catch (error) {
//         console.error("Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPaymentIntent();
//   }, []);

//   const handlePaymentSuccess = () => {
//     router.push("/payment/success");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-rose-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-12 px-4">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-2xl font-bold text-center mb-8">Checkout</h1>
//         {clientSecret && (
//           <PaymentWrapper
//             clientSecret={clientSecret}
//             amount={amount}
//             onSuccess={handlePaymentSuccess}
//           />
//         )}
//       </div>
//     </div>
//   );
// } 