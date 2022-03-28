export function firebaseErrorMessagehandler(code: string) {
  switch (code) {
    case 'auth/user-not-found':
      return 'There is no such a user';
    case 'auth/wrong-password':
      return 'The password is invalid';
    default:
      'Sorry, something went wrong';
  }
}
