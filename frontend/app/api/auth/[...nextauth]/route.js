
import { prisma } from '../../../../lib/prisma'
import { session } from '../../../../lib/session'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const authOption = {
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
        console.log('no email')
        throw new Error('No profile')
      } 


      console.log('upsert')
      await prisma.user.upsert({
        where: {
          email: profile.email,
        },
        create: {
          email: profile.email,
          //name: profile.name,
        },
        update: {
          //name: profile.name,
          email: profile.email,
        },
      })
      console.log("user upserted")
      return true
    },
    session,
    async jwt({ token, user, account, profile }) {
      console.log('jwt callback')
      if (profile) {
        const user = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        })
        console.log("User found in DB")
        if (!user) {
          throw new Error('No user found')
        }
        token.id = user.id
      }
      return token
    },
  },
}

const handler = NextAuth(authOption)
export { handler as GET, handler as POST }