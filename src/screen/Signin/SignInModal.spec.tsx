import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import React from 'react';
import RecommendNameScreen from '../RecommendNameScreen/RecommendNameScreen';

const queryClient = new QueryClient({
  defaultOptions: {},
});

describe('로그인 모달', () => {
  beforeEach(() => {
    const routes = [
      {
        path: '/',
        element: <RecommendNameScreen />,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
      initialIndex: 0,
    });
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />{' '}
      </QueryClientProvider>
    );
  });
  test('로그인 모달이 렌더링 되어야 한다.', () => {});
});
