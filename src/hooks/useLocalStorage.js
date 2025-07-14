import { useState, useCallback } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.log(err);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      setStoredValue(prevValue => {
        const valueToStore = value instanceof Function ? value(prevValue) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        return valueToStore;
      });
    } catch (err) {
      console.log(err);
    }
  }, [key]);

  return [storedValue, setValue];
};

/**
 * Custom hook untuk mengelola sessionStorage dengan React state
 * @param {string} key - Key untuk sessionStorage
 * @param {any} initialValue - Nilai awal jika tidak ada di sessionStorage
 * @returns {[any, function]} - [value, setValue]
 */
export const useSessionStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting sessionStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

/**
 * Custom hook untuk mengelola cookies
 * @param {string} name - Nama cookie
 * @param {any} initialValue - Nilai awal jika cookie tidak ada
 * @param {object} options - Options untuk cookie (expires, path, domain, secure, sameSite)
 * @returns {[any, function, function]} - [value, setValue, deleteCookie]
 */
export const useCookie = (name, initialValue, options = {}) => {
  const [value, setValue] = useState(() => {
    try {
      const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${name}=`));
      
      if (cookie) {
        const cookieValue = cookie.split('=')[1];
        return JSON.parse(decodeURIComponent(cookieValue));
      }
      return initialValue;
    } catch (error) {
      console.error(`Error reading cookie "${name}":`, error);
      return initialValue;
    }
  });

  const setCookie = (newValue, cookieOptions = {}) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      
      const mergedOptions = { ...options, ...cookieOptions };
      let cookieString = `${name}=${encodeURIComponent(JSON.stringify(valueToStore))}`;
      
      if (mergedOptions.expires) {
        cookieString += `; expires=${mergedOptions.expires.toUTCString()}`;
      }
      if (mergedOptions.maxAge) {
        cookieString += `; max-age=${mergedOptions.maxAge}`;
      }
      if (mergedOptions.path) {
        cookieString += `; path=${mergedOptions.path}`;
      }
      if (mergedOptions.domain) {
        cookieString += `; domain=${mergedOptions.domain}`;
      }
      if (mergedOptions.secure) {
        cookieString += `; secure`;
      }
      if (mergedOptions.sameSite) {
        cookieString += `; samesite=${mergedOptions.sameSite}`;
      }
      
      document.cookie = cookieString;
    } catch (error) {
      console.error(`Error setting cookie "${name}":`, error);
    }
  };

  const deleteCookie = () => {
    try {
      setValue(initialValue);
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    } catch (error) {
      console.error(`Error deleting cookie "${name}":`, error);
    }
  };

  return [value, setCookie, deleteCookie];
};