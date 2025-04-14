import { useState } from "react";
import DialogContext from "./context";
import { ConfirmOptions, ToastOptions } from "./interface";
import Confirm from "@/components/common/Confirm";
import Toast from "@/components/common/Toast";

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [confirm, setConfirm] = useState<
    (ConfirmOptions & { resolve: (v: boolean) => void }) | null
  >(null);

  const [toast, setToast] = useState<ToastOptions | null>(null);

  const showConfirm = (options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirm({ ...options, resolve });
    });
  };

  const showToast = (options: ToastOptions) => {
    setToast(options);
    setTimeout(() => setToast(null), 2000); // 2초 후 자동 사라짐
  };

  const handleConfirm = (result: boolean) => {
    confirm?.resolve(result);
    setConfirm(null);
  };

  return (
    <DialogContext.Provider value={{ showConfirm, showToast }}>
      {children}
      {confirm && (
        <Confirm
          title={confirm.title}
          description={confirm.description}
          onCancel={() => handleConfirm(false)}
          onConfirm={() => handleConfirm(true)}
        />
      )}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </DialogContext.Provider>
  );
};
