import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Maximize2 } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl?: string;
  pdfContent?: string;
  title?: string;
  onPageChange?: (page: number) => void;
  className?: string;
}

export function PDFViewer({ 
  pdfUrl, 
  pdfContent, 
  title = 'Document',
  onPageChange,
  className = ''
}: PDFViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      onPageChange?.(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      onPageChange?.(currentPage + 1);
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const handleDownload = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    } else if (pdfContent) {
      const link = document.createElement('a');
      link.href = pdfContent;
      link.download = `${title}.pdf`;
      link.click();
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const getPdfSrc = () => {
    if (pdfUrl) return pdfUrl;
    if (pdfContent) {
      if (pdfContent.startsWith('data:application/pdf')) {
        return pdfContent;
      }
      return `data:application/pdf;base64,${pdfContent}`;
    }
    return null;
  };

  const pdfSrc = getPdfSrc();

  if (!pdfSrc) {
    return (
      <div className={`flex flex-col items-center justify-center p-12 bg-slate-900/50 border border-slate-700 rounded-xl ${className}`}>
        <div className="text-slate-400 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-lg font-medium">No document available</p>
          <p className="text-sm text-slate-500 mt-1">The contract document will appear here once uploaded</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`flex flex-col bg-slate-900 border border-slate-700 rounded-xl overflow-hidden ${isFullscreen ? 'fixed inset-4 z-50' : ''} ${className}`}
      data-testid="pdf-viewer"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <h3 className="font-medium text-white truncate max-w-[200px]">{title}</h3>
          <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">
            Page {currentPage} of {totalPages}
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="text-slate-400 hover:text-white hover:bg-slate-700"
            data-testid="button-prev-page"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="text-slate-400 hover:text-white hover:bg-slate-700"
            data-testid="button-next-page"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          
          <div className="w-px h-6 bg-slate-700 mx-2" />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoom <= 50}
            className="text-slate-400 hover:text-white hover:bg-slate-700"
            data-testid="button-zoom-out"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-xs text-slate-400 w-12 text-center">{zoom}%</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoom >= 200}
            className="text-slate-400 hover:text-white hover:bg-slate-700"
            data-testid="button-zoom-in"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          
          <div className="w-px h-6 bg-slate-700 mx-2" />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            className="text-slate-400 hover:text-white hover:bg-slate-700"
            data-testid="button-download-pdf"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            className="text-slate-400 hover:text-white hover:bg-slate-700"
            data-testid="button-fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto bg-slate-950 p-4" style={{ minHeight: '500px' }}>
        <div 
          className="mx-auto transition-transform duration-200"
          style={{ 
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            width: 'fit-content'
          }}
        >
          <iframe
            src={`${pdfSrc}#page=${currentPage}`}
            className="w-[800px] h-[1100px] bg-white rounded shadow-xl"
            title={title}
            data-testid="pdf-iframe"
          />
        </div>
      </div>
      
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/80 -z-10" onClick={toggleFullscreen} />
      )}
    </div>
  );
}

export default PDFViewer;
