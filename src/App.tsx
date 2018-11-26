import * as React from 'react';
import apolloClient from './graphql/client';
import { ApolloProvider } from 'react-apollo';
import styled from 'react-emotion';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { initializeSpotify, getAccessToken } from './utils/spotify';
import Header from './components/Header';
import PlaybackFooter from './components/PlaybackFooter';
import { routes } from './routes';

import { useContext, useEffect } from 'react';
import { Context, Provider } from 'constate';

const SiteContainer = styled('div')`
  width: 100%;
  padding: 0 25px;
`;

const AppEffects = ({ children }: any) => {
  const [state, setState] = useContext(Context);

  useEffect(
    () => {
      setState({
        ...state,
        auth: {
          loggedIn: getAccessToken() ? true : false,
        },
      });
    },
    [getAccessToken()],
  );

  return children;
};

const App: React.SFC = () => {
  initializeSpotify();

  return (
    <ApolloProvider client={apolloClient}>
      <Provider devtools={true}>
        <AppEffects>
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
        </AppEffects>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
