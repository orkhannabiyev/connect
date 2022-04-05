export type UserBody = {
  isAnonymous: boolean;
  emailVerified: boolean;
  providerData: [
    {
      email: string;
      providerId: string;
      uid: string;
      photoURL: string;
      displayName: string;
    },
  ];
  uid: string;
  email: string;
  refreshToken: string;
  displayName: string;
  tenantId?: null;
  phoneNumber?: null;
  photoURL: string;
  metadata: {
    creationTime: number;
    lastSignInTime: number;
  };
  providerId: string;
};
