import { Config } from 'clarity-js/types/core';
import { MetadataCallback, SignalCallback } from 'clarity-js/types/data';

export type Clarity = {
  readonly start: (config?: Config) => void;
  readonly stop: () => void;
  readonly pause: () => void;
  readonly resume: () => void;
  readonly upgrade: (key: string) => void;
  readonly consent: () => void;
  readonly event: (name: string, value: string) => void;
  readonly set: (variable: string, value: string | readonly string[]) => void;
  readonly identify: (
    userId: string,
    sessionId?: string,
    pageId?: string,
    userHint?: string
  ) => void;
  readonly metadata: (callback: MetadataCallback, wait?: boolean) => void;
  readonly signal: (callback: SignalCallback) => void;
};
