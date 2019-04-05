import * as React from 'react';
import apolloClient from './graphql/client';
import { ApolloProvider } from 'react-apollo';
import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { initializeSpotify } from './utils/spotify';
import { getToken, getUser } from './utils/auth';
import Header from './components/Header';
import { routes } from './routes';

import { Playback } from 'src/components/Playback';

import { Root } from 'src/Root';

const SiteContainer = styled.div`
  width: 100%;
`;

const App: React.FC = () => {
  initializeSpotify();

  return (
    <ApolloProvider client={apolloClient}>
      <Root.Provider>
        <SiteContainer>
          <BrowserRouter>
            <Switch>
              <>
                <Header />
                {routes.map(({ path, exact, Component }) => (
                  <Route
                    key={path}
                    path={path}
                    exact={exact}
                    component={Component}
                  />
                ))}
              </>
            </Switch>
          </BrowserRouter>

          <Playback />
        </SiteContainer>
      </Root.Provider>
    </ApolloProvider>
  );
};

export default App;
