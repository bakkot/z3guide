import React, { createContext, useContext, useMemo, useState } from "react";

const initQueueContext = {queue: [], setQueue: undefined};
const Z3QueueContext = createContext(initQueueContext);

export function Z3GlobalStateProvider({children}) {
    const [queue, setQueue] = useState(initQueueContext.queue);
    const queueContextValue = useMemo(() => ({queue, setQueue}), [queue]);
    return (
        <Z3QueueContext.Provider value={queueContextValue}>
            {children}
        </Z3QueueContext.Provider>
    );
}

export const useZ3QueueState = () => useContext(Z3QueueContext);
