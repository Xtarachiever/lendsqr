import * as React from 'react';
import Layout from '../../layout/Layout';

interface IPageNotFoundProps {
}

const PageNotFound: React.FunctionComponent<IPageNotFoundProps> = (props) => {
  return (
    <Layout>
        <h1>Error 404: Page not Found</h1>
    </Layout>
  );
};

export default PageNotFound;
