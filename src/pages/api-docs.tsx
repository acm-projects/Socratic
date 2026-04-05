import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import { spec } from '../lib/swagger';
import type { SwaggerUIProps } from 'swagger-ui-react';

const SwaggerUI = dynamic<SwaggerUIProps>(() => import('swagger-ui-react'), { ssr: false });

function ApiDocs({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Head>
        <title>Socratic AI Tutor API Docs</title>
        <meta name="description" content="OpenAPI documentation for the Socratic AI Tutor API" />
      </Head>
      <SwaggerUI spec={spec} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      spec,
    },
  };
};

export default ApiDocs;
