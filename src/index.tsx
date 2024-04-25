import * as React from 'react';
import initialize from './initialize';
import ClarityAPI from './API';
import { Clarity } from './types/clarity-js';
import { Metadata } from 'clarity-js/types/data';

const BASE_CLARITY_URL = 'https://clarity.microsoft.com';

interface ClarityProviderProps {
  clarityId: string;
}

interface ClarityContextValue extends Clarity {
  currentSessionId?: string;
  currentSessionUrl?: string;
  clarityUserId?: string;
}

const ClarityContext = React.createContext<ClarityContextValue | undefined>(
  undefined
);

export const ClarityProvider: React.FC<
  React.PropsWithChildren<ClarityProviderProps>
> = ({ clarityId, ...rest }) => {
  const isInitialized = React.useRef(false);

  const [metadataValue, setMetadataValue] = React.useState<
    Metadata | undefined
  >(undefined);

  if (!isInitialized.current) {
    initialize(clarityId);
    isInitialized.current = true;
  }

  React.useEffect(() => {
    if (isInitialized.current) {
      ClarityAPI('metadata', (e) => {
        setMetadataValue(e);
      });
    }
  }, [isInitialized.current]);

  const start: Clarity['start'] = React.useCallback((config) => {
    ClarityAPI('start', config);
  });

  const stop: Clarity['stop'] = () => {
    ClarityAPI('stop');
  };
  const pause: Clarity['pause'] = () => {
    ClarityAPI('pause');
  };
  const resume: Clarity['resume'] = () => {
    ClarityAPI('resume');
  };
  const upgrade: Clarity['upgrade'] = (key) => {
    ClarityAPI('upgrade', key);
  };
  const consent: Clarity['consent'] = () => {
    ClarityAPI('consent');
  };
  const event: Clarity['event'] = (name, data) => {
    ClarityAPI('event', name, data);
  };
  const set: Clarity['set'] = (key, value) => {
    ClarityAPI('set', key, value);
  };
  const identify: Clarity['identify'] = (
    userId,
    sessionId,
    pageId,
    userHint
  ) => {
    ClarityAPI('identify', userId, sessionId, pageId, userHint);
  };

  const metadata: Clarity['metadata'] = (callback, wait) => {
    ClarityAPI('metadata', callback, wait);
  };

  const signal: Clarity['signal'] = (callback) => {
    ClarityAPI('signal', callback);
  };

  const currentSessionUrl: string | undefined = React.useMemo(() => {
    if (
      !metadataValue?.projectId ||
      !metadataValue?.userId ||
      !metadataValue?.sessionId
    ) {
      return undefined;
    }

    return `${BASE_CLARITY_URL}/player/${metadataValue.projectId}/${metadataValue.userId}/${metadataValue?.sessionId}`;
  }, [metadataValue]);

  const providerValue = React.useMemo<ClarityContextValue>(() => {
    return {
      start,
      stop,
      pause,
      resume,
      upgrade,
      consent,
      event,
      set,
      identify,
      metadata,
      signal,
      currentSessionId: metadataValue?.sessionId,
      clarityUserId: metadataValue?.userId,
      currentSessionUrl,
    };
  }, [
    start,
    stop,
    pause,
    resume,
    upgrade,
    consent,
    event,
    set,
    identify,
    metadata,
    signal,
    metadataValue,
    currentSessionUrl,
  ]);

  return (
    <ClarityContext.Provider value={providerValue}>
      {rest.children}
    </ClarityContext.Provider>
  );
};

export const useClarity = () => {
  const context = React.useContext(ClarityContext);

  if (context === undefined) {
    throw new Error('"useClarity" must be used within `ClarityProvider`.');
  }

  return context as ClarityContextValue;
};
