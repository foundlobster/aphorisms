import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve audio files with appropriate headers
  app.get('/api/audio/:filename', (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.resolve(import.meta.dirname, '..', 'attached_assets', fileName);
    
    // Check if file exists
    if (fs.existsSync(filePath)) {
      res.set({
        'Content-Type': 'audio/wav',
        'Content-Disposition': `inline; filename="${fileName}"`,
        'Cache-Control': 'public, max-age=31536000' // Cache for 1 year
      });
      
      // Create read stream and pipe to response
      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
    } else {
      res.status(404).send('Audio file not found');
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
