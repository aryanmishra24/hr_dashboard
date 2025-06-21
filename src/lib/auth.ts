import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const mockUsers = [
  {
    id: "1",
    name: "HR Manager",
    email: "hr@company.com",
    password: "password123",
    role: "hr_manager",
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@company.com",
    password: "admin123",
    role: "admin",
  },
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = mockUsers.find(
          (user) =>
            user.email === credentials.email &&
            user.password === credentials.password
        );

        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
}); 