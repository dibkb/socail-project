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
import { signinSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import CardContainer from "./card-container";
import { register } from "@/actions/signup";
import { AlertDestructive } from "../errors/error-message";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      name: "",
    },
  });
  const onSubmit = (values: z.infer<typeof signinSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((res) => {
        if (res.data) {
          router.push("/auth/login");
        }
        if (res.error) {
          setError(res.error);
        }
      });
    });
  };

  return (
    <div className="w-full">
      <CardContainer
        alternateLabel="Already have an account?"
        alternateLink={"/auth/login"}
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
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={"Username"}
                            className="focus-visible:ring-stone-700 py-8 bg-stone-900 rounded-xl"
                            type={"text"}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={"Name"}
                          className="focus-visible:ring-stone-700 py-8 bg-stone-900 rounded-xl"
                          type={"text"}
                        />
                      </FormControl>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={"Email"}
                          className="focus-visible:ring-stone-700 py-8 bg-stone-900 rounded-xl"
                          type={"email"}
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
                          {...field}
                          placeholder={"Password"}
                          className="focus-visible:ring-stone-700 py-8 bg-stone-900 rounded-xl"
                          type={"password"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error?.length ? (
                  <AlertDestructive
                    message={error}
                    onCloseHandler={() => setError(undefined)}
                  />
                ) : (
                  ""
                )}
                <Button type="submit" className="w-full py-8">
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
