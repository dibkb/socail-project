"use client";
import React, { useState, useTransition } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { signinSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
const SignupForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof signinSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      // TODO : api call
    });
  };

  return (
    <div className="">
      <Card className="min-w-[400px] border-none drop-shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center">Signin to join Threads</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="bg-stone-900 rounded-xl">
                    <FormControl>
                      <Input
                        placeholder="Username"
                        {...field}
                        className="focus-visible:ring-stone-700 py-6 rounded-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="bg-stone-900 rounded-xl">
                    <FormControl>
                      <Input
                        placeholder="Name"
                        {...field}
                        className="focus-visible:ring-stone-700 py-6 rounded-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="bg-stone-900 rounded-xl">
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        className="focus-visible:ring-stone-700 py-6 rounded-xl"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="bg-stone-900 rounded-xl">
                    <FormControl>
                      <Input
                        placeholder="Password"
                        {...field}
                        className="focus-visible:ring-stone-700 py-6 rounded-xl"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default SignupForm;
