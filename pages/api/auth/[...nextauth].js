import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import VkProvider from "next-auth/providers/vk";
import signIIn from "../../../services/auth";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Sign in with Email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        /**
         * This function is used to define if the user is authenticated or not.
         * If authenticated, the function should return an object contains the user data.
         * If not, the function should return `null`.
         */
        if (credentials == null) return null;
        /**
         * credentials is defined in the config above.
         * We can expect it contains two properties: `email` and `password`
         */
        try {
          const { user, jwt } = await signIIn({
            email: credentials.email,
            password: credentials.password,
          });

          return { ...user, jwt };
        } catch (error) {
          // Sign In Fail
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
  },
  callbacks: {
    session: async ({ session, token }) => {
 
              
      session.id = token.id;
      session.jwt = token.jwt;

      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.username = token.username;
      session.user.avatar = token.avatar;

      return Promise.resolve(session);
    },
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
              
        token.id = user.id;
        token.jwt = user.jwt;

        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.username = user.username;
        token.avatar = user.avatar;
      }
      return Promise.resolve(token);
    },
  },
};

export default NextAuth(authOptions);
