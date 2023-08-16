import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import Header from '@/components/header'
import React from 'react'
import TaskBoard from '@/components/task-board'
import TaskAdd from '@/components/task-add'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  return (
      <div className={inter.className}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header/>
        <main className={styles.main}>
          <TaskBoard/>
          <TaskAdd/>
        </main>
      </div> 
  );
}
