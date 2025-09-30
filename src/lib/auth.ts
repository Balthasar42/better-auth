import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { lastLoginMethod } from "better-auth/plugins"
import { db } from "@/db/drizzle"
import { schema } from "@/db/schema"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
  },

  plugins: [lastLoginMethod(), nextCookies()],
})
