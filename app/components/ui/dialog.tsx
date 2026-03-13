"use client"

import * as React from "react"
import { X } from "lucide-react"

interface DialogContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextType | undefined>(undefined)

function useDialog() {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error("useDialog must be used within a Dialog")
  }
  return context
}

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

function Dialog({ open: controlledOpen, onOpenChange, children }: DialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const setOpen = (newOpen: boolean) => {
    if (isControlled) {
      onOpenChange?.(newOpen)
    } else {
      setInternalOpen(newOpen)
    }
  }

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  )
}

function DialogTrigger({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useDialog()
  return (
    <button {...props} onClick={() => setOpen(true)}>
      {children}
    </button>
  )
}

function DialogContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const { open, setOpen } = useDialog()

  if (!open) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setOpen(false)}
      />
      <div className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-background border border-secondary rounded-lg shadow-lg ${className}`}>
        <button
          className="absolute right-4 top-4 p-1 hover:bg-secondary rounded"
          onClick={() => setOpen(false)}
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </>
  )
}

function DialogHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-6 py-4 border-b border-secondary ${className}`}>{children}</div>
}

function DialogTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`text-lg font-semibold text-foreground ${className}`}>{children}</h2>
}

function DialogBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>
}

function DialogFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-6 py-4 border-t border-secondary flex justify-end gap-2 ${className}`}>{children}</div>
}

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter }
