import { CardContent } from "@/components/ui/card";
import authfooter from "../../utils/auth-footer";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col justify-end items-start h-full max-w-[500px] mx-auto gap-y-20">
      {children}
      <CardContent className="flex items-center flex-wrap text-xs gap-x-2 gap-y-1 justify-center text-stone-600">
        {authfooter.map((ele) => (
          <span key={ele} className="hover:underline cursor-pointer">
            {ele}
          </span>
        ))}
      </CardContent>
    </main>
  );
}
