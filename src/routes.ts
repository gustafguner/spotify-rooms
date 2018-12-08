import { Discover } from 'src/features/discover';
import { Room } from 'src/features/room';

export const routes = [
  { path: '/', Component: Discover, exact: true },
  { path: '/room/:id', Component: Room },
];
