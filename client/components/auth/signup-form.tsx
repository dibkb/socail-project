"use client";
import React from "react";
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
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  return (
    <div className="">
      <Card className="min-w-[400px] border-none drop-shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center">
            Log in with your Github account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col bg-stone-900 rounded-xl">
                <Input
                  id="name"
                  placeholder="Username"
                  className="focus-visible:ring-stone-700 py-6 rounded-xl
                  "
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupForm;
