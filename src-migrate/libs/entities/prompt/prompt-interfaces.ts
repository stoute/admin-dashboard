import { IBaseEntity, IBaseEntityState, IEntityDefinition } from '@bsmp/core';
import { promptTranslations } from './prompt-translations';

export interface IPromptEntity extends IBaseEntity {
  state: IPromptState;
  stateFormatted?: IPromptStateFormatted;
  translations?: typeof promptTranslations;
  initialState?;
  IPromptState;
}

export interface IPromptState extends IBaseEntityState {
  vehicleId?: number;
  deviceId?: number;
  driverId?: number;
  startTime?: object;
  endTime?: string;
  currentTime?: string;
  description?: string;
  startMileage?: number;
  endMileage?: number;
  distanceInKm?: number;
  endAddress?: string;
  averageSpeed?: number;
  promptType?: string;
  startAddress?: string;
  durationInHour?: number;
  vehicle?: any;
}

export interface IPromptStateFormatted extends IPromptState {
  dateDisplay?: string;
  dateDisplayShort?: string;
}
