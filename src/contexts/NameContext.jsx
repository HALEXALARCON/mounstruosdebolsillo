import React, { createContext, useState, useContext } from 'react';

// Crear el contexto con valores predeterminados seguros
const NameContext = createContext({
  name: '',
  setName: () => {
    throw new Error('setName debe usarse dentro de NameProvider');
  },
});

// Componente proveedor del contexto
export const NameProvider = ({ children }) => {
  const [name, setName] = useState('');

  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useName = () => {
  const context = useContext(NameContext);
  if (!context) {
    throw new Error('useName debe usarse dentro de NameProvider');
  }
  return context;
};

