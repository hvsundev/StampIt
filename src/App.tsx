import Layout from "@/components/layout";
import FileUploader from "@/features/FileUploader";
import PDFViewer from "@/features/PDFViewer";
import PDFPreview from "@/features/PDFPreview";

import { PDFProvider } from "@/context/usePDFContext/provider.tsx";
import { ThemeProvider } from "@emotion/react";
import theme from "@/assets/styles/theme.ts";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PDFProvider>
        <Layout
          children={{
            fileUploader: <FileUploader />,
            PDFViewer: <PDFViewer />,
            PDFPreview: <PDFPreview />,
          }}
        />
      </PDFProvider>
    </ThemeProvider>
  );
}

export default App;
