import React, { createContext, useContext, useState } from 'react';

type QuoteFilterKeys = 'solofit' | 'bible' | 'anime' | 'movie';

type QuoteFilters = Record<QuoteFilterKeys, boolean>;

const defaultFilters: QuoteFilters = {
  solofit: true,
  bible: true,
  anime: true,
  movie: true,
};

const QuotePreferencesContext = createContext<{
  quoteFilters: QuoteFilters;
  setQuoteFilters: React.Dispatch<React.SetStateAction<QuoteFilters>>;
}>({
  quoteFilters: defaultFilters,
  setQuoteFilters: () => {},
});

export const QuotePreferencesProvider = ({ children }: { children: React.ReactNode }) => {
  const [quoteFilters, setQuoteFilters] = useState<QuoteFilters>(defaultFilters);

  return (
    <QuotePreferencesContext.Provider value={{ quoteFilters, setQuoteFilters }}>
      {children}
    </QuotePreferencesContext.Provider>
  );
};

export const useQuotePreferences = () => useContext(QuotePreferencesContext);
