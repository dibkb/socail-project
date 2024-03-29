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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Single posts</TabsTrigger>
        <TabsTrigger value="password">Shread posts</TabsTrigger>
      </TabsList>
      <TabsContent value="account">sfsdfs</TabsContent>
      <TabsContent value="password">fsdffs</TabsContent>
    </Tabs>
  );
}
