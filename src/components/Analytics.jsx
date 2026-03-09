import { useState, useEffect, useCallback } from 'react';

// Analytics uses in-memory state only — no localStorage needed.
// This permanently avoids QuotaExceededError.
const MAX_INTERACTIONS = 50;
const MAX_SESSIONS = 10;
const MAX_PAGE_VISITS = 20;

const Analytics = () => {
  const [, setAnalyticsData] = useState({
    pageViews: {},
    sessions: [],
    userAgent: '',
    screenResolution: '',
    referrer: '',
    timeOnSite: 0,
    interactions: []
  });

  const generateSessionId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const trackInteraction = useCallback((type, data) => {
    const interaction = {
      type,
      data,
      timestamp: new Date().toISOString(),
      page: window.location.pathname
    };
    setAnalyticsData(prev => ({
      ...prev,
      interactions: [...(prev.interactions || []), interaction].slice(-MAX_INTERACTIONS)
    }));
  }, []);

  const setupInteractionTracking = useCallback(() => {
    const handleClick = (event) => {
      trackInteraction('click', {
        element: event.target.tagName,
        id: event.target.id,
        text: event.target.textContent?.substring(0, 50)
      });
    };

    let scrollTimeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight > 0) {
          const pct = Math.round((window.scrollY / scrollHeight) * 100);
          if (pct >= 0 && pct <= 100) trackInteraction('scroll', { percentage: pct });
        }
      }, 100);
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [trackInteraction]);

  const trackSessionEnd = useCallback((timeSpent) => {
    setAnalyticsData(prev => {
      const sessions = [...prev.sessions];
      if (sessions.length > 0) {
        const last = sessions[sessions.length - 1];
        last.endTime = new Date().toISOString();
        last.duration = timeSpent;
      }
      return { ...prev, sessions, timeOnSite: (prev.timeOnSite || 0) + timeSpent };
    });
  }, []);

  const initializeAnalytics = useCallback(() => {
    setAnalyticsData(prev => ({
      ...prev,
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      referrer: document.referrer || 'direct'
    }));
  }, []);

  const trackPageView = useCallback(() => {
    const currentPage = window.location.pathname;
    const timestamp = new Date().toISOString();
    setAnalyticsData(prev => ({
      ...prev,
      pageViews: {
        ...prev.pageViews,
        [currentPage]: {
          count: (prev.pageViews[currentPage]?.count || 0) + 1,
          lastVisit: timestamp,
          visits: [...(prev.pageViews[currentPage]?.visits || []), timestamp].slice(-MAX_PAGE_VISITS)
        }
      }
    }));
  }, []);

  const trackSessionStart = useCallback(() => {
    setAnalyticsData(prev => ({
      ...prev,
      sessions: [
        ...prev.sessions,
        {
          id: generateSessionId(),
          startTime: new Date().toISOString(),
          pages: [window.location.pathname],
          interactions: 0
        }
      ].slice(-MAX_SESSIONS)
    }));
  }, []);

  useEffect(() => {
    initializeAnalytics();
    trackPageView();
    trackSessionStart();
    const cleanup = setupInteractionTracking();
    const startTime = Date.now();
    return () => {
      trackSessionEnd(Date.now() - startTime);
      if (cleanup) cleanup();
    };
  }, [initializeAnalytics, trackPageView, trackSessionStart, setupInteractionTracking, trackSessionEnd]);

  return null;
};

export default Analytics;