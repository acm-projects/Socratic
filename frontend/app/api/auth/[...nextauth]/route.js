import { prisma } from '../../../../lib/prisma'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from "@auth/prisma-adapter"

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const newUsers = new Set() 

const authOption = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
            scope: 'openid email profile https://www.googleapis.com/auth/calendar',

            //extra for testing, shows permissions at every login
            //prompt: "consent",
            //access_type: "offline",
            //response_type: "code"
        }
  }
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (!profile?.email) return false
      const existingUser = await prisma.user.findUnique({
        where: { email: profile.email }
      })
      if (!existingUser) newUsers.add(profile.email)  
      return true
    },

    
async jwt({ token, account, profile }) {
  if (account) {
    token.accessToken = account.access_token
    token.isNewUser = newUsers.has(profile.email)  
    newUsers.delete(profile.email)
    
    const dbUser = await prisma.user.findUnique({
      where: { email: profile.email }
    })
    token.id = dbUser?.id
  }
  return token
},

    async session({ session, token }) {
      session.user.id = token.id
      session.isNewUser = token.isNewUser
      session.accessToken = token.accessToken
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