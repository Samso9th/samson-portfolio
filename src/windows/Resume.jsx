import { useState } from 'react';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { WindowControls } from '#/components';
import WindowWrapper from '#/HOC/WindowWrapper';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Resume = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages));
  };

  return (
    <>
      <div id="window-header" className="flex items-center gap-3">
        <WindowControls target="resume" />
        <h2 className="flex-1">resume.pdf</h2>
        
        <div className="flex items-center gap-3">
          {numPages && (
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
                className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <span className="text-xs text-gray-600">
                {pageNumber} / {numPages}
              </span>
              
              <button
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
                className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
          
          <a
            href="/files/resume.pdf"
            download
            className="cursor-pointer p-1 rounded hover:bg-gray-200"
            title="Download Resume"
          >
            <Download className="icon" />
          </a>
        </div>
      </div>

      <div className="p-6 overflow-auto bg-gray-100 flex flex-col items-center" style={{ maxHeight: '600px' }}>
        <Document 
          file="/files/resume.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center p-10">
              <p className="text-gray-500">Loading PDF...</p>
            </div>
          }
          error={
            <div className="flex items-center justify-center p-10">
              <p className="text-red-500">Failed to load PDF. Please make sure resume.pdf exists in /public/files/</p>
            </div>
          }
        >
          <Page 
            pageNumber={pageNumber} 
            renderTextLayer 
            renderAnnotationLayer 
            className="shadow-lg"
          />
        </Document>
      </div>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, 'resume');

export default ResumeWindow;
