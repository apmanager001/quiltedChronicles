// components/MetaData.tsx
import Head from "next/head";
import { Metadata } from 'next'

interface MetaDataProps {
  title: string;
  description: string;
  keywords: string;
}

const MetaData: React.FC<MetaDataProps> = ({
  title,
  description,
  keywords,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Head>
  );
};

export default MetaData;
