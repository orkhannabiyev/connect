export function firebaseErrorMessagehandler(code: string | undefined) {
  switch (code) {
    case 'auth/user-not-found':
      return 'There is no such a user';
    case 'auth/wrong-password':
      return 'The password is invalid';
    default:
      return 'Sorry, something went wrong';
  }
}
