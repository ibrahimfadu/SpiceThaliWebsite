import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema, insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all dishes
  app.get("/api/dishes", async (req, res) => {
    try {
      const dishes = await storage.getAllDishes();
      res.json(dishes);
    } catch (error) {
      console.error("Error fetching dishes:", error);
      res.status(500).json({ message: "Failed to fetch dishes" });
    }
  });

  // Get dishes by category
  app.get("/api/dishes/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      if (category !== "north" && category !== "south") {
        return res.status(400).json({ message: "Category must be 'north' or 'south'" });
      }
      const dishes = await storage.getDishesByCategory(category);
      res.json(dishes);
    } catch (error) {
      console.error("Error fetching dishes by category:", error);
      res.status(500).json({ message: "Failed to fetch dishes" });
    }
  });

  // Create order
  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid order data", 
          errors: error.errors 
        });
      }
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.status(201).json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid contact data", 
          errors: error.errors 
        });
      }
      console.error("Error creating contact:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
