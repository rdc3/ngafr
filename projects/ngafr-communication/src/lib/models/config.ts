
import { InjectionToken } from '@angular/core';
import { ICommunicationConfig } from './models';

export const CommunicationConfigData = new InjectionToken<ICommunicationConfig>('commconf');
