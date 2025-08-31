"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { WalletCards } from "lucide-react";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  paymentMethod: z.string().default("card"),
  // Card fields
  cardName: z.string().optional(),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvc: z.string().optional(),
  // UPI field
  upiId: z.string().optional(),
  // Net banking field
  netBankingBank: z.string().optional(),
}).refine(data => {
    if (data.paymentMethod === 'card') {
        return !!data.cardName && !!data.cardNumber && !!data.expiryDate && !!data.cvc;
    }
    return true;
}, {
    message: "Card details are required",
    path: ['cardName'], // you can pick any of the card fields
});


export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useAppContext();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      country: "India",
      postalCode: "",
      paymentMethod: "card",
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Checkout submitted:", values);
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. Your order is being processed.",
    });
    clearCart();
    router.push('/');
  }
  
  const paymentMethod = form.watch('paymentMethod');

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Checkout</h1>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-3 gap-8 lg:gap-12">
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader><CardTitle>Shipping Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="firstName" render={({ field }) => (
                    <FormItem><FormLabel>First Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="lastName" render={({ field }) => (
                    <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid sm:grid-cols-3 gap-4">
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="country" render={({ field }) => (
                      <FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="postalCode" render={({ field }) => (
                      <FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="card" className="w-full" onValueChange={(value) => form.setValue('paymentMethod', value)}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="card">Credit/Debit Card</TabsTrigger>
                    <TabsTrigger value="other">UPI / Net Banking</TabsTrigger>
                  </TabsList>
                  <TabsContent value="card" className="pt-4 space-y-4">
                     <p className="text-sm text-muted-foreground">Powered by Razorpay (simulation)</p>
                     <FormField control={form.control} name="cardName" render={({ field }) => (
                      <FormItem><FormLabel>Name on Card</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="cardNumber" render={({ field }) => (
                      <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="---- ---- ---- ----" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="expiryDate" render={({ field }) => (
                        <FormItem><FormLabel>Expiry (MM/YY)</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="cvc" render={({ field }) => (
                        <FormItem><FormLabel>CVC</FormLabel><FormControl><Input placeholder="---" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                  </TabsContent>
                  <TabsContent value="other" className="pt-4">
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-medium mb-2">Pay with UPI</h3>
                            <div className="flex gap-4">
                                <Button type="button" variant="outline" className="flex-1 justify-start gap-2"><WalletCards/> GPay</Button>
                                <Button type="button" variant="outline" className="flex-1 justify-start gap-2"><WalletCards/> PhonePe</Button>
                                <Button type="button" variant="outline" className="flex-1 justify-start gap-2"><WalletCards/> Paytm</Button>
                            </div>
                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
                                <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">OR</span></div>
                            </div>
                            <FormField control={form.control} name="upiId" render={({ field }) => (
                                <FormItem><FormLabel>Enter UPI ID</FormLabel><FormControl><Input placeholder="yourname@bank" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>
                        <Separator/>
                        <div>
                            <h3 className="font-medium mb-2">Net Banking</h3>
                             <FormField
                                control={form.control}
                                name="netBankingBank"
                                render={({ field }) => (
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 gap-2">
                                  <div className="flex items-center space-x-2"><RadioGroupItem value="sbi" id="sbi" /><Label htmlFor="sbi">SBI Online</Label></div>
                                  <div className="flex items-center space-x-2"><RadioGroupItem value="hdfc" id="hdfc" /><Label htmlFor="hdfc">HDFC Bank</Label></div>
                                  <div className="flex items-center space-x-2"><RadioGroupItem value="icici" id="icici" /><Label htmlFor="icici">ICICI Bank</Label></div>
                                  <div className="flex items-center space-x-2"><RadioGroupItem value="axis" id="axis" /><Label htmlFor="axis">Axis Bank</Label></div>
                                </RadioGroup>
                                )}
                            />
                        </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                       <div className="relative w-10 h-10 rounded-sm overflow-hidden flex-shrink-0">
                         <Image src={item.product.images[0]} alt={item.product.name} data-ai-hint={item.product.dataAiHint} fill className="object-cover" />
                       </div>
                       <div>
                         <p className="font-medium">{item.product.name}</p>
                         <p className="text-muted-foreground">Qty: {item.quantity}</p>
                       </div>
                    </div>
                    <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
             <Button type="submit" size="lg" className="w-full mt-6">
                Pay ₹{cartTotal.toFixed(2)}
             </Button>
          </div>

        </form>
      </Form>
    </div>
  );
}
