import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Restaurant routes
  app.get("/api/restaurants", async (_req, res) => {
    const restaurants = await storage.getRestaurants();
    res.json(restaurants);
  });

  app.get("/api/restaurants/:id", async (req, res) => {
    const restaurant = await storage.getRestaurant(parseInt(req.params.id));
    if (!restaurant) {
      return res.status(404).send("Restaurant not found");
    }
    res.json(restaurant);
  });

  app.get("/api/restaurants/:id/menu", async (req, res) => {
    const menuItems = await storage.getMenuItems(parseInt(req.params.id));
    res.json(menuItems);
  });

  // Order routes
  app.post("/api/orders", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Not authenticated");
    }

    const order = await storage.createOrder({
      ...req.body,
      userId: req.user!.id,
    });
    res.status(201).json(order);
  });

  app.get("/api/orders", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Not authenticated");
    }

    const orders = await storage.getUserOrders(req.user!.id);
    res.json(orders);
  });

  const httpServer = createServer(app);
  return httpServer;
}
