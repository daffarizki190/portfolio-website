import { useEffect, useCallback } from 'react';
import { useLocalStorage } from '../hooks';

const Analytics = () => {
  const [, setAnalyticsData] = useLocalStorage('analytics', {
    pageViews: {},
    sessions: [],
    userAgent: '',
    screenResolution: '',
    referrer: '',
    timeOnSite: 0,
    interactions: []
  });

  const generateSessionId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const trackInteraction = useCallback((type, data) => {
    const interaction = {
      type,
      data,
      timestamp: new Date().toISOString(),
      page: window.location.pathname
    };

    setAnalyticsData(prev => ({
      ...prev,
      interactions: [...(prev.interactions || []), interaction]
    }));
  }, [setAnalyticsData]);

  const setupInteractionTracking = useCallback(() => {
    const handleClick = (event) => {
      trackInteraction('click', {
        element: event.target.tagName,
        className: event.target.className,
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
            const scrollPercentage = Math.round(
              (window.scrollY / scrollHeight) * 100
            );
            if (scrollPercentage >= 0 && scrollPercentage <= 100) {
                trackInteraction('scroll', { percentage: scrollPercentage });
            }
        }
      }, 100);
    };

    const handleSubmit = (event) => {
      trackInteraction('form_submit', {
        formId: event.target.id,
        formAction: event.target.action
      });
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('submit', handleSubmit);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('submit', handleSubmit);
    };
  }, [trackInteraction]);

  const trackSessionEnd = useCallback((timeSpent) => {
    setAnalyticsData(prev => {
      const sessions = [...prev.sessions];
      if (sessions.length > 0) {
        const lastSession = sessions[sessions.length - 1];
        lastSession.endTime = new Date().toISOString();
        lastSession.duration = timeSpent;
      }
      
      return {
        ...prev,
        sessions,
        timeOnSite: (prev.timeOnSite || 0) + timeSpent
      };
    });
  }, [setAnalyticsData]);

  const initializeAnalytics = useCallback(() => {
    const userAgent = navigator.userAgent;
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const referrer = document.referrer || 'direct';
    
    setAnalyticsData(prev => ({
      ...prev,
      userAgent,
      screenResolution,
      referrer
    }));
  }, [setAnalyticsData]);

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
          visits: [...(prev.pageViews[currentPage]?.visits || []), timestamp]
        }
      }
    }));
  }, [setAnalyticsData]);

  const trackSessionStart = useCallback(() => {
    const sessionId = generateSessionId();
    const timestamp = new Date().toISOString();
    
    setAnalyticsData(prev => ({
      ...prev,
      sessions: [
        ...prev.sessions,
        {
          id: sessionId,
          startTime: timestamp,
          pages: [window.location.pathname],
          interactions: 0
        }
      ]
    }));
  }, [setAnalyticsData]);

  useEffect(() => {
    initializeAnalytics();
    trackPageView();
    trackSessionStart();
    const cleanup = setupInteractionTracking();
    const startTime = Date.now();
    
    return () => {
      const timeSpent = Date.now() - startTime;
      trackSessionEnd(timeSpent);
      if (cleanup) cleanup();
    };
  }, [initializeAnalytics, trackPageView, trackSessionStart, setupInteractionTracking, trackSessionEnd]);

  return null;
};

export default Analytics;