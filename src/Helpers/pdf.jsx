async function createPdf() {
    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create();

    // Embed the Times Roman font
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // Add a blank page to the document
    const page = pdfDoc.addPage();

    // Get the width and height of the page
    const { width, height } = page.getSize();

    // Draw a string of text toward the top of the page
    const fontSize = 30;
    page.drawText("Creating PDFs in JavaScript is awesome!", {
        x: 50,
        y: height - 4 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Trigger the browser to download the PDF document
    downloadjs(pdfBytes, "test.pdf", "application/pdf");
}

async function modifyPdf() {
    const pdfDoc = await PDFDocument.load("../data/matrice/BTS_NDRC_2.pdf");
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    firstPage.drawText("Mohamad", {
        x: 80,
        y: height / 2 + 300,
        size: 50,
        font: helveticaFont,
        color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    downloadjs(pdfBytes, "test.pdf", "application/pdf");
}
