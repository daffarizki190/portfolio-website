import { useLocalStorage } from './useLocalStorage';

export const useAnalytics = () => {
  const [analyticsData] = useLocalStorage('analytics', {});

  const trackEvent = (eventName, eventData = {}) => {
    const event = {
      name: eventName,
      data: eventData,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      userAgent: navigator.userAgent
    };

    const existingEvents = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    existingEvents.push(event);
    localStorage.setItem('analytics_events', JSON.stringify(existingEvents));
  };

  const trackPageView = (pageName) => {
    trackEvent('page_view', { page: pageName || window.location.pathname });
  };

  const trackButtonClick = (buttonName, additionalData = {}) => {
    trackEvent('button_click', { button: buttonName, ...additionalData });
  };

  const trackFormSubmission = (formName, formData = {}) => {
    trackEvent('form_submission', { form: formName, ...formData });
  };

  const trackDownload = (fileName, fileType) => {
    trackEvent('download', { fileName, fileType });
  };

  const trackError = (errorMessage, errorStack) => {
    trackEvent('error', { message: errorMessage, stack: errorStack });
  };

  const getAnalyticsData = () => {
    return analyticsData;
  };

  const getAnalyticsSummary = () => {
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    const pageViews = analyticsData.pageViews || {};
    const sessions = analyticsData.sessions || [];

    return {
      totalPageViews: Object.values(pageViews).reduce((sum, page) => sum + page.count, 0),
      totalSessions: sessions.length,
      totalEvents: events.length,
      averageSessionDuration: sessions.length > 0 
        ? sessions.reduce((sum, session) => sum + (session.duration || 0), 0) / sessions.length 
        : 0,
      topPages: Object.entries(pageViews)
        .sort(([,a], [,b]) => b.count - a.count)
        .slice(0, 5),
      recentEvents: events.slice(-10)
    };
  };

  return {
    trackEvent,
    trackPageView,
    trackButtonClick,
    trackFormSubmission,
    trackDownload,
    trackError,
    getAnalyticsData,
    getAnalyticsSummary
  };
};