import { CodeSnippet } from '../../components/code-snippet';
import { PageLayout } from '../../components/page-layout';
import { API, apiCall } from '../../utils/apiCall';

const Index = ({ message }) => {
  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Api Test Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              This page retrieves a <strong>protected message</strong>.
            </span>
            <span>
              <strong>Only authenticated users can access this page.</strong>
            </span>
          </p>
          <CodeSnippet title="Protected Message" code={message} />
        </div>
      </div>
    </PageLayout>
  );
};

export async function getServerSideProps() {
  const resp = await apiCall(API.USER, 'GET');
  const users = resp?.data?.data;

  const message = `Welcome ${users[0].username}`;

  return {
    props: {
      message,
    },
  };
}

export default Index;
