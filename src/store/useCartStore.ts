import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string | null;
  quantity: number;
  stock: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      setIsOpen: (isOpen) => set({ isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      
      addItem: (newItem) => set((state) => {
        const existingItem = state.items.find((item) => item.id === newItem.id);
        const addQty = newItem.quantity || 1;
        
        if (existingItem) {
          // If item exists, increase quantity, but don't exceed stock
          const newQuantity = Math.min(existingItem.quantity + addQty, existingItem.stock);
          return {
            items: state.items.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: newQuantity }
                : item
            ),
          };
        }
        
        // New item
        return {
          items: [...state.items, { ...newItem, quantity: addQty }],
        };
      }),
      
      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      })),
      
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((item) => {
          if (item.id === id) {
            // Ensure quantity is between 1 and available stock
            const validQuantity = Math.max(1, Math.min(quantity, item.stock));
            return { ...item, quantity: validQuantity };
          }
          return item;
        }),
      })),
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
    }),
    {
      name: 'bcl-cart-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      skipHydration: true, // we will manually hydrate to avoid Next.js hydration mismatches
    }
  )
);
