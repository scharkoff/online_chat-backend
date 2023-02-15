import { TRoomsMap } from './types';

export const rooms: TRoomsMap = new Map([
  [
    'roomId',
    new Map([
      ['users', new Map()],
      ['messages', new Map()]
    ])
  ]
]);
