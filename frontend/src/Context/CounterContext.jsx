import { createContext, useState } from "react";



export const CounterContext = createContext();

export const CounterProvider = ({ children }) => {
   const [count, setCount] = useState(0);

   function incrementCount(){setCount(count + 1);

   }
   function decrementCount(){setCount (count - 1); 

   }
  
  return (
    <CounterContext.Provider value = {{count, incrementCount, decrementCount}}>
            {children}
        </CounterContext.Provider>
    
  );
};
