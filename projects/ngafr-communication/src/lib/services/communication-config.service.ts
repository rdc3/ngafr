import { InjectionToken } from '@angular/core';
import { ICommunicationConfig } from '../models/models';

export const CommunicationConfigData = new InjectionToken<ICommunicationConfig>('COMMUNICATIONCONFIG');
