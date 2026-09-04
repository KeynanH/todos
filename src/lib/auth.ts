import { hygraphClient } from "@/graphql/client";
import { GET_USER_BY_EMAIL } from "@/graphql/queries";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth"; // Import the type instead
import Credentials from "next-auth/providers/credentials";

// Change this to a plain object configuration
export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials:{
                email: { label: "Email", type: "email"},
                password: { label: "Password", type: "password"}
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password) {
                    throw new Error("Please enter your email and password.")
                }

                const data: any = await hygraphClient.request(GET_USER_BY_EMAIL, {
                    email: credentials.email.toLocaleLowerCase(),
                })

                const user = data.hygraphUser;

                if (!user || !user.password) {
                    throw new Error("No user found with this email.");
                }

                const isValidPassword = await bcrypt.compare(credentials.password, user.password)

                if (!isValidPassword) {
                    throw new Error("Incorrect password.");
                }

                return {
                    id: user.id,
                    email: user.email,
                }
            }
        }),
    ],
    session: { strategy: "jwt" },
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
            }
            return session;
        }
    }
};
