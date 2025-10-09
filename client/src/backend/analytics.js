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
