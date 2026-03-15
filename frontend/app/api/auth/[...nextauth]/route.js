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
        if (!profile?.email) {
            return false
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: profile.email }
        })

        if (!existingUser) return '/signup'
        return true
    },

    async jwt({ token, user, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
        token.id = profile.id
      }
      return token
    },

    async session({ session, token }) {
      session.user.id = token.id
      return session
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
    
  },
    
}

const handler = NextAuth(authOption)
export { handler as GET, handler as POST }