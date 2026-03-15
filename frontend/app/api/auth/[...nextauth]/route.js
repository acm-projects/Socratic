import { prisma } from '../../../../lib/prisma'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from "@auth/prisma-adapter"

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const authOption = {
  adapter: PrismaAdapter(prisma),
  debug: true,
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {

    async signIn({ account, profile }) {
        console.log("Sign in callback")
        try {
            if (!profile?.email) {
            return false
            }
            return true
        } catch (error) {
            console.error("Sign in error")
            return false
        }
        },

        },
    }

const handler = NextAuth(authOption)
export { handler as GET, handler as POST }