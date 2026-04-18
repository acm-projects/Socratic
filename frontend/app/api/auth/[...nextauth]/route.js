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
            prompt: "consent",
            access_type: "offline",
            // response_type: "code"
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
    if (account.refresh_token) {
      token.refreshToken = account.refresh_token
    }
    token.isNewUser = newUsers.has(profile.email)  
    newUsers.delete(profile.email) 
    
    const dbUser = await prisma.user.findUnique({
      where: { email: profile.email }
    })
    token.id = dbUser?.id
    token.picture = profile.picture  // added this for pic, remove if not needed


    // added  this for pic, remove if not needed
    await prisma.user.update({
      where: { email: profile.email },
      data: { image: profile.picture }
    })

    const accountUpdateData = {
      access_token: account.access_token,
      expires_at: account.expires_at,
      id_token: account.id_token
    }

    if (account.refresh_token) {
      accountUpdateData.refresh_token = account.refresh_token
    }

    await prisma.account.update({
      where: {
        provider_providerAccountId: {
          provider: 'google',
          providerAccountId: account.providerAccountId
        }
      },
      data: accountUpdateData
    })

  }

  if (!account && token.id) {
      const dbAccount = await prisma.account.findFirst({
        where: { 
          userId: token.id,
          provider: 'google'
        }
      })
      if (dbAccount?.access_token) {
        token.accessToken = dbAccount.access_token
        token.refreshToken = dbAccount.refresh_token
      }
    }
  return token
},

    async session({ session, token }) {
      session.user.id = token.id
      session.isNewUser = token.isNewUser
      session.accessToken = token.accessToken
      session.user.image = token.picture  // add this for pic
      session.refreshToken = token.refreshToken //refresh

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