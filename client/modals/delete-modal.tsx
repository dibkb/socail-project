import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@/components/ui/button";
interface DeleteModal {
  onCloseHandler: () => void;
  openDeleteModal: boolean;
}
const DeleteModal = ({ onCloseHandler, openDeleteModal }: DeleteModal) => {
  return (
    <Transition appear show={openDeleteModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onCloseHandler}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Are you sure you want to delete this post
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Deleting will permanently remove this post from the
                    database. You can't retrive it again
                  </p>
                </div>
                <div className="mt-4">
                  <Button onClick={onCloseHandler} variant={"destructive"}>
                    Yes I understand
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteModal;
