import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Layout from 'components/Layout';
import TopNav from 'components/TopNav/Home';
import InternalLink from 'components/Link/Internal';
import { usePrompt, IPromptState } from '@/libs/entities/prompt';

interface Params {
  params: {
    id: string;
  };
}

export const getStaticPaths = async () => {
  let paths: Params[] = [];

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const prompts = await res.json();
    paths = prompts.map((prompt) => ({
      params: { id: `${prompt.id}` },
    }));
  } catch (e) {
    console.error(e);
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: Params) => {
  let prompt = {};

  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${params.id}`
    );
    prompt = await res.json();
  } catch (e) {
    console.error(e);
  }

  return {
    props: { prompt },
  };
};

interface IPromptProps {
  text: string;
  type: string;

  id?: string;
  data: IPromptState;
  match?: any;
  onSave?: any;
  updateAction?: any;
}

export const Prompt: React.FunctionComponent<IPromptProps> = (prompt) => {
  const { t } = useTranslation();
  // const {
  //   state,
  //   stateFormatted,
  //   type,
  //   updateEntityItem,
  // } = usePrompt(data, updateAction as Function);
  return (
    <Layout className="space-y-4" header={<TopNav />}>
      <h1 className="mt-8 text-xl">{`${t('Prompt type')}: ${prompt.type}`}</h1>

      <pre className="rounded-[5px] bg-gray-800 p-3 font-mono text-xs">
        <code>{JSON.stringify(prompt, null, 2)}</code>
        {/*<bsm-form data-json={JSON.stringify(prompt}></bsm-form>*/}
      </pre>
      <div>{prompt.text}</div>

      <InternalLink href="/prompts-editor/prompts">{t('Back')}</InternalLink>
    </Layout>
  );
};

export default Prompt;
