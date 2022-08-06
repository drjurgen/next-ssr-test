import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

interface PageContent {
  nationality: Nationality;
  cat: Cat;
}

interface Cat {
  file: string;
}

interface Nationality {
  name: string;
  country: Country[];
}

interface Country {
  country_id: string;
  probability: number;
}

const Home: NextPage<PageContent> = ({ nationality, cat }: PageContent) => {
  const [seo, setSeo] = useState(nationality.name);
  return (
    <div className={styles.container}>
      <Head>
        <title>SSR test - {seo}</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>This is a SSG TEST (+ ISR)</h1>
        <p className={styles.description}>Let&apos;s see if it works - {nationality.name}</p>
        {nationality && (
          <div className={styles.grid}>
            {nationality.country.map((country, i) => {
              return (
                <article key={`country-${country.country_id}-${i}`} className={styles.card}>
                  <h2>{country.country_id}</h2>
                  <p>{country.probability}</p>
                </article>
              );
            })}
          </div>
        )}

        <p>Cat</p>
        {nationality && (
          <div className={styles.grid}>
            <article
              className={styles.card}
              style={{
                backgroundImage: `url(${cat.file})`,
                color: '#fff',
                justifyContent: 'flex-start',
                textShadow: '1px 1px 1px black',
              }}>
              <p>Here&apos;s a random cat</p>
            </article>
          </div>
        )}
      </main>

      <footer className={styles.footer}>Powered by Jurgen</footer>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  console.log('[Next.js] Running getStaticProps...');
  const nationalityRes = await fetch('https://api.nationalize.io/?name=nicolai');
  const nationality = await nationalityRes.json();
  const catRes = await fetch('https://aws.random.cat/meow');
  const cat = await catRes.json();
  return {
    props: {
      nationality,
      cat,
    },
    revalidate: 20, // In seconds
  };
};

export default Home;
