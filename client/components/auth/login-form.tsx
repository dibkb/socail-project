"use client";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Input } from "../ui/input";
import { login } from "@/actions/login";
import { useUserStore } from "../../src/providers/user-store-provider";
const LoginForm = () => {
  const router = useRouter();
  const { setUser } = useUserStore((state) => state);
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    // TODO:
    // 1 pending state
    // 2 error message
    setError("");
    startTransition(async () => {
      login(values).then((res) => {
        if (res.data) {
          setUser(res.data);
          router.push("/");
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
        alternateLabel="Don't have an account?"
        alternateLink={"/auth/signup"}
      >
        <Card className="border-none">
          <CardHeader>
            <CardTitle className="text-center text-lg">@ Log in now</CardTitle>
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
                          {...field}
                          placeholder={"Username"}
                          className="focus-visible:ring-stone-700 py-8 bg-stone-900 rounded-xl"
                          type={"text"}
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
                <Button type="submit" className="w-full py-8">
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardContent>
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
