import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth"
import { get } from "@/utils/request";
export const authOptions: AuthOptions = {
      secret: process.env.NEXTAUTH_SECRET,
      providers: [
            CredentialsProvider({
                  // The name to display on the sign in form (e.g. "Sign in with...")
                  name: "Account",
                  // `credentials` is used to generate a form on the sign in page.
                  // You can specify which fields should be submitted, by adding keys to the `credentials` object.
                  // e.g. domain, username, password, 2FA token, etc.
                  // You can pass any HTML attribute to the <input> tag through the object.
                  credentials: {
                        username: { label: "Tên đăng nhập", type: "text" },
                        password: { label: "Mật khẩu", type: "password" }
                  },
                  async authorize(credentials, req) {
                        // Add logic here to look up the user from the credentials supplied
                        const username = credentials?.username
                        const password = credentials?.password
                        const res = await get(`users?username=${username}&password=${password}`)

                        if (res) {
                              // Any object returned will be saved in `user` property of the JWT
                              return res as any
                        } else {
                              // If you return null then an error will be displayed advising the user to check their details.
                              return null

                              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                        }
                  }
            }),
            GithubProvider({
                  clientId: process.env.GITHUB_ID!,
                  clientSecret: process.env.GITHUB_SECRET!,
            })
      ],
      callbacks: {
            async jwt({ token, user, account, profile, trigger }) {
                  if (trigger === "signIn" && account?.provider !== 'credentials') {

                        token.address = "thanh binh"
                  }
                  if (trigger === "signIn" && account?.provider === 'credentials') {
                        // token.access_token = user.access_token
                        // token.refresh_token = user.refresh_token
                        // token.user = user.user
                  }
                  return token
            },
            session({ session, user, token }) {
                  // session.user.address = token.address
                  return session
            },
      }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }