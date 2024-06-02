import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import Layout from 'components/Layout';
import TopNav from 'components/TopNav/Home';
import { useAppContext } from 'hooks';
import LoginForm from 'components/LoginForm';
import Chat from 'components/Chat';

import hello from 'public/hello.json';

const styles = {
  main: 'justify-center items-center',
  title: 'leading-[1.15] text-[4rem] text-center mt-8 md:mt-0',
  titleLink:
    'no-underline text-blue-500 text-center hover:underline focus:underline active:underline',
  description: 'mt-4 px-8 text-center text-2xl leading-normal',
  code: 'bg-gray-500 rounded-[5px] p-3 text-[1.1rem] font-mono',
  grid: 'flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full',
  card: 'p-6 mt-6 md:w-96 text-left border rounded-xl transition ease-[2s] hover:text-blue-500 focus:text-blue-500 active:text-blue-500 hover:border-blue-600 focus:border-blue-600 active:border-blue-600',
  cardTitle: 'text-xl font-bold',
  cardText: 'mt-4 text-lg',
  loader: 'text-xl',
};

export const Home: React.FunctionComponent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { app, store, useEffectOnce } = useAppContext();
  const { t } = useTranslation();

  useEffectOnce(() => {
    // if (app.production) router.push('portfolio/');
    app.init().then(() => {
      setLoading(false);
    });
  });

  const test = async () => {
    app.debug();
    await app.firebase.addDocument('test', 'testid', {
      foo: 'bar remote 2',
    });
  };

  if (loading)
    return (
      <Layout className={styles.main}>
        <div className="flex items-center">
          <div className={styles.loader}>...{t('loading')}...</div>
        </div>
      </Layout>
    );

  return (
    <Layout className={styles.main} header={<TopNav />}>
      <div className="flex flex-col items-center space-y-2">
        <div className={'text-lg'}>
          {t('Hello')}{' '}
          <a className={styles.titleLink} href="https://nextjs.org">
            Next.js
          </a>{' '}
          SSG
        </div>

        <h2 className={'test'}>TEST</h2>
        <div className={'center flex '}>
          <button className="btn" onClick={() => test()}>
            test()
          </button>{' '}
          <button className="btn-secondary btn">Button</button>
          <button className="btn-accent btn">Button</button>
          <button className="btn-ghost btn">Button</button>
          <button className="btn-link btn">Button</button>
        </div>

        <LoginForm
          onSubmit={(email, password) => {
            console.log(email, password);
          }}
          onError={(error) => {
            console.log(error);
          }}
        />
        <hr />
        <Chat />

        <div>{store.count.value}</div>

        <div>
          <code className={styles.code}>hello.json</code> - {hello.message}
        </div>
      </div>

      <div className={styles.grid}>
        <a href="https://nextjs.org/docs" className={styles.card}>
          <h3>{t('Documentation')} &rarr;</h3>
          <p>
            {t('Find in-depth information about Next.js features and API.')}
          </p>
        </a>

        <a href="https://nextjs.org/learn" className={styles.card}>
          <h3>{t('Learn')} &rarr;</h3>
          <p>
            {t('Learn about Next.js in an interactive course with quizzes!')}
          </p>
        </a>

        <a
          href="https://github.com/vercel/next.js/tree/master/examples"
          className={styles.card}
        >
          <h3>{t('Examples')} &rarr;</h3>
          <p>
            {t('Discover and deploy boilerplate example Next.js projects.')}
          </p>
        </a>

        <a
          href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={styles.card}
        >
          <h3>{t('Deploy')} &rarr;</h3>
          <p>
            {t(
              'Instantly deploy your Next.js site to a public URL with Vercel.'
            )}
          </p>
        </a>
      </div>
    </Layout>
  );
};

export default Home;
