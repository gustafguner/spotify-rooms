import * as React from 'react';
import { Provider } from 'constate';
import apolloClient from './graphql/client';
import { ApolloProvider } from 'react-apollo';
import styled from 'react-emotion';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { initializeSpotify } from './utils/spotify';
import Header from './components/Header';
import PlaybackFooter from './components/PlaybackFooter';
import { routes } from './routes';

const SiteContainer = styled('div')`
  width: 100%;
  padding: 0 25px;
`;

const App: React.SFC = () => {
  initializeSpotify();

  return (
    <ApolloProvider client={apolloClient}>
      <Provider devtools={true}>
        <Header />
        <SiteContainer>
          <BrowserRouter>
            <Switch>
              {routes.map(({ path, exact, Component }) => (
                <Route
                  key={path}
                  path={path}
                  exact={exact}
                  component={Component}
                />
              ))}
            </Switch>
          </BrowserRouter>
        </SiteContainer>
        <PlaybackFooter />
      </Provider>
    </ApolloProvider>
  );
};

export default App;
