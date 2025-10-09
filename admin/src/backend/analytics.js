import axios from "axios";
import { backendUrl } from "../globle";

// Track visitor/page view
export async function trackVisitor(sessionId = null) {
  try {
    // Get or create session ID
    let session = sessionId || localStorage.getItem('visitorSessionId');
    
    const response = await axios.post(
      `${backendUrl}/visitors/track`,
      {
        sessionId: session,
        pageUrl: window.location.pathname
      }
    );

    // Store session ID in localStorage
    if (response.data.sessionId) {
      localStorage.setItem('visitorSessionId', response.data.sessionId);
    }

    return response.data;
  } catch (error) {
    console.error("Error tracking visitor:", error);
    return null;
  }
}

// Get detailed analytics (admin only)
export async function getDetailedAnalytics() {
  try {
    const response = await axios.get(
      `${backendUrl}/visitors/analytics`,
      {
        headers: {
          "x-auth-token": localStorage.getItem("authToken"),
        },
      }
    );
    return response.data.analytics;
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return null;
  }
}

// Get visitor stats for specific timeframe
export async function getVisitorStats(timeframe = 'daily') {
  try {
    const response = await axios.get(
      `${backendUrl}/visitors/stats?timeframe=${timeframe}`,
      {
        headers: {
          "x-auth-token": localStorage.getItem("authToken"),
        },
      }
    );
    return response.data.stats;
  } catch (error) {
    console.error("Error fetching visitor stats:", error);
    return null;
  }
}

// Get active users count
export async function getActiveUsers() {
  try {
    const response = await axios.get(
      `${backendUrl}/visitors/active`,
      {
        headers: {
          "x-auth-token": localStorage.getItem("authToken"),
        },
      }
    );
    return response.data.count;
  } catch (error) {
    console.error("Error fetching active users:", error);
    return 0;
  }
}
