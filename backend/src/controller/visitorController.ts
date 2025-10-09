import { Request, Response } from 'express';
import { prisma } from '../index';
import { randomUUID } from 'crypto';

// Track a visitor/page view
export const trackVisitor = async (req: Request, res: Response) => {
  try {
    const { sessionId, pageUrl } = req.body;
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';

    let session = sessionId || randomUUID();

    // Check if session exists
    const existingVisitor = await prisma.visitorStats.findUnique({
      where: { sessionId: session }
    });

    if (existingVisitor) {
      // Update existing session
      await prisma.visitorStats.update({
        where: { sessionId: session },
        data: {
          lastActivity: new Date(),
          pageViews: existingVisitor.pageViews + 1,
          isActive: true
        }
      });
    } else {
      // Create new visitor record
      await prisma.visitorStats.create({
        data: {
          sessionId: session,
          ipAddress: ipAddress as string,
          userAgent: userAgent as string,
          visitDate: new Date(),
          lastActivity: new Date(),
          pageViews: 1,
          isActive: true
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Visitor tracked successfully',
      sessionId: session
    });
  } catch (error: any) {
    console.error('Error tracking visitor:', error);
    res.status(500).json({
      success: false,
      message: 'Error tracking visitor',
      error: error.message
    });
  }
};

// Get active users count (last 5 minutes)
export const getActiveUsers = async (req: Request, res: Response) => {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const activeUsers = await prisma.visitorStats.count({
      where: {
        lastActivity: {
          gte: fiveMinutesAgo
        },
        isActive: true
      }
    });

    res.status(200).json({
      success: true,
      count: activeUsers,
      timeframe: 'realtime'
    });
  } catch (error: any) {
    console.error('Error getting active users:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting active users',
      error: error.message
    });
  }
};

// Get visitor statistics (daily, weekly, monthly)
export const getVisitorStats = async (req: Request, res: Response) => {
  try {
    const { timeframe } = req.query; // 'daily', 'weekly', 'monthly'
    const now = new Date();
    let startDate: Date;
    let previousStartDate: Date;
    let previousEndDate: Date;

    switch (timeframe) {
      case 'daily':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        previousStartDate = new Date(startDate);
        previousStartDate.setDate(previousStartDate.getDate() - 1);
        previousEndDate = new Date(startDate);
        break;
      case 'weekly':
        const dayOfWeek = now.getDay();
        startDate = new Date(now);
        startDate.setDate(now.getDate() - dayOfWeek);
        startDate.setHours(0, 0, 0, 0);
        previousStartDate = new Date(startDate);
        previousStartDate.setDate(previousStartDate.getDate() - 7);
        previousEndDate = new Date(startDate);
        break;
      case 'monthly':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        previousStartDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        previousEndDate = new Date(startDate);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        previousStartDate = new Date(startDate);
        previousStartDate.setDate(previousStartDate.getDate() - 1);
        previousEndDate = new Date(startDate);
    }

    // Get current period visitors
    const currentVisitors = await prisma.visitorStats.count({
      where: {
        visitDate: {
          gte: startDate
        }
      }
    });

    // Get previous period visitors for growth calculation
    const previousVisitors = await prisma.visitorStats.count({
      where: {
        visitDate: {
          gte: previousStartDate,
          lt: previousEndDate
        }
      }
    });

    // Calculate growth percentage
    let growth = 0;
    if (previousVisitors > 0) {
      growth = ((currentVisitors - previousVisitors) / previousVisitors) * 100;
    } else if (currentVisitors > 0) {
      growth = 100;
    }

    // Get total page views
    const pageViewsData = await prisma.visitorStats.aggregate({
      where: {
        visitDate: {
          gte: startDate
        }
      },
      _sum: {
        pageViews: true
      }
    });

    // Get unique visitors (for more accurate count)
    const uniqueVisitors = await prisma.visitorStats.findMany({
      where: {
        visitDate: {
          gte: startDate
        }
      },
      select: {
        sessionId: true
      },
      distinct: ['sessionId']
    });

    res.status(200).json({
      success: true,
      timeframe: timeframe || 'daily',
      stats: {
        totalVisitors: currentVisitors,
        uniqueVisitors: uniqueVisitors.length,
        totalPageViews: pageViewsData._sum.pageViews || 0,
        growth: growth.toFixed(1),
        isIncrease: growth >= 0
      }
    });
  } catch (error: any) {
    console.error('Error getting visitor stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting visitor stats',
      error: error.message
    });
  }
};

// Get detailed analytics (for admin dashboard)
export const getDetailedAnalytics = async (req: Request, res: Response) => {
  try {
    const now = new Date();

    // Today's stats
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayVisitors = await prisma.visitorStats.count({
      where: { visitDate: { gte: todayStart } }
    });

    // This week's stats
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    weekStart.setHours(0, 0, 0, 0);
    const weekVisitors = await prisma.visitorStats.count({
      where: { visitDate: { gte: weekStart } }
    });

    // This month's stats
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthVisitors = await prisma.visitorStats.count({
      where: { visitDate: { gte: monthStart } }
    });

    // All time stats
    const totalVisitors = await prisma.visitorStats.count();

    // Active users (last 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const activeNow = await prisma.visitorStats.count({
      where: {
        lastActivity: { gte: fiveMinutesAgo },
        isActive: true
      }
    });

    // Calculate growths
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const yesterdayEnd = new Date(todayStart);
    const yesterdayVisitors = await prisma.visitorStats.count({
      where: {
        visitDate: {
          gte: yesterdayStart,
          lt: yesterdayEnd
        }
      }
    });

    const lastWeekStart = new Date(weekStart);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);
    const lastWeekVisitors = await prisma.visitorStats.count({
      where: {
        visitDate: {
          gte: lastWeekStart,
          lt: weekStart
        }
      }
    });

    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(monthStart);
    const lastMonthVisitors = await prisma.visitorStats.count({
      where: {
        visitDate: {
          gte: lastMonthStart,
          lt: lastMonthEnd
        }
      }
    });

    // Calculate growth percentages
    const dailyGrowth = yesterdayVisitors > 0 
      ? (((todayVisitors - yesterdayVisitors) / yesterdayVisitors) * 100).toFixed(1)
      : todayVisitors > 0 ? '100.0' : '0.0';

    const weeklyGrowth = lastWeekVisitors > 0
      ? (((weekVisitors - lastWeekVisitors) / lastWeekVisitors) * 100).toFixed(1)
      : weekVisitors > 0 ? '100.0' : '0.0';

    const monthlyGrowth = lastMonthVisitors > 0
      ? (((monthVisitors - lastMonthVisitors) / lastMonthVisitors) * 100).toFixed(1)
      : monthVisitors > 0 ? '100.0' : '0.0';

    res.status(200).json({
      success: true,
      analytics: {
        activeNow,
        today: {
          count: todayVisitors,
          growth: dailyGrowth,
          isIncrease: Number(dailyGrowth) >= 0
        },
        week: {
          count: weekVisitors,
          growth: weeklyGrowth,
          isIncrease: Number(weeklyGrowth) >= 0
        },
        month: {
          count: monthVisitors,
          growth: monthlyGrowth,
          isIncrease: Number(monthlyGrowth) >= 0
        },
        total: totalVisitors
      }
    });
  } catch (error: any) {
    console.error('Error getting detailed analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting detailed analytics',
      error: error.message
    });
  }
};

// Cleanup inactive sessions (run periodically)
export const cleanupInactiveSessions = async (req: Request, res: Response) => {
  try {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

    const result = await prisma.visitorStats.updateMany({
      where: {
        lastActivity: {
          lt: thirtyMinutesAgo
        },
        isActive: true
      },
      data: {
        isActive: false
      }
    });

    res.status(200).json({
      success: true,
      message: `Cleaned up ${result.count} inactive sessions`
    });
  } catch (error: any) {
    console.error('Error cleaning up sessions:', error);
    res.status(500).json({
      success: false,
      message: 'Error cleaning up sessions',
      error: error.message
    });
  }
};
