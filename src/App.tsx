import Layout from "@/components/shared/layout";
import FileUploader from "@/features/FileUploader";
import PDFViewer from "@/features/PDFViewer";

import { PDFProvider } from "@/context/usePDFFileManager/provider.tsx";
import { ThemeProvider } from "@emotion/react";
import theme from "@/assets/styles/theme.ts";
import { DialogProvider } from "@/context/useDialog/provider.tsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DialogProvider>
        <PDFProvider>
          <Layout
            children={{
              fileUploader: <FileUploader />,
              PDFViewer: <PDFViewer />,
            }}
          />
        </PDFProvider>
      </DialogProvider>
    </ThemeProvider>
  );
}

export default App;
