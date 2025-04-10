import FileUploader from "@/pages/FileUploader/FileUploader.tsx";
import PDFViewer from "@/pages/PDFViewer/PDFViewer.tsx";
import C from "@/pages/C/C";

import "./App.css";

function App() {
  return (
    <div id="app">
      <div>
        <FileUploader />
        <PDFViewer />
        <C />
      </div>
    </div>
  );
}

export default App;
