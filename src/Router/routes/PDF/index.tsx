import { useState } from "react"
import { PDFDocument, rgb } from "pdf-lib"
import { Document, Page, pdfjs } from "react-pdf"

// Set PDF.js worker source
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

export default () => {
  const [pdfBytes, setPdfBytes] = useState(null)
  const [editedText, setEditedText] = useState("")
  const [pageCount, setPageCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const loadPdf = async (file: any) => {
    try {
      const pdfBytes = await file.arrayBuffer()
      setPdfBytes(pdfBytes)
      const pdfDoc = await PDFDocument.load(pdfBytes)
      const pages = pdfDoc.getPages()
      setPageCount(pages.length)
    } catch (error) {
      console.error("Error loading PDF:", error)
    }
  }

  const updatePdf = async () => {
    if (pdfBytes && editedText !== "") {
      const pdfDoc = await PDFDocument.load(pdfBytes)
      const page = pdfDoc.getPages()[currentPage - 1]
      //   const textWidth = 200
      //   const textHeight = 15
      const x = 100
      const y = 100

      page.drawText(editedText, {
        x,
        y,
        size: 12,
        color: rgb(0, 0, 0)
      })

      const modifiedPdfBytes = await pdfDoc.save()
      const modifiedPdfBlob = new Blob([modifiedPdfBytes.buffer], {
        type: "application/pdf"
      })

      const modifiedPdfUrl = URL.createObjectURL(modifiedPdfBlob)
      window.open(modifiedPdfUrl, "_blank")
    }
  }

  return (
    <div>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => loadPdf(e.target.files?.[0])}
      />
      <Document
        file={
          pdfBytes
            ? URL.createObjectURL(
                new Blob([pdfBytes], { type: "application/pdf" })
              )
            : null
        }
        onLoadSuccess={() => setCurrentPage(1)}
      >
        <Page pageNumber={currentPage} width={600} />
      </Document>
      <textarea
        rows={4}
        cols={50}
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
      />
      <button onClick={updatePdf}>Guardar cambios</button>
      <p>
        Página {currentPage} de {pageCount}
      </p>
      <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
        Página anterior
      </button>
      <button
        onClick={() => setCurrentPage(Math.min(pageCount, currentPage + 1))}
      >
        Siguiente página
      </button>
    </div>
  )
}
