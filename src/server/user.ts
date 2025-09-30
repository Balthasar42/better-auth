"use server"

import { auth } from "@/lib/auth"

interface ServerActionResponse {
  success: boolean
  message: string
}

interface SignInProps {
  email: string
  password: string
}

export async function signIn({
  email,
  password,
}: SignInProps): Promise<ServerActionResponse> {
  try {
    await auth.api.signInEmail({
      body: { email, password },
    })
    return {
      success: true,
      message: "Successfully signed in",
    }
  } catch (error) {
    const e = error as Error
    return {
      success: false,
      message: e.message || "An unknown error occurred",
    }
  }
}

interface SignUpProps {
  email: string
  password: string
  name: string
}

export async function signUp({
  email,
  password,
  name,
}: SignUpProps): Promise<ServerActionResponse> {
  try {
    await auth.api.signUpEmail({
      body: { email, password, name },
    })
    return {
      success: true,
      message: "Successfully signed up",
    }
  } catch (error) {
    const e = error as Error
    return {
      success: false,
      message: e.message || "An unknown error occurred",
    }
  }
}
