import PublicChat from './components/publicChat';
import RoomChat from './components/roomChat';
import LiveVisitors from './components/liveVisitors';

export default [
  { path: '/', exact: true, Component: PublicChat },
  { path: '/roomChat', Component: RoomChat },
  { path: '/liveVisitors', Component: LiveVisitors },
];
