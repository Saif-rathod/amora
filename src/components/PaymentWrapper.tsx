// "use client";

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import PaymentForm from "./PaymentForm";

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// interface PaymentWrapperProps {
//   clientSecret: string;
//   amount: number;
//   onSuccess: () => void;
// }

// export default function PaymentWrapper({
//   clientSecret,
//   amount,
//   onSuccess,
// }: PaymentWrapperProps) {
//   const options = {
//     clientSecret,
//     appearance: {
//       theme: "stripe",
//       variables: {
//         colorPrimary: "#e11d48",
//       },
//     },
//   };

//   return (
//     <Elements stripe={stripePromise} options={options}>
//       <PaymentForm amount={amount} onSuccess={onSuccess} />
//     </Elements>
//   );
// } 