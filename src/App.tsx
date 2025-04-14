import Layout from "@/components/layout";
import FileUploader from "@/features/FileUploader";
import PDFViewer from "@/features/PDFViewer";

import { PDFProvider } from "@/context/usePDFContext/provider.tsx";
import { ThemeProvider } from "@emotion/react";
import theme from "@/assets/styles/theme.ts";
import { DialogProvider } from "@/context/useDialog/provider.tsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PDFProvider>
        <DialogProvider>
          <Layout
            children={{
              fileUploader: <FileUploader />,
              PDFViewer: <PDFViewer />,
            }}
          />
        </DialogProvider>
      </PDFProvider>
    </ThemeProvider>
  );
}

export default App;
