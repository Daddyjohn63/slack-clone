import GitHub from '@auth/core/providers/github';
import { Password } from '@convex-dev/auth/providers/password';
import { convexAuth } from '@convex-dev/auth/server';

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [Password, GitHub]
  // callbacks: {
  //   async redirect({ redirectTo }) {
  //     // Check that `redirectTo` is valid
  //     // and return the relative or absolute URL
  //     // to redirect to.
  //     return redirectTo; // Return the redirectTo URL
  //   }
  // }
});
