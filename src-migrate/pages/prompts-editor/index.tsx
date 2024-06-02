import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Layout from 'components/Layout';
import TopNav from 'components/TopNav/Home';
import { InternalLink, TargetBlankLink } from 'components/Link';

const styles = {
  main: 'justify-center items-center',
};

export const PromptsEditor: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <Layout className={styles.main} header={<TopNav />}>
      <h1 className="mt-8 text-xl">Prompt editor</h1>

      <ul className="list-inside list-disc">
        <li>
          <InternalLink href="/prompts-editor/prompts">
            {t('Prompts')}
          </InternalLink>
        </li>
      </ul>

      <InternalLink href="/">{t('Back')}</InternalLink>
    </Layout>
  );
};

export default PromptsEditor;
