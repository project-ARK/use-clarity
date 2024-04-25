<h1 align="center">use-clarity</h1>
<p align="center">A React <a href="https://clarity.microsoft.com/" alt="Clarity">Clarity </a> integration powered by hooks.</p>

<p align="center">
<img alt="version" src="https://img.shields.io/npm/v/use-clarity.svg" />
<img alt="downloads" src="https://badgen.net/npm/dw/use-clarity" />
<img alt="minzipped size" src="https://badgen.net/bundlephobia/minzip/use-clarity">
<img alt="known vulnerabilities" src="https://snyk.io/test/github/devrnt/use-clarity/badge.svg">
</p>

## Features

- Hooks
- Written in TypeScript
- Documented, self explaining methods

## Installation

```sh
# npm
npm install use-clarity

# yarn
yarn add use-clarity
```

## Quickstart

```ts
import * as React from 'react';

import { ClarityProvider, useClarity } from 'use-clarity';

const CLARITY_PROJECT_ID = 'your-clarity-project-id';

const App = () => (
  <ClarityProvider clarityId={CLARITY_PROJECT_ID}>
    <HomePage />
  </ClarityProvider>
);

const HomePage = () => {
  const { userId } = useUserContext();
  const { identify } = useClarity();

  React.useEffect(() => {
    identify(userId);
  }, [userId]);

  return <div>Hi I'm a homepage</div>;
};
```

## Context

This library is a React abstraction of [Clarity](https://learn.microsoft.com/en-us/clarity/). `use-clarity` tries to keep as close as a one-on-one abstraction of the "vanilla" Clarity functionality.

## Links

- [API](#api)
- [TypeScript](#typescript)

## API

- [ClarityProvider](#clarityprovider)
- [useClarity](#useclarity)

### ClarityProvider

`ClarityProvider` is used to initialize the `window.clarity` instance.

Place the `ClarityProvider` as high as possible in your application. This will make sure you can call `useClarity` anywhere.

#### Props

| name      | type   | description        | required | default |
| --------- | ------ | ------------------ | -------- | ------- |
| clarityId | string | clarity project id | true     |         |

#### Example

```ts
const App = () => {
  return (
    <ClarityProvider clarityId={CLARITY_PROJECT_ID}>
      <p>Hi there, I am a child of the ClarityProvider</p>
    </ClarityProvider>
  );
};
```

### useClarity

Used to retrieve all methods bundled with Clarity. These are based on the official [Clarity API docs](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api) and [Clarity Identify API docs](https://learn.microsoft.com/en-us/clarity/setup-and-installation/identify-api). We provide full access to the internals, with additional helper methods.

Make sure `ClarityProvider` is wrapped around your component when calling `useClarity()`.

**Remark** - You can't use `useClarity()` in the same component where `ClarityProvider` is initialized.

#### API

| name              | type                                                                             | description                                                                                                                                                                    |
| ----------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| currentSessionUrl | string?                                                                          | the url for the current session                                                                                                                                                |
| clarityUserId     | string?                                                                          | the current clarity id of the user                                                                                                                                             |
| currentSessionId  | string?                                                                          | the current session id                                                                                                                                                         |
| upgrade           | (key: string) => void                                                            | [prioritize specific types of sessions for recording](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api#prioritize-specific-sessions-for-recording) |
| consent           | () => void                                                                       | [set consent](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api#add-custom-events)                                                                  |
| event             | (name: string, value: string) => void                                            | [send custom events](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api#add-custom-events)                                                           |
| set               | (variable: string, value: string\| string[]) => void;                            | [add custom tags](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api#add-custom-tags)                                                                |
| identify          | (userId: string, sessionId?: string, pageId?: string, userHint?: string) => void | [customise the ids](https://learn.microsoft.com/en-us/clarity/setup-and-installation/identify-api#customizing-custom-id)                                                       |
| metadata          | (callback: Data.MetadataCallback, wait?: boolean) => void                        | internal                                                                                                                                                                       |
| signal            | (callback: Data.SignalCallback) => void                                          | internal                                                                                                                                                                       |
| start             | (config?: Core.Config) => void                                                   | internal                                                                                                                                                                       |
| stop              | () => void                                                                       | internal                                                                                                                                                                       |
| pause             | () => void                                                                       | internal                                                                                                                                                                       |
| resume            | () => void                                                                       | internal                                                                                                                                                                       |

## Next Up

- [ ] Add tests
- [ ] Add more examples
