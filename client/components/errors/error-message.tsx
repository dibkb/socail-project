import { Cross1Icon, ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
interface AlertDestructive {
  message: string;
  onCloseHandler: () => void;
}
export function AlertDestructive({
  onCloseHandler,
  message,
}: AlertDestructive) {
  return (
    <Alert variant="default" className="border-stone-700 relative">
      <span
        className="absolute right-3 hover:bg-stone-700 p-1 rounded-full cursor-pointer"
        onClick={onCloseHandler}
      >
        <Cross1Icon />
      </span>
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle className="font-semibold text-sm">Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
