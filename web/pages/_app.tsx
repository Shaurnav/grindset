import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { DragDropContext } from 'react-beautiful-dnd';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}
