import { createContext, useContext, useState } from 'react';
import en from './en.json';
import he from './he.json';

const I18nContext = createContext();

const translations = {
  en,
  he,
};

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState('he'); // Default to Hebrew

  const t = (key, defaultValue = '') => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (let i = 0; i < keys.length; i++) {
      if (value && typeof value === 'object' && keys[i] in value) {
        value = value[keys[i]];
      } else {
        return defaultValue || key;
      }
    }
    
    return typeof value === 'string' ? value : (defaultValue || key);
  };

  const interpolate = (text, values = {}) => {
    let result = text;
    Object.keys(values).forEach((key) => {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), values[key]);
    });
    return result;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, interpolate }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};
