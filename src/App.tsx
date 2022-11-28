
import * as React from 'react';
import AppRouter from './AppRouter';
import Navbar from './components/Navbar';

export interface IAppProps {
}

export function App(props: IAppProps) {
  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  );
}
