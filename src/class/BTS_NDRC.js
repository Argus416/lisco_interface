import axios from "axios";
import { PDFDocument, grayscale, rgb } from "pdf-lib";

export class BTS_NDRC {
    constructor() {
        this.pdfURL = "https://mysterious-scrubland-82531.herokuapp.com/data/BTS_NDRC.pdf";
    }

    // ********************************************

    async getPdf() {
        const pdf = await axios({
            method: "GET",
            responseType: "arraybuffer",
            url: this.pdfURL,
        })
            .then((res) => res.data)
            .catch((err) => console.error(`Error fetching PDF, CODE ERROR ${err}`));

        return pdf;
    }

    // ********************************************

    async generatePdf(students) {
        const pdf = await this.getPdf();
        const allStudentPdf = [];

        if (students.length) {
            try {
                await Promise.all(
                    students.map(async (eleve, index) => {
                        // Load an existing PDFDocument
                        const pdfDoc = await PDFDocument.load(pdf);

                        // Get the first page of the document
                        const firstPage = pdfDoc.getPage(0);
                        const secondePage = pdfDoc.getPage(1);

                        // Get the width and height of the first page
                        const { width, height } = firstPage.getSize();

                        // **********************************************

                        const studentsFirstYear = eleve["1ere ANNEE"] ?? [];
                        const studentsSecondeYear = eleve["2e ANNEE"] ?? [];

                        const configText = {
                            size: 12,
                            color: rgb(0, 0, 0.5),
                        };

                        let moyenneMetierY = 126;
                        // ! Change year here
                        if (studentsSecondeYear.length && studentsSecondeYear !== undefined) {
                            const positionsLineGraphicStudent = [];
                            const positionsLineGraphicGroup = [];

                            // ! Change year here
                            await Promise.all(
                                studentsSecondeYear.map(async (secondYear, student_index) => {
                                    moyenneMetierY = moyenneMetierY - 25;
                                    const Coordonnes = [
                                        {
                                            text: secondYear.NOM_APPRENANT !== null ? secondYear.NOM_APPRENANT : "",
                                            position: {
                                                x: width / 2 - 130,
                                                y: height / 2 + 228,
                                                ...configText,
                                            },
                                        },

                                        {
                                            text:
                                                secondYear.PRENOM_APPRENANT !== null ? secondYear.PRENOM_APPRENANT : "",
                                            position: {
                                                x: width / 2 - 130,
                                                y: height / 2 + 195,
                                                ...configText,
                                            },
                                        },

                                        {
                                            text:
                                                secondYear.DATE_NAISSANCE_APPRENANT !== null
                                                    ? secondYear.DATE_NAISSANCE_APPRENANT
                                                    : "",

                                            position: {
                                                x: width / 2 - 130,
                                                y: height / 2 + 163,
                                                ...configText,
                                            },
                                        },

                                        {
                                            text:
                                                secondYear.CODE_APPRENANT !== null
                                                    ? "code apprenant " + secondYear.CODE_APPRENANT
                                                    : "",
                                            position: {
                                                x: width / 2 + 10,
                                                y: height / 2 + 163,
                                                size: configText.size,
                                                // font: configText.font,
                                                color: configText.color,
                                            },
                                        },
                                    ];

                                    Coordonnes.map((coord, coord_index) => {
                                        if (student_index === 1) {
                                            firstPage.drawText(coord.text ?? "", coord.position);
                                        }
                                    });

                                    let MoyenneMetierPremiereAnnee = {
                                        text:
                                            studentsFirstYear[student_index] == null
                                                ? ""
                                                : studentsFirstYear[student_index].MOYENNE_MAT_GENERALE,
                                        position: {
                                            x: 70,
                                            y: height / 2 + moyenneMetierY,
                                            ...configText,
                                        },
                                    };

                                    let MoyenneMetierDeuxiemeAnnee = {
                                        text:
                                            secondYear.MOYENNE_MAT_GENERALE === null
                                                ? ""
                                                : secondYear.MOYENNE_MAT_GENERALE,
                                        position: {
                                            x: width / 2 + 70,
                                            y: height / 2 + moyenneMetierY,
                                            ...configText,
                                        },
                                    };

                                    let semestreUn = {
                                        text:
                                            secondYear.MOYENNE_1 !== null && secondYear.MOYENNE_1 !== undefined
                                                ? secondYear.MOYENNE_1
                                                : "",
                                        position: {
                                            x: width / 2 - 40,
                                            y: height / 2 + moyenneMetierY,
                                            ...configText,
                                        },
                                    };

                                    let semestreDeux = {
                                        text:
                                            secondYear.MOYENNE_2 !== null && secondYear.MOYENNE_2 !== undefined
                                                ? secondYear.MOYENNE_2
                                                : "",
                                        position: {
                                            x: width / 2 + 15,
                                            y: height / 2 + moyenneMetierY,
                                            ...configText,
                                        },
                                    };

                                    let observationAnnuelleMatier = {
                                        text:
                                            secondYear.OBSERVATION_ANNUELLE_MATIERE !== null &&
                                            secondYear.OBSERVATION_ANNUELLE_MATIERE !== undefined
                                                ? secondYear.OBSERVATION_ANNUELLE_MATIERE
                                                : "",
                                        position: {
                                            x: width / 2 + 120,
                                            y: height / 2 + moyenneMetierY,
                                            ...configText,
                                        },
                                    };

                                    firstPage.drawText(
                                        MoyenneMetierPremiereAnnee.text ?? "",
                                        MoyenneMetierPremiereAnnee.position
                                    );

                                    firstPage.drawText(semestreUn.text, semestreUn.position);
                                    firstPage.drawText(semestreDeux.text, semestreDeux.position);

                                    firstPage.drawText(
                                        MoyenneMetierDeuxiemeAnnee.text,
                                        MoyenneMetierDeuxiemeAnnee.position
                                    );

                                    firstPage.drawText(
                                        observationAnnuelleMatier.text,
                                        observationAnnuelleMatier.position
                                    );

                                    // ! Graphic

                                    // Moyenne d'un eleve
                                    let moyenne = 0;
                                    let moyenneGroupMatier = 0;

                                    if (
                                        secondYear.MOYENNE_MAT_GENERALE !== null &&
                                        secondYear.MOYENNE_MAT_GENERALE !== NaN
                                    ) {
                                        moyenne = parseFloat(secondYear.MOYENNE_MAT_GENERALE);
                                    }

                                    if (
                                        secondYear.MOYENNE_MAT_GRPE_ANNUELLE !== null &&
                                        secondYear.MOYENNE_MAT_GRPE_ANNUELLE !== NaN
                                    ) {
                                        moyenneGroupMatier = parseFloat(secondYear.MOYENNE_MAT_GRPE_ANNUELLE);
                                    }

                                    const drawLine = {
                                        start: {
                                            x: 120 + 80 + (student_index - 1) * 79.5,
                                            y: 107 + 12.7 * moyenne,
                                        },
                                        // end: { x: 120 + 79.5 * student_index, y: 100 + 12.7 * moyenne },
                                    };

                                    const drawLineGroup = {
                                        start: {
                                            x: 120 + 80 + (student_index - 1) * 79.5,
                                            y: 107 + 12.7 * moyenneGroupMatier,
                                        },
                                    };
                                    // *******
                                    if (moyenne < 10 && moyenne > 5) {
                                        drawLine.start.y = drawLine.start.y - 4;
                                    }

                                    if (moyenne < 5) {
                                        drawLine.start.y = drawLine.start.y - 12;
                                    }

                                    if (moyenne == 0 || moyenne == NaN || moyenne == null) {
                                        drawLine.start.y = 85;
                                    }

                                    positionsLineGraphicGroup.push(drawLineGroup);
                                    // *******

                                    if (moyenneGroupMatier < 10 && moyenneGroupMatier > 5) {
                                        drawLineGroup.start.y = drawLineGroup.start.y - 4;
                                    }

                                    if (moyenneGroupMatier < 5) {
                                        drawLineGroup.start.y = drawLineGroup.start.y - 12;
                                    }

                                    if (moyenneGroupMatier == 0) {
                                        drawLineGroup.start.y = 85;
                                    }

                                    positionsLineGraphicStudent.push(drawLine);
                                    // *******

                                    if (student_index + 1 === studentsSecondeYear.length) {
                                        positionsLineGraphicGroup.map((position, indexLinePosition) => {
                                            if (indexLinePosition + 1 !== positionsLineGraphicGroup.length) {
                                                secondePage.drawLine({
                                                    start: {
                                                        x: position.start.x,
                                                        y: position.start.y,
                                                    },
                                                    end: {
                                                        x: positionsLineGraphicGroup[indexLinePosition + 1].start.x,
                                                        y: positionsLineGraphicGroup[indexLinePosition + 1].start.y,
                                                    },
                                                    thickness: 2,
                                                });

                                                if (indexLinePosition === 0) {
                                                    secondePage.drawCircle({
                                                        x: position.start.x,
                                                        y: position.start.y,
                                                        size: 3,
                                                    });
                                                }

                                                secondePage.drawCircle({
                                                    x: positionsLineGraphicGroup[indexLinePosition + 1].start.x,
                                                    y: positionsLineGraphicGroup[indexLinePosition + 1].start.y,
                                                    size: 3,
                                                });
                                            }
                                        });

                                        positionsLineGraphicStudent.map((position, indexLinePosition) => {
                                            if (indexLinePosition + 1 !== positionsLineGraphicStudent.length) {
                                                secondePage.drawLine({
                                                    start: {
                                                        x: position.start.x,
                                                        y: position.start.y,
                                                    },
                                                    end: {
                                                        x: positionsLineGraphicStudent[indexLinePosition + 1].start.x,
                                                        y: positionsLineGraphicStudent[indexLinePosition + 1].start.y,
                                                    },
                                                    thickness: 2,
                                                    color: rgb(0.75, 0.2, 0.2),
                                                });

                                                if (indexLinePosition === 0) {
                                                    secondePage.drawCircle({
                                                        x: position.start.x,
                                                        y: position.start.y,
                                                        size: 3,
                                                        color: rgb(0.75, 0.2, 0.2),
                                                    });
                                                }

                                                secondePage.drawCircle({
                                                    x: positionsLineGraphicStudent[indexLinePosition + 1].start.x,
                                                    y: positionsLineGraphicStudent[indexLinePosition + 1].start.y,
                                                    size: 3,
                                                    color: rgb(0.75, 0.2, 0.2),
                                                });
                                            }
                                        });
                                    }

                                    // ! *********************************************************
                                })
                            );
                        }

                        let pdfStudent = await pdfDoc.save();
                        allStudentPdf.push(pdfStudent);
                    })
                );
            } catch (err) {
                return console.error(`Error generating PDF, CODE ERROR ${err}`);
            }
        } else {
            console.error("No students have been found");
        }

        return allStudentPdf;
    }

    printGraphic() {}

    // ********************************************
}
