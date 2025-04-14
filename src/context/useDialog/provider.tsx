import { useState } from "react";
import DialogContext from "./context";
import { ConfirmOptions } from "./interface";
import Confirm from "@/components/common/Confirm";

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [confirm, setConfirm] = useState<
    (ConfirmOptions & { resolve: (v: boolean) => void }) | null
  >(null);

  const showConfirm = (options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirm({ ...options, resolve });
    });
  };

  const handleConfirm = (result: boolean) => {
    confirm?.resolve(result);
    setConfirm(null);
  };

  return (
    <DialogContext.Provider value={{ showConfirm }}>
      {children}
      {confirm && (
        <Confirm
          title={confirm.title}
          description={confirm.description}
          onCancel={() => handleConfirm(false)}
          onConfirm={() => handleConfirm(true)}
        />
      )}
    </DialogContext.Provider>
  );
};
