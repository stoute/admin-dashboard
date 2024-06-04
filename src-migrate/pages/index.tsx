import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Layout from '../components/Layout';
import TopNav from '../components/TopNav/Home';
import Footer from '../components/footer/footer';
import Header from '../components/Bsmp/components/Header';
import Main from '../components/Bsmp/components/Main';
import { useAppContext, useLocalStorage } from '../../src/hooks';

// import styles from './index.module.scss';

const stylesTw = {
  main: 'justify-center items-center',
};

const StyledIndexPage = styled.div`
  position: absolute;
  text-align: center;
  top: 0;
  #wrapper {
    flex-direction: inherit;
    padding: 0 0 0 0;
  }
  .cv-header {
    text-align: center;
    font-weight: bold;
    padding-bottom: 10px;
  }
  .sketch-container {
    display: flex !important;
    flex-direction: column;
    align-items: center;
  }
  article#music {
    iframe {
      padding-bottom: $padding/2;
      padding-top: $padding;
    }
    .cv-header {
      margin: $padding 0 0 0;
      padding: 0 0 0 0;
    }
  }
  article#variations {
    background: transparent;
    padding: 0 0 0 0;
    min-width: 75vw;
  }
`;

const IndexPage: React.FC = () => {
  const { app, store, useEffectOnce } = useAppContext();
  const router = useRouter();
  const [dev, setDev] = useLocalStorage('dev', 'false');
  const [isArticleVisible, setIsArticleVisible] = useState(false);
  const [timeout, setTimeoutState] = useState(false);
  const [articleTimeout, setArticleTimeout] = useState(false);
  const [article, setArticle] = useState('');
  const [loading, setLoading] = useState('is-loading');

  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffectOnce(() => {
    // app.init().then(() => {});
    setTimeout(() => {
      // @ts-ignore
      window.dispatchEvent(new Event('resize'));
    }, 1000);
    return () => {
      // @ts-ignore
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleOpenArticle = (article: string) => {
    setIsArticleVisible(!isArticleVisible);
    setArticle(article);
    setTimeout(() => {
      setTimeoutState(!timeout);
    }, 325);
    setTimeout(() => {
      setArticleTimeout(!articleTimeout);
    }, 350);
  };

  const handleCloseArticle = () => {
    setArticleTimeout(!articleTimeout);
    setTimeout(() => {
      setTimeoutState(!timeout);
    }, 325);
    setTimeout(() => {
      setIsArticleVisible(!isArticleVisible);
      setArticle('');
    }, 350);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      if (isArticleVisible) {
        handleCloseArticle();
      }
    }
  };

  useEffect(() => {
    timeoutIdRef.current = setTimeout(() => {
      setLoading('');
    }, 100);
    // @ts-ignore
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      // @ts-ignore
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <Layout
      className={stylesTw.main}
      header={app.production ? '' : <TopNav />}
      // footer={app.production ? '' : <Footer />}
    >
      <StyledIndexPage>
        <div
          className={`body ${loading} ${
            isArticleVisible ? 'is-article-visible' : ''
          }`}
        >
          <div id="wrapper">
            <Header onOpenArticle={handleOpenArticle} timeout={timeout} />
            <Main
              isArticleVisible={isArticleVisible}
              timeout={timeout}
              articleTimeout={articleTimeout}
              article={article}
              onCloseArticle={handleCloseArticle}
              setWrapperRef={wrapperRef}
            />
          </div>
          <div id="bg"></div>
        </div>
      </StyledIndexPage>
    </Layout>
  );
};

export default IndexPage;
