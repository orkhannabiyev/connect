export type UserBody = {
  isAnonymous: boolean; // false;
  emailVerified: boolean; // false;
  providerData: [
    {
      email: string; //'kok@kok.com';
      providerId: string; //'password';
      uid: string; //'kok@kok.com';
      photoURL: string; // 'https://firebasestorage.googleapis.com/v0/b/connect-67b7c.appspot.com/o/photos%2FIMG_00031646218397833.JPG?alt=media&token=ce6728ed-a237-498b-93c1-6c461f296f82';
      displayName: string; //'lolka';
    },
  ];
  uid: string; //'1jwziqeAtFXxG9GEcb7dowtK7el1';
  email: string; //'kok@kok.com';
  refreshToken: string; //'AIwUaOm0XftWCsvFbfUkJhIQ99N63EqGx7I04iKDbfv9jhTSfsTx6Gb9G4LfWW4HaYBSDyivTdjbz3UTS8YI1oBKKbrW_4P_I6DFbbvzDobmilv4vIUFlIb5VRJNzUjZ7Gw24W8N6JHvrvddD0WxzgULjgBMukD13s_3bwyX-BYcKF9OENLDZEy7hS1nqi6APLNFPPAHLlchMw3zm78vmSnc_7IhNnytSQ';
  displayName: string; //'lolka';
  tenantId?: null;
  phoneNumber?: null;
  photoURL: string; //'https://firebasestorage.googleapis.com/v0/b/connect-67b7c.appspot.com/o/photos%2FIMG_00031646218397833.JPG?alt=media&token=ce6728ed-a237-498b-93c1-6c461f296f82';
  metadata: {
    creationTime: number; // 1644662377394;
    lastSignInTime: number; //1644662582425;
  };
  providerId: string; //'firebase';
};
