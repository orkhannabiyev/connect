import { FEED_ROUTES, PROFILE_ROUTES } from '@navigation/stacks/AppStack';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

export type AppStackParams = {
  // [APP_ROUTES.MAIN]:
  //   | {
  //       shelfId?: Shelf;
  //       joinToken?: string;
  //       inviteById?: string;
  //     }
  //   | undefined;
  [FEED_ROUTES.FEED]: undefined;
  [FEED_ROUTES.ADD_POST]: undefined;
  [PROFILE_ROUTES.PROFILE]: { userId: string };
  [PROFILE_ROUTES.EDIT_PROFILE]: undefined;
  // [APP_ROUTES.ROOM]: {
  //   roomData?: Room;
  // };
};

export type AppScreenRouteProp = RouteProp<AppStackParams, FEED_ROUTES.FEED>;
export type AppScreenNavigationProp = StackNavigationProp<
  AppStackParams,
  FEED_ROUTES.FEED
>;

export type RootStackParamList = AppStackParams;
