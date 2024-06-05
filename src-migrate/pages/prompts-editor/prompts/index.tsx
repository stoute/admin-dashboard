import * as React from 'react';

import { useTranslation } from 'next-translate-i18next';

import Layout from 'components/Layout';
import TopNav from 'components/TopNav/Home';

import InternalLink from 'components/Link/Internal';

export const getStaticProps = async () => {
  let prompts = [];
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    prompts = await res.json();
  } catch (e) {
    console.error(e);
  }
  return {
    props: { prompts },
  };
};

interface IPromptsProps {
  prompts: any[];
}

export const Prompts: React.FunctionComponent<IPromptsProps> = ({
  prompts,
}) => {
  const { t } = useTranslation();
  return (
    <Layout className="space-y-4" header={<TopNav />}>
      <h1 className="mt-8 text-xl">{t('Prompts')}</h1>

      <ul className="list-inside list-disc">
        {prompts.map((prompt) => (
          <li key={prompt.id}>
            <InternalLink href={`/prompts-editor/prompts/${prompt.id}`}>
              {prompt.name}
            </InternalLink>
          </li>
        ))}
      </ul>

      <InternalLink href="/prompts-editor">{t('Back')}</InternalLink>
    </Layout>
  );
};

export default Prompts;
