import { getServerSession } from 'next-auth'

export const session = async ({ session, token }) => {
  session.user.id = token.id
  return session
}

export const getUserSession = async () => {
  const authUserSession = await getServerSession({
    callbacks: {
      session,
    },
  })
  return authUserSession?.user
}