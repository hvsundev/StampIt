import { createContext } from "react";
import { DialogContextType } from "./interface";

const DialogContext = createContext<DialogContextType | null>(null);
export default DialogContext;
