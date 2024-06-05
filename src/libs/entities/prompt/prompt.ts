import {
  BaseEntity,
  IBaseEntity,
  IBaseEntityState,
  IEntityDefinition,
} from '@bsmp/core';
import { promptFormatter } from './prompt-formatter';
import { promptTranslations } from './prompt-translations';
import {
  IPromptEntity,
  IPromptState,
  IPromptStateFormatted,
} from './prompt-interfaces';

export class Prompt extends BaseEntity {
  public state: IPromptState;
  public stateFormatted: IPromptStateFormatted;
  public initialState: IPromptState;
  public type = 'prompt';
  public typeDefinition = promptEntityDefinition;
  public formattedFields = ['dateDisplay', 'dateDisplayShort'];
  public translations = promptTranslations;
  public formatter = promptFormatter;

  constructor(initialState: IPromptState) {
    super(initialState);
  }
}

export const promptEntityDefinition: IEntityDefinition = {
  type: 'prompt',
  name: 'Prompt',
  description: '',
  namePlural: 'Prompts',
  path: 'prompt',
  pathPlural: 'prompts',
};

export const promptFormDefinitions = {
  default: {
    data: {
      type: 'prompt',
      id: 'prompt',
      attributes: {
        username: '',
        password: '',
      },
      meta: {
        definitions: {
          id: {
            hidden: true,
          },
          username: {
            label: 'USERNAME',
            tag: 'input',
            type: 'text',
            constraints: {
              presence: true,
              length: {
                minimum: 3,
                maximum: 70,
              },
            },
            permissions: ['read', 'update'],
          },
          password: {
            label: 'PASSWORD',
            tag: 'input',
            type: 'password',
            placeholder: '',
            constraints: {
              presence: true,
              length: {
                minimum: 8,
                message:
                  '^This field must be at least %{count} characters long',
              },
            },
            permissions: ['read', 'update'],
          },
        },
        permissions: ['read', 'update'],
      },
    },
  },
};

export const promptFragment = `fragment PromptFragment on Prompt {
  id
  vehicleId
  deviceId
  driverId
  startTime
  endTime
  description
  startMileage
  endMileage
  distanceInKm
  endAddress
  averageSpeed
  promptType
  startAddress
  durationInHour
  vehicle {
    identification
    brand
  }
}`;
