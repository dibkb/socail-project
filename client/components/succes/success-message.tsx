import { Cross1Icon, RocketIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
interface Successmessage {
  children: React.ReactNode;
  onCloseHandler: () => void;
}
export function Successmessage({ children, onCloseHandler }: Successmessage) {
  return (
    <Alert>
      <span
        className="absolute right-3 hover:bg-stone-700 p-1 rounded-full cursor-pointer"
        onClick={onCloseHandler}
      >
        <Cross1Icon />
      </span>
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>Account sucessfully created !</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
