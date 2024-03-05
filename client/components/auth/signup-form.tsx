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
import CardContainer from "@/app/auth/card-container";
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
      <CardContainer>
        <Card className="border-none">
          <CardHeader>
            <CardTitle className="text-center text-lg">
              Join Threads today !
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
                <Button type="submit" className="w-full py-6">
                  Register
                </Button>
              </form>
            </Form>
            {/* <Link
            href={"/"}
            className="text-center hover:underline text-stone-500 text-sm"
          >
            Forgotten Password?
          </Link> */}
          </CardContent>
        </Card>
      </CardContainer>
    </div>
  );
};

export default SignupForm;
