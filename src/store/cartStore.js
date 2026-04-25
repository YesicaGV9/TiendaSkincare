import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      // Add item to cart
      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);

        let updatedItems;
        if (existingItem) {
          updatedItems = items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
          );
        } else {
          updatedItems = [...items, { ...product, quantity }];
        }

        set({ items: updatedItems });
        get().calculateTotal();
      },

      // Remove item from cart
      removeItem: (productId) => {
        const items = get().items.filter((item) => item.id !== productId);
        set({ items });
        get().calculateTotal();
      },

      // Update item quantity
      updateQuantity: (productId, quantity) => {
        const items = get().items.map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        );
        set({ items });
        get().calculateTotal();
      },

      // Calculate total
      calculateTotal: () => {
        const items = get().items;
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        set({ total: parseFloat(total.toFixed(2)) });
      },

      // Clear cart
      clearCart: () => {
        set({ items: [], total: 0 });
      },

      // Get cart count
      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage', // localStorage key
    }
  )
);
