import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "dummy-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy-client-secret",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // This is where you would typically verify against your database
        // For demo purposes, we'll use dummy verification
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // Get user from localStorage (if exists)
        if (typeof window !== "undefined") {
          const users = JSON.parse(localStorage.getItem("users") || "[]");
          const user = users.find((u: any) => u.email === credentials.email);

          if (user && user.password === credentials.password) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
            };
          }
        }

        // For demo purposes, accept any email/password combination
        // In a real application, you would verify against your database
        return {
          id: "1",
          name: "Demo User",
          email: credentials.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/auth/error",
    
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          userId: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
};

// Helper functions for local storage authentication
export const localAuth = {
  login: async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      const sessionUser = {
        id: user.id,
        email: user.email,
        name: user.name,
      };
      localStorage.setItem("currentUser", JSON.stringify(sessionUser));
      return sessionUser;
    }
    throw new Error("Invalid credentials");
  },

  signup: async (email: string, password: string, name: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    if (users.some((u: any) => u.email === email)) {
      throw new Error("User already exists");
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    const sessionUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    };
    localStorage.setItem("currentUser", JSON.stringify(sessionUser));
    return sessionUser;
  },

  logout: () => {
    localStorage.removeItem("currentUser");
  },

  getCurrentUser: () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("currentUser");
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  isAuthenticated: () => {
    return !!localAuth.getCurrentUser();
  },
};

// Custom types for enhanced type safety
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
  }
}