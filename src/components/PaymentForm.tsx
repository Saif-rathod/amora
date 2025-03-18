// "use client";

// import { useState } from "react";
// import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";

// interface PaymentFormProps {
//   amount: number;
//   onSuccess: () => void;
// }

// export default function PaymentForm({ amount, onSuccess }: PaymentFormProps) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     setIsProcessing(true);

//     try {
//       const { error } = await stripe.confirmPayment({
//         elements,
//         confirmParams: {
//           return_url: `${window.location.origin}/payment/success`,
//         },
//       });

//       if (error) {
//         toast.error(error.message);
//       } else {
//         onSuccess();
//         toast.success("Payment successful!");
//       }
//     } catch (error) {
//       console.error("Payment error:", error);
//       toast.error("Payment failed. Please try again.");
//     }

//     setIsProcessing(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6">
//       <PaymentElement />
//       <Button
//         type="submit"
//         disabled={!stripe || isProcessing}
//         className="w-full bg-rose-600 hover:bg-rose-700"
//       >
//         {isProcessing ? "Processing..." : `Pay ₹${amount}`}
//       </Button>
//     </form>
//   );
// } 