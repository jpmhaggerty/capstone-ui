import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import pdf from "../pdfs/nasa-std-4010.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export default function PdfViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <>
      <Document
        file={pdf}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </p>
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </>
  );
}



// import { useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
// import pdf from "../pdfs/nasa-std-4010.pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

// export default function PdfViewer() {
//   const [numPages, setNumPages] = useState(null);

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }

//   return (
//     <div>
//       <Document
//       file={pdf}
//       onLoadSuccess={onDocumentLoadSuccess}
//     >
//       {Array.from(
//         new Array(numPages),
//         (el, index) => (
//           <Page
//             key={`page_${index + 1}`}
//             pageNumber={index + 1}
//           />
//         ),
//       )}
//       </Document>
//     </div>
//   );
// }
