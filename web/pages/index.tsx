import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import Header from '@/components/header'
import Task from '@/components/task-list/task'
import TaskList from '@/components/task-list'
import React, { useEffect, useState } from 'react'
import TaskBoard from '@/components/task-board'

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
        </main>
      </div> 
  );
}
