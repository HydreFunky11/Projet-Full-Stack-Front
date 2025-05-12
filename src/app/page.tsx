'use client';

import styles from '@/styles/Home.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Projet Full Stack</h1>
      <p className={styles.description}>
        Bienvenue sur votre application Next.js avec React, SCSS, et Turbopack
      </p>
    </main>
  );
}