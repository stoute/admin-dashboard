import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

import { updateAssetsPrefix } from 'utils/path';

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <meta name="version" content={process.env.VERSION} />

          <link rel="shortcut icon" href={updateAssetsPrefix('favicon.ico')} />

          <script
            type="module"
            src="/node_modules/@bsmp/webcomponents/dist/bsm/bsm.esm.js"
            async
          ></script>
          <script
            noModule
            src="/node_modules/@bsmp/webcomponents/dist/bsm/bsm.js"
            async
          ></script>
          <script
            type="module"
            src="/node_modules/@ske/components/dist/ske/ske.esm.js"
            async
          ></script>
          <script
            noModule
            src="node_modules/@ske/components/dist/ske/ske.js"
          ></script>
        </Head>
        <body>
          <Main />
          <div id="modal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
