"use client";
import React, { useState, useTransition } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import CardContainer from "./card-container";
import Link from "next/link";

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      // TODO : api call
    });
  };

  return (
    <div className="w-full">
      <CardContainer
        alternateLabel="Don't have an account?"
        alternateLink={"/auth/signup"}
      >
        <Card className="border-none">
          <CardHeader>
            <CardTitle className="text-center text-lg">
              @ Join Threads today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                {/* Username */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Username"
                          {...field}
                          className="focus-visible:ring-stone-700 py-6 bg-stone-900 rounded-xl"
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
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          {...field}
                          className="focus-visible:ring-stone-700 py-8 bg-stone-900 rounded-xl"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full py-8">
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardContent className="">
            <Link
              href={"/"}
              className="hover:underline text-stone-500 text-sm flex justify-center"
            >
              Forgotten Password?
            </Link>
          </CardContent>
        </Card>
      </CardContainer>
    </div>
  );
};

export default LoginForm;
