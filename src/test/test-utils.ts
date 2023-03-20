import { render as rtlRender, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FunctionComponent } from 'react';

import { AppProvider } from '@/providers/app';
import { CategoryGenerator, storeGenerator } from './data-generators';

export const createStore = async (storeProperties?: any) => {
  return storeGenerator(storeProperties);
};

export const createCategory = async (categoryProperties?: any) => {
  return CategoryGenerator(categoryProperties);
};

// eslint-disable-next-line import/export
export const render = async (
  ui: any,
  renderOptions: Record<string, any> = {}
) => {

  const returnValue = {
    ...rtlRender(ui, {
      wrapper: AppProvider as FunctionComponent<unknown>,
      ...renderOptions,
    })
  };

  return returnValue;
};

// eslint-disable-next-line import/export
export * from '@testing-library/react';
export { userEvent, rtlRender };
