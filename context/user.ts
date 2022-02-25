import { Context, createContext } from 'react';

import { AppState } from '../types/states';

export const AppContext: Context<Partial<AppState>> = createContext({});
