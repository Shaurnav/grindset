import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { DragDropContext } from 'react-beautiful-dnd';
import React from 'react';


const onDragEnd = (result: any) => {
  //reorder our column
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <React.StrictMode>
        <Component {...pageProps} />
      </React.StrictMode>
    </DragDropContext>
  );
}
