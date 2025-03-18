// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import { ShoppingBag, ArrowLeft, Gift } from "lucide-react";
// import { useShoppingCart } from "@/lib/hooks/use-shopping-cart";
// import { CartItem } from "@/components/ui/cart-item";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";

// export default function CartPage() {
//   const { cart, removeItem, updateQuantity, getTotal } = useShoppingCart();

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50">
//       <div className="container mx-auto px-4 py-12">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <Link href="/occasions">
//             <Button variant="ghost" className="group hover:bg-rose-50">
//               <ArrowLeft className="h-5 w-5 mr-2 text-rose-600 group-hover:transform group-hover:-translate-x-1 transition-transform" />
//               <span className="text-gray-600">Continue Shopping</span>
//             </Button>
//           </Link>
//           <div className="flex items-center gap-2">
//             <ShoppingBag className="h-6 w-6 text-rose-600" />
//             <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
//           </div>
//         </div>

//         {cart.length === 0 ? (
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center py-16"
//           >
//             <div className="flex justify-center mb-6">
//               <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center">
//                 <ShoppingBag className="h-8 w-8 text-rose-600" />
//               </div>
//             </div>
//             <h2 className="text-2xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
//             <p className="text-gray-600 mb-8">Add some lovely gifts to make someone's day special!</p>
//             <Link href="/occasions">
//               <Button className="bg-rose-600 hover:bg-rose-700 text-white rounded-full px-8">
//                 Start Shopping
//               </Button>
//             </Link>
//           </motion.div>
//         ) : (
//           <motion.div 
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="grid grid-cols-1 lg:grid-cols-3 gap-8"
//           >
//             {/* Cart Items */}
//             <div className="lg:col-span-2 space-y-6">
//               {cart.map((item) => (
//                 <motion.div key={item.id} variants={itemVariants}>
//                   <CartItem
//                     item={item}
//                     onRemove={() => removeItem(item.id)}
//                     onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)}
//                   />
//                 </motion.div>
//               ))}
//             </div>

//             {/* Order Summary */}
//             <div className="lg:col-span-1">
//               <Card className="p-6 bg-white/70 backdrop-blur-sm border-none shadow-lg rounded-3xl sticky top-4">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
//                     <Gift className="h-5 w-5 text-rose-600" />
//                   </div>
//                   <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="flex justify-between text-gray-600">
//                     <span>Subtotal</span>
//                     <span>₹{getTotal().toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between text-gray-600">
//                     <span>Shipping</span>
//                     <span className="text-rose-600">Free</span>
//                   </div>
//                   <div className="border-t border-gray-200 pt-4 mt-4">
//                     <div className="flex justify-between items-center">
//                       <span className="text-lg font-medium text-gray-900">Total</span>
//                       <span className="text-2xl font-semibold text-rose-600">
//                         ₹{getTotal().toLocaleString()}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <Button 
//                   className="w-full mt-6 bg-rose-600 hover:bg-rose-700 text-white h-12 rounded-2xl text-lg font-medium transition-transform hover:scale-[1.02]"
//                   onClick={() => {/* Handle checkout */}}
//                 >
//                   Proceed to Checkout
//                 </Button>

//                 <p className="text-center text-sm text-gray-500 mt-4">
//                   Secure checkout powered by Stripe
//                 </p>
//               </Card>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }
