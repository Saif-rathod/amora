// "use client"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { supabase } from "@/lib/supabaseClient";
// import { useEffect, useState } from "react";
// import { Users, ShoppingCart, BarChart } from "lucide-react";

// export default function AdminPage() {
//   const [orders, setOrders] = useState<number>(0);
//   const [users, setUsers] = useState<number>(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         const { data: ordersData } = await supabase.from("orders").select("*");
//         const { data: usersData } = await supabase.from("users").select("*");
        
//         setOrders(ordersData?.length || 0);
//         setUsers(usersData?.length || 0);
//       } catch (error) {
//         console.error("Error fetching admin data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card>
//           <CardHeader className="flex items-center justify-between">
//             <CardTitle>Total Orders</CardTitle>
//             <ShoppingCart className="w-6 h-6 text-blue-500" />
//           </CardHeader>
//           <CardContent className="text-2xl font-semibold">
//             {loading ? "Loading..." : orders}
//           </CardContent>
//         </Card>
        
//         <Card>
//           <CardHeader className="flex items-center justify-between">
//             <CardTitle>Total Users</CardTitle>
//             <Users className="w-6 h-6 text-green-500" />
//           </CardHeader>
//           <CardContent className="text-2xl font-semibold">
//             {loading ? "Loading..." : users}
//           </CardContent>
//         </Card>
        
//         <Card>
//           <CardHeader className="flex items-center justify-between">
//             <CardTitle>Analytics</CardTitle>
//             <BarChart className="w-6 h-6 text-purple-500" />
//           </CardHeader>
//           <CardContent className="text-2xl font-semibold">Coming Soon...</CardContent>
//         </Card>
//       </div>

//       <div className="mt-8">
//         <Button className="bg-red-500 text-white">Manage Orders</Button>
//         <Button className="ml-4 bg-blue-500 text-white">View Users</Button>
//       </div>
//     </div>
//   );
// }
