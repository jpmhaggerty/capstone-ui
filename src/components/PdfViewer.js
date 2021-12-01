import { Document, Page } from "react-pdf";
import file from "../pdfs/sample.pdf";
// import workerFilePath from 'pdfjs-dist/build/pdf.worker.min.js';
// import pdfjs from 'pdfjs-dist';

export default async function PdfViewer() {
  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);

  // pdfjs.GlobalWorkerOptions.workerSrc = workerFilePath;

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  // }

  return (
    <div style={{ width: 600 }}>
      <Document
        file={file}
        // onLoadSuccess={onDocumentLoadSuccess}
      >
        {/* <Page pageNumber={pageNumber} width={600} /> */}
      </Document>
    </div>
  );
}
