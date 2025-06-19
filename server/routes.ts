import type { Express } from "express";
import { createServer, type Server } from "http";
import { ServerCookieManager } from "./cookie-handler";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Apply server-side cookie management for production CookieYes scanning
  app.use(ServerCookieManager.setEssentialCookies);

  // Cookie management API endpoints
  app.post("/api/cookies/accept", (req, res) => {
    ServerCookieManager.setEssentialCookies(req, res, () => {});
    res.json({ status: 'success', message: 'Cookies accepted' });
  });

  app.post("/api/cookies/reject", (req, res) => {
    ServerCookieManager.clearTrackingCookies(req, res);
    res.json({ status: 'success', message: 'Tracking cookies cleared' });
  });

  // Cookie status endpoint for debugging
  app.get("/api/cookies/status", (req, res) => {
    const cookies = req.headers.cookie || '';
    const cookieCount = cookies ? cookies.split(';').length : 0;
    res.json({
      cookieHeader: cookies,
      cookieCount: cookieCount,
      cookies: cookies.split(';').map(c => c.trim()).filter(c => c)
    });
  });

  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
