"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function createOrder(data: {
  addressId: string;
  items: { id: string; quantity: number; price: number }[];
  totalAmount: number;
}) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  if (!data.items || data.items.length === 0) {
    return { error: "Cart is empty" };
  }

  try {
    const address = await prisma.address.findUnique({
      where: { id: data.addressId }
    });

    if (!address || address.userId !== session.user.id) {
      return { error: "Invalid address selected" };
    }

    // Save order
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        totalAmount: data.totalAmount,
        status: "PENDING",
        shippingAddress: address as any,
        items: {
          create: data.items.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          }))
        }
      }
    });

    // Decrease stock for each product
    for (const item of data.items) {
      await prisma.product.update({
        where: { id: item.id },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      });
    }

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Error creating order:", error);
    return { error: "Failed to create order" };
  }
}
