import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // No backend routes needed for this app as it's client-side only
  // All data is stored in localStorage

  const httpServer = createServer(app);
  return httpServer;
}
