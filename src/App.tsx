import * as React from 'react';
import { Provider } from 'constate';
import styled from 'react-emotion';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { initializeSpotify } from './utils/spotify';
import Header from './components/Header';
import { routes } from './routes';

const SiteContainer = styled('div')`
  width: 100%;
  padding: 0 25px;
`;

const initialState = {
  loggedIn: false,
};

const onMount = ({ setContextState }: any) => {
  setContextState('auth', {
    loggedIn: localStorage.getItem('spotify-access-token') ? true : false,
  });
};

const App: React.SFC = () => {
  initializeSpotify();
  return (
    <Provider initialState={initialState} onMount={onMount}>
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
    </Provider>
  );
};

export default App;
