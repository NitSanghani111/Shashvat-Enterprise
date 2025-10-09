"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const visitorController_1 = require("../controller/visitorController");
const middleware_1 = require("../middleware/middleware");
const router = (0, express_1.Router)();
// Public route - track visitor
router.post('/track', visitorController_1.trackVisitor);
// Admin routes - get analytics
router.get('/active', middleware_1.authTokenMiddleware, visitorController_1.getActiveUsers);
router.get('/stats', middleware_1.authTokenMiddleware, visitorController_1.getVisitorStats);
router.get('/analytics', middleware_1.authTokenMiddleware, visitorController_1.getDetailedAnalytics);
router.post('/cleanup', middleware_1.authTokenMiddleware, visitorController_1.cleanupInactiveSessions);
exports.default = router;
