import { useEffect, useState } from 'react';
import { Util } from '@bsmp/core';
import { Prompt } from './prompt';
import { IPromptState, IPromptStateFormatted } from './prompt-interfaces';

export const usePrompt = (
  initialState: IPromptState = null,
  updateAction,
  entityRef: Prompt = null
) => {
  const entity: Prompt = entityRef || new Prompt(initialState);
  const [state, setState] = useState<IPromptState>(initialState);
  const [stateFormatted, setStateFormatted] =
    useState<IPromptStateFormatted | null>(entity.stateFormatted);

  useEffect(() => {
    entity.initialState = state;
    entity.setState(state);
    return () => {
      exitEntity();
    };
  }, []);

  useEffect(() => {
    if (state) entity.setState(state);
    setStateFormatted(entity.stateFormatted);
  }, [state]);

  const updateEntity = async (updatedEntity: IPromptState) => {
    let response;
    entity.setState({ ...entity.state, ...{ timestamp: Util.getTimeStamp() } });
    if (updateAction) response = await updateAction(updatedEntity);
    entity.setState({ ...entity.state, ...updatedEntity });
    setState({ ...state, ...updatedEntity });
    if (response) entity.setState({ ...entity.state, ...response });
    setState({ ...state, ...response });
    setStateFormatted(entity.stateFormatted);
  };

  const updateEntityItem = async (field: string, value: any) => {
    await updateEntity({
      id: entity.state.id,
      type: entity.state.type,
      [field]: value,
    });
  };

  const exitEntity = async () => {
    // updateEntityItem('endTime', String(new Date()));
    // updateEntityItem('currentTime', String(new Date()));
  };

  return {
    ...entity,
    ...{
      state,
      setState,
      stateFormatted,
      updateEntity,
      updateEntityItem,
    },
  };
};
