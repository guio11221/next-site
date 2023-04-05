import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      client_id: "882476600218-2q7erksrdaht441m2k8nhjkaosf8q5an.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  theme: {
    colorScheme: "dark",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      console.log(token)
      return token
    },
  }
}

export default NextAuth(authOptions)
