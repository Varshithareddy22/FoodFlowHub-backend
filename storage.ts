import session from "express-session";
import createMemoryStore from "memorystore";
import { User, Restaurant, MenuItem, Order, InsertUser } from "@shared/schema";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  sessionStore: session.Store;
  
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Restaurant operations
  getRestaurants(): Promise<Restaurant[]>;
  getRestaurant(id: number): Promise<Restaurant | undefined>;
  
  // Menu operations
  getMenuItems(restaurantId: number): Promise<MenuItem[]>;
  
  // Order operations
  createOrder(order: Omit<Order, "id" | "createdAt">): Promise<Order>;
  getUserOrders(userId: number): Promise<Order[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private restaurants: Map<number, Restaurant>;
  private menuItems: Map<number, MenuItem>;
  private orders: Map<number, Order>;
  sessionStore: session.Store;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.restaurants = new Map();
    this.menuItems = new Map();
    this.orders = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });

    // Seed data
    this.seedData();
  }

  private seedData() {
    // Seed restaurants
    const restaurants: Restaurant[] = [
      {
        id: 1,
        name: "Urban Kitchen",
        description: "Modern fusion cuisine in a contemporary setting",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
        cuisine: "Fusion",
        rating: 4,
      },
      {
        id: 2,
        name: "Pasta Paradise",
        description: "Authentic Italian pasta and pizzas",
        image: "https://images.unsplash.com/photo-1497644083578-611b798c60f3",
        cuisine: "Italian",
        rating: 5,
      },
      // Add more restaurants...
    ];

    const menuItems: MenuItem[] = [
      {
        id: 1,
        restaurantId: 1,
        name: "Classic Burger",
        description: "Juicy beef patty with fresh vegetables",
        price: 1499,
        image: "https://images.unsplash.com/photo-1633457027853-106d9bed16ce",
        category: "Main Course",
      },
      // Add more menu items...
    ];

    restaurants.forEach(r => this.restaurants.set(r.id, r));
    menuItems.forEach(m => this.menuItems.set(m.id, m));
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id, isAdmin: false };
    this.users.set(id, user);
    return user;
  }

  async getRestaurants(): Promise<Restaurant[]> {
    return Array.from(this.restaurants.values());
  }

  async getRestaurant(id: number): Promise<Restaurant | undefined> {
    return this.restaurants.get(id);
  }

  async getMenuItems(restaurantId: number): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values()).filter(
      (item) => item.restaurantId === restaurantId,
    );
  }

  async createOrder(order: Omit<Order, "id" | "createdAt">): Promise<Order> {
    const id = this.currentId++;
    const newOrder: Order = {
      ...order,
      id,
      createdAt: new Date(),
    };
    this.orders.set(id, newOrder);
    return newOrder;
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.userId === userId,
    );
  }
}

export const storage = new MemStorage();
