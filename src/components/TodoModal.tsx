'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { ReactNode } from 'react';

interface TodoModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export default function TodoModal({
  open,
  title,
  onClose,
  children,
}: TodoModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="relative z-50"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30"
        aria-hidden="true"
      />

      {/* Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          className="
            w-full
            max-w-lg
            rounded-xl
            bg-white
            p-6
            shadow-xl
          "
        >
          <div className="flex items-center justify-between mb-6">
            <DialogTitle className="text-xl font-semibold">
              {title}
            </DialogTitle>

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>

          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}