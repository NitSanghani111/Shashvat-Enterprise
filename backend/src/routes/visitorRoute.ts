import { Router } from 'express';
import {
  trackVisitor,
  getActiveUsers,
  getVisitorStats,
  getDetailedAnalytics,
  cleanupInactiveSessions
} from '../controller/visitorController';
import { authTokenMiddleware } from '../middleware/middleware';

const router = Router();

// Public route - track visitor
router.post('/track', trackVisitor);

// Admin routes - get analytics
router.get('/active', authTokenMiddleware, getActiveUsers);
router.get('/stats', authTokenMiddleware, getVisitorStats);
router.get('/analytics', authTokenMiddleware, getDetailedAnalytics);
router.post('/cleanup', authTokenMiddleware, cleanupInactiveSessions);

export default router;
