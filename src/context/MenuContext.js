import React, { createContext, useState, useContext } from 'react';

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([
    {
      id: '1',
      name: 'Biriyani & Rice',
      items: [
        {
          id: '1',
          name: 'Chicken Biryani',
          description: 'Fragrant basmati rice cooked with tender chicken and aromatic spices',
          price: 220,
          halfPrice: 120,
          image: 'https://images.unsplash.com/photo-1563379091339-03246963d96f?ixlib=rb-4.0.3&w=400',
          cookingTime: '25 min',
          spicyLevel: 2,
          isVeg: false,
          available: true
        },
        {
          id: '2',
          name: 'Hyderabad Biryani',
          description: 'Authentic Hyderabadi dum biryani with rich flavors and tender meat',
          price: 250,
          halfPrice: 130,
          image: 'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?ixlib=rb-4.0.3&w=400',
          cookingTime: '30 min',
          spicyLevel: 3,
          isVeg: false,
          available: true
        },
        {
          id: '3',
          name: 'Mutton Biryani',
          description: 'Succulent mutton pieces cooked with fragrant rice and spices',
          price: 280,
          image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&w=400',
          cookingTime: '35 min',
          spicyLevel: 2,
          isVeg: false,
          available: true
        },
        {
          id: '4',
          name: 'Paneer Biryani',
          description: 'Flavorful biryani with soft paneer cubes and aromatic rice',
          price: 180,
          image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&w=400',
          cookingTime: '20 min',
          spicyLevel: 1,
          isVeg: true,
          available: true
        },
        {
          id: '5',
          name: 'Egg Biryani',
          description: 'Delicious biryani with boiled eggs and special spices',
          price: 160,
          image: 'https://images.unsplash.com/photo-1598214886806-c87ed84e5a1b?ixlib=rb-4.0.3&w=400',
          cookingTime: '20 min',
          spicyLevel: 2,
          isVeg: false,
          available: true
        }
      ]
    },
    {
      id: '2',
      name: 'Rice',
      items: [
        {
          id: '6',
          name: 'Plain Rice',
          description: 'Steamed basmati rice',
          price: 90,
          image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-4.0.3&w=400',
          cookingTime: '15 min',
          spicyLevel: 0,
          isVeg: true,
          available: true
        },
        {
          id: '7',
          name: 'Jeera Rice',
          description: 'Basmati rice tempered with cumin seeds',
          price: 120,
          image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&w=400',
          cookingTime: '15 min',
          spicyLevel: 0,
          isVeg: true,
          available: true
        },
        {
          id: '8',
          name: 'Veg Fried Rice',
          description: 'Stir-fried rice with fresh vegetables',
          price: 130,
          image: 'https://images.unsplash.com/photo-1603133872878-684f270fb8f5?ixlib=rb-4.0.3&w=400',
          cookingTime: '20 min',
          spicyLevel: 1,
          isVeg: true,
          available: true
        },
        {
          id: '9',
          name: 'Egg Fried Rice',
          description: 'Fried rice with scrambled eggs and vegetables',
          price: 160,
          image: 'https://images.unsplash.com/photo-1641865750370-645fb8c6e5b4?ixlib=rb-4.0.3&w=400',
          cookingTime: '20 min',
          spicyLevel: 1,
          isVeg: false,
          available: true
        },
        {
          id: '10',
          name: 'Chicken Fried Rice',
          description: 'Flavorful fried rice with tender chicken pieces',
          price: 180,
          image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&w=400',
          cookingTime: '25 min',
          spicyLevel: 2,
          isVeg: false,
          available: true
        },
        {
          id: '11',
          name: 'Mix Fried Rice',
          description: 'Special fried rice with chicken, eggs, and vegetables',
          price: 220,
          image: 'https://images.unsplash.com/photo-1603133872642-9dbe4d25887e?ixlib=rb-4.0.3&w=400',
          cookingTime: '25 min',
          spicyLevel: 2,
          isVeg: false,
          available: true
        }
      ]
    },
    {
      id: '3',
      name: 'Roti',
      items: [
        {
          id: '12',
          name: 'Plain Roti',
          description: 'Traditional Indian whole wheat bread',
          price: 10,
          image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&w=400',
          cookingTime: '5 min',
          spicyLevel: 0,
          isVeg: true,
          available: true
        },
        {
          id: '13',
          name: 'Plain Butter Roti',
          description: 'Soft roti with fresh butter',
          price: 15,
          image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&w=400',
          cookingTime: '5 min',
          spicyLevel: 0,
          isVeg: true,
          available: true
        },
        {
          id: '14',
          name: 'Tandoori Roti',
          description: 'Traditional Indian bread baked in clay tandoor',
          price: 15,
          image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&w=400',
          cookingTime: '7 min',
          spicyLevel: 0,
          isVeg: true,
          available: true
        },
        {
          id: '15',
          name: 'Tandoori Butter Roti',
          description: 'Tandoori roti with fresh butter',
          price: 20,
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&w=400',
          cookingTime: '7 min',
          spicyLevel: 0,
          isVeg: true,
          available: true
        },
        {
          id: '16',
          name: 'Tandoori Butter Naan',
          description: 'Leavened bread with butter from tandoor',
          price: 60,
          image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&w=400',
          cookingTime: '10 min',
          spicyLevel: 0,
          isVeg: true,
          available: true
        },
        {
          id: '17',
          name: 'Plain Naan',
          description: 'Classic leavened white bread',
          price: 50,
          image: 'https://images.unsplash.com/photo-1555949969-aa4bd76539d0?ixlib=rb-4.0.3&w=400',
          cookingTime: '10 min',
          spicyLevel: 0,
          isVeg: true,
          available: true
        },
        {
          id: '18',
          name: 'Garlic Naan',
          description: 'Soft naan bread topped with fresh garlic and herbs',
          price: 70,
          image: 'https://images.unsplash.com/photo-1565299588453-b8ec840b7c7e?ixlib=rb-4.0.3&w=400',
          cookingTime: '10 min',
          spicyLevel: 0,
          isVeg: true,
          available: true
        },
        {
          id: '19',
          name: 'Paneer Kulcha Naan',
          description: 'Stuffed bread with spiced paneer filling',
          price: 100,
          image: 'https://images.unsplash.com/photo-1555949969-aa4bd76539d0?ixlib=rb-4.0.3&w=400',
          cookingTime: '12 min',
          spicyLevel: 1,
          isVeg: true,
          available: true
        },
        {
          id: '20',
          name: 'Masala Kulcha',
          description: 'Spiced stuffed bread with potato and herbs',
          price: 120,
          image: 'https://images.unsplash.com/photo-1633945274417-ab438e34b372?ixlib=rb-4.0.3&w=400',
          cookingTime: '12 min',
          spicyLevel: 1,
          isVeg: true,
          available: true
        }
      ]
    },
    {
      id: '4',
      name: 'Paratha',
      items: [
        {
          id: '21',
          name: 'Aloo Paratha',
          description: 'Whole wheat bread stuffed with spiced potatoes',
          price: 60,
          image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&w=400',
          cookingTime: '15 min',
          spicyLevel: 1,
          isVeg: true,
          available: true
        },
        {
          id: '22',
          name: 'Onion Paratha',
          description: 'Flaky paratha stuffed with seasoned onions',
          price: 70,
          image: 'https://images.unsplash.com/photo-1633945274417-ab438e34b372?ixlib=rb-4.0.3&w=400',
          cookingTime: '15 min',
          spicyLevel: 1,
          isVeg: true,
          available: true
        },
        {
          id: '23',
          name: 'Paneer Paratha',
          description: 'Paratha filled with spiced cottage cheese',
          price: 80,
          image: 'https://images.unsplash.com/photo-1555949969-aa4bd76539d0?ixlib=rb-4.0.3&w=400',
          cookingTime: '15 min',
          spicyLevel: 1,
          isVeg: true,
          available: true
        },
        {
          id: '24',
          name: 'Paneer Kulcha',
          description: 'Soft kulcha stuffed with paneer filling',
          price: 120,
          image: 'https://images.unsplash.com/photo-1555949969-aa4bd76539d0?ixlib=rb-4.0.3&w=400',
          cookingTime: '12 min',
          spicyLevel: 1,
          isVeg: true,
          available: true
        },
        {
          id: '25',
          name: 'Veg Kulcha',
          description: 'Kulcha stuffed with mixed vegetables',
          price: 90,
          image: 'https://images.unsplash.com/photo-1633945274417-ab438e34b372?ixlib=rb-4.0.3&w=400',
          cookingTime: '12 min',
          spicyLevel: 1,
          isVeg: true,
          available: true
        },
        {
          id: '26',
          name: 'Masala Kulcha',
          description: 'Spiced kulcha with special masala filling',
          price: 120,
          image: 'https://images.unsplash.com/photo-1633945274417-ab438e34b372?ixlib=rb-4.0.3&w=400',
          cookingTime: '12 min',
          spicyLevel: 2,
          isVeg: true,
          available: true
        }
      ]
    }
  ]);

  const updateItem = (categoryId, itemId, updatedFields) => {
    setMenu(prevMenu => 
      prevMenu.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: category.items.map(item => 
              item.id === itemId ? { ...item, ...updatedFields } : item
            )
          };
        }
        return category;
      })
    );
  };

  const addItem = (categoryId, newItem) => {
    setMenu(prevMenu => 
      prevMenu.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: [...category.items, newItem]
          };
        }
        return category;
      })
    );
  };

  const removeItem = (categoryId, itemId) => {
    setMenu(prevMenu => 
      prevMenu.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: category.items.filter(item => item.id !== itemId)
          };
        }
        return category;
      })
    );
  };

  const value = {
    menu,
    updateItem,
    addItem,
    removeItem
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};