
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, updateProfile, User as FirebaseUser, updateEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { mockOrders } from "@/lib/mock-orders";
import type { Order } from "@/lib/types";
import Image from "next/image";
import { Loader2 } from "lucide-react";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email(),
});

function ProfileForm({ user }: { user: FirebaseUser }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      const [firstName, ...lastName] = user.displayName?.split(" ") || ["", ""];
      reset({
        firstName,
        lastName: lastName.join(" "),
        email: user.email || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    if (!user) return;

    setLoading(true);
    try {
      const displayName = `${data.firstName} ${data.lastName}`.trim();
      if (user.displayName !== displayName) {
        await updateProfile(user, { displayName });
      }

      if (user.email !== data.email) {
        await updateEmail(user, data.email);
      }
      toast({ title: "Success", description: "Profile updated successfully." });
      reset(data); // Resets the form's dirty state
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" {...register("firstName")} />
          {errors.firstName && <p className="text-destructive text-sm">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" {...register("lastName")} />
           {errors.lastName && <p className="text-destructive text-sm">{errors.lastName.message}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
      </div>
      <Button type="submit" disabled={loading || !isDirty}>
         {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save Changes
      </Button>
    </form>
  );
}

function OrderHistory() {
  const [orders] = useState<Order[]>(mockOrders);

  if (orders.length === 0) {
    return <p>You have no past orders.</p>;
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader className="flex flex-row justify-between items-start">
            <div>
                <CardTitle>Order #{order.id}</CardTitle>
                <CardDescription>Date: {order.date}</CardDescription>
            </div>
            <div className="text-right">
               <p className="font-bold">Total: ₹{order.total.toFixed(2)}</p>
               <p className={`text-sm font-medium ${order.status === 'Delivered' ? 'text-green-500' : 'text-orange-500'}`}>{order.status}</p>
            </div>
          </CardHeader>
          <CardContent>
            <Separator className="my-4" />
            <div className="space-y-4">
                {order.items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-4">
                         <div className="relative w-16 h-20 rounded-md overflow-hidden flex-shrink-0">
                            <Image src={item.product.images[0]} alt={item.product.name} data-ai-hint={item.product.dataAiHint} fill className="object-cover" />
                        </div>
                        <div>
                            <p className="font-semibold">{item.product.name}</p>
                            <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="ml-auto font-medium">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function ProfilePage() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading || !user) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-[80vh]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">My Account</h1>
      </header>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Edit Your Profile</CardTitle>
              <CardDescription>Make changes to your personal information here.</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm user={user} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders">
           <Card>
            <CardHeader>
              <CardTitle>Your Orders</CardTitle>
              <CardDescription>Review your past and current orders.</CardDescription>
            </CardHeader>
            <CardContent>
              <OrderHistory />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
