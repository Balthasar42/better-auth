"use client"

import { zodResolver } from "@hookform/resolvers/zod"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { LoadingButton } from "@/components/atoms/loading-button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { user } from "@/db/schema"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

type DBUser = typeof user.$inferSelect

const formSchema = z.object({
  name: z.string().min(8),
})

interface UserFormProps extends React.ComponentProps<"form"> {
  user?: Partial<DBUser>
}

export function UserForm({ user, className, ...props }: UserFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const cleanedUserValues = Object.fromEntries(
    Object.entries(user || {})
      .filter(([, v]) => v != null)
      .map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ...cleanedUserValues,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    const { error } = await authClient.updateUser({
      name: values.name,
    })

    if (error) {
      toast.error("Error updating account")
    } else {
      toast.success("Account updated successfully")
    }

    setIsLoading(false)
    router.refresh()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("w-full space-y-8", className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          type="submit"
          loading={isLoading}
          disabled={!form.formState.isDirty}
        >
          Update
        </LoadingButton>
      </form>
    </Form>
  )
}
