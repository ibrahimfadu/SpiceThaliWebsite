import { dishes, orders, contacts, type Dish, type InsertDish, type Order, type InsertOrder, type Contact, type InsertContact } from "@shared/schema";

export interface IStorage {
  // Dishes
  getAllDishes(): Promise<Dish[]>;
  getDishesByCategory(category: string): Promise<Dish[]>;
  getDishById(id: number): Promise<Dish | undefined>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrderById(id: number): Promise<Order | undefined>;
  
  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private dishes: Map<number, Dish>;
  private orders: Map<number, Order>;
  private contacts: Map<number, Contact>;
  private dishIdCounter: number;
  private orderIdCounter: number;
  private contactIdCounter: number;

  constructor() {
    this.dishes = new Map();
    this.orders = new Map();
    this.contacts = new Map();
    this.dishIdCounter = 1;
    this.orderIdCounter = 1;
    this.contactIdCounter = 1;

    // Initialize with menu data
    this.initializeMenuData();
  }

  private initializeMenuData() {
    const menuData = [
      // North Indian Dishes
      { name: "Butter Chicken", description: "Tender chicken in creamy tomato-based curry with aromatic spices", price: "320.00", category: "north", spiceLevel: "Mild", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Chicken Biryani", description: "Fragrant basmati rice cooked with marinated chicken and whole spices", price: "380.00", category: "north", spiceLevel: "Medium", image: "https://images.unsplash.com/photo-1563379091339-03246963d71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Paneer Makhani", description: "Fresh cottage cheese in rich cashew and tomato gravy", price: "280.00", category: "north", spiceLevel: "Mild", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Dal Makhani", description: "Slow-cooked black lentils in creamy butter sauce", price: "220.00", category: "north", spiceLevel: "Mild", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Rogan Josh", description: "Kashmiri lamb curry with aromatic spices and yogurt", price: "420.00", category: "north", spiceLevel: "Medium", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Naan Bread", description: "Fresh baked tandoor bread with butter", price: "45.00", category: "north", spiceLevel: "None", image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Tandoori Chicken", description: "Marinated chicken grilled in traditional tandoor oven", price: "350.00", category: "north", spiceLevel: "Medium", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Palak Paneer", description: "Cottage cheese in spiced spinach gravy", price: "260.00", category: "north", spiceLevel: "Mild", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Chole Bhature", description: "Spiced chickpeas with fluffy fried bread", price: "180.00", category: "north", spiceLevel: "Medium", image: "https://images.unsplash.com/photo-1626132647523-66f85bf6c40c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Aloo Gobi", description: "Dry curry with potatoes and cauliflower", price: "200.00", category: "north", spiceLevel: "Medium", image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Rajma Chawal", description: "Kidney bean curry served with steamed rice", price: "190.00", category: "north", spiceLevel: "Medium", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Keema Naan", description: "Stuffed bread with spiced minced meat", price: "85.00", category: "north", spiceLevel: "Medium", image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Malai Kofta", description: "Cottage cheese dumplings in creamy curry", price: "290.00", category: "north", spiceLevel: "Mild", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Chicken Korma", description: "Mild chicken curry in coconut and cashew sauce", price: "340.00", category: "north", spiceLevel: "Mild", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Basmati Rice", description: "Fragrant long-grain rice, perfectly steamed", price: "120.00", category: "north", spiceLevel: "None", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },

      // South Indian Dishes
      { name: "Masala Dosa", description: "Crispy rice crepe filled with spiced potato curry", price: "140.00", category: "south", spiceLevel: "Medium", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Sambar Rice", description: "Tangy lentil curry served over steamed rice", price: "160.00", category: "south", spiceLevel: "Medium", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Idli Sambar", description: "Steamed rice cakes with lentil curry and chutney", price: "120.00", category: "south", spiceLevel: "Mild", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Chicken Chettinad", description: "Spicy Tamil Nadu style chicken with black pepper", price: "360.00", category: "south", spiceLevel: "Spicy", image: "https://images.unsplash.com/photo-1599461610361-8532fb9981c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Fish Curry", description: "Kerala-style fish in coconut and curry leaf gravy", price: "320.00", category: "south", spiceLevel: "Medium", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Vada", description: "Crispy lentil donuts served with sambar and chutney", price: "80.00", category: "south", spiceLevel: "Mild", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Rasam", description: "Tangy soup with tomatoes, tamarind and spices", price: "90.00", category: "south", spiceLevel: "Medium", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Coconut Rice", description: "Fragrant rice cooked with fresh coconut and curry leaves", price: "150.00", category: "south", spiceLevel: "Mild", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Uttapam", description: "Thick pancake with vegetables and South Indian spices", price: "130.00", category: "south", spiceLevel: "Medium", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Avial", description: "Mixed vegetables in coconut and yogurt curry", price: "200.00", category: "south", spiceLevel: "Mild", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Appam", description: "Fermented rice pancakes with coconut milk", price: "110.00", category: "south", spiceLevel: "None", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Prawn Curry", description: "Fresh prawns in spicy coconut curry sauce", price: "380.00", category: "south", spiceLevel: "Spicy", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Pongal", description: "Comforting rice and lentil dish with ghee and pepper", price: "140.00", category: "south", spiceLevel: "Mild", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Payasam", description: "Traditional sweet rice pudding with cardamom", price: "80.00", category: "south", spiceLevel: "None", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
      { name: "Upma", description: "Savory semolina porridge with vegetables and spices", price: "100.00", category: "south", spiceLevel: "Medium", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", available: true },
    ];

    menuData.forEach(dish => {
      const id = this.dishIdCounter++;
      this.dishes.set(id, { ...dish, id });
    });
  }

  async getAllDishes(): Promise<Dish[]> {
    return Array.from(this.dishes.values());
  }

  async getDishesByCategory(category: string): Promise<Dish[]> {
    return Array.from(this.dishes.values()).filter(dish => dish.category === category);
  }

  async getDishById(id: number): Promise<Dish | undefined> {
    return this.dishes.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderIdCounter++;
    const order: Order = {
      ...insertOrder,
      id,
      createdAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrderById(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactIdCounter++;
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
