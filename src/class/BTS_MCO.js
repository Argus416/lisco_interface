import axios from "axios";
import { PDFDocument, rgb } from "pdf-lib";

export class BTS_MCO {
    constructor() {
        const apiUrl = process.env.REACT_APP_API_URL;

        this.pdfURL = `${apiUrl}/data/BTS_MCO.pdf`;
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

                        // Get the width and heieght of a page
                        const widthFirstPage = firstPage.getWidth();
                        const heightFirstPage = firstPage.getHeight();

                        const widthSecondePage = secondePage.getWidth();
                        const heightSecondePage = secondePage.getHeight();

                        // **********************************************

                        const studentsFirstYear = eleve["1ere ANNEE"] ?? [];
                        const studentsSecondeYear = eleve["2e ANNEE"] ?? [];

                        const configText = {
                            size: 12,
                            color: rgb(0, 0, 0.5),
                        };

                        let moyenneMetierY = 169;
                        // ! Change year here
                        if (studentsSecondeYear.length && studentsSecondeYear !== undefined) {
                            const positionsLineGraphicStudent = [];
                            const positionsLineGraphicGroup = [];

                            // ! Change year here
                            await Promise.all(
                                studentsSecondeYear.map(async (secondYear, student_index) => {
                                    moyenneMetierY = moyenneMetierY - 18;
                                    const Coordonnes = [
                                        {
                                            text: secondYear.NOM_APPRENANT !== null ? secondYear.NOM_APPRENANT : "",
                                            position: {
                                                x: widthFirstPage / 2 - 40,
                                                y: heightFirstPage / 2 + 268,
                                                ...configText,
                                            },
                                        },

                                        {
                                            text:
                                                secondYear.PRENOM_APPRENANT !== null ? secondYear.PRENOM_APPRENANT : "",
                                            position: {
                                                x: widthFirstPage / 2 + 140,
                                                y: heightFirstPage / 2 + 268,
                                                ...configText,
                                            },
                                        },

                                        {
                                            text:
                                                secondYear.DATE_NAISSANCE_APPRENANT !== null
                                                    ? secondYear.DATE_NAISSANCE_APPRENANT
                                                    : "",

                                            position: {
                                                x: widthFirstPage / 2 - 118,
                                                y: heightFirstPage / 2 + 231,
                                                ...configText,
                                            },
                                        },

                                        {
                                            text:
                                                secondYear.CODE_APPRENANT !== null
                                                    ? "cd apprenant" + secondYear.CODE_APPRENANT
                                                    : "",
                                            position: {
                                                x: widthFirstPage / 2 - 20,
                                                y: heightFirstPage / 2 + 231,
                                                size: configText.size,
                                                // font: configText.font,
                                                color: configText.color,
                                            },
                                        },
                                    ];
                                    Coordonnes.map((coord, coord_index) => {
                                        // Print only one time
                                        if (student_index === 1) {
                                            firstPage.drawText(coord.text ?? "", coord.position);
                                        }
                                    });

                                    //First Year

                                    let firstSemesterFirstYear = {
                                        text:
                                            studentsFirstYear[student_index] == null
                                                ? ""
                                                : studentsFirstYear[student_index].MOYENNE_1,
                                        position: {
                                            x: 55,
                                            y: heightFirstPage / 2 + moyenneMetierY,
                                            ...configText,
                                        },
                                    };
                                    let secondSemesterFirstYear = {
                                        text:
                                            studentsFirstYear[student_index] == null
                                                ? ""
                                                : studentsFirstYear[student_index].MOYENNE_2,
                                        position: {
                                            x: 100,
                                            y: heightFirstPage / 2 + moyenneMetierY,
                                            ...configText,
                                        },
                                    };

                                    let averageSubjectFisrtYear = {
                                        text:
                                            studentsFirstYear[student_index] == null
                                                ? ""
                                                : studentsFirstYear[student_index].MOYENNE_MAT_GENERALE,
                                        position: {
                                            x: 155,
                                            y: heightFirstPage / 2 + moyenneMetierY,
                                            ...configText,
                                        },
                                    };

                                    firstPage.drawText(
                                        firstSemesterFirstYear.text ?? "",
                                        firstSemesterFirstYear.position
                                    );

                                    firstPage.drawText(
                                        secondSemesterFirstYear.text ?? "",
                                        secondSemesterFirstYear.position
                                    );

                                    firstPage.drawText(
                                        averageSubjectFisrtYear.text ?? "",
                                        averageSubjectFisrtYear.position
                                    );
                                    // Second year

                                    let firstSemesterSecondYear = {
                                        text:
                                            secondYear.MOYENNE_1 !== null && secondYear.MOYENNE_1 !== undefined
                                                ? secondYear.MOYENNE_1
                                                : "",
                                        position: {
                                            x: widthFirstPage / 2 - 43,
                                            y: heightFirstPage / 2 + moyenneMetierY,
                                            ...configText,
                                        },
                                    };

                                    let secondSemestreSecondYear = {
                                        text:
                                            secondYear.MOYENNE_2 !== null && secondYear.MOYENNE_2 !== undefined
                                                ? secondYear.MOYENNE_2
                                                : "",
                                        position: {
                                            x: widthFirstPage / 2,
                                            y: heightFirstPage / 2 + moyenneMetierY,
                                            ...configText,
                                        },
                                    };

                                    let averageSubjectSecondYear = {
                                        text:
                                            secondYear.MOYENNE_MAT_GENERALE === null
                                                ? ""
                                                : secondYear.MOYENNE_MAT_GENERALE,
                                        position: {
                                            x: widthFirstPage / 2 + 50,
                                            y: heightFirstPage / 2 + moyenneMetierY,
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
                                            x: widthFirstPage / 2 + 120,
                                            y: heightFirstPage / 2 + moyenneMetierY,
                                            ...configText,
                                        },
                                    };

                                    firstPage.drawText(firstSemesterSecondYear.text, firstSemesterSecondYear.position);
                                    firstPage.drawText(
                                        secondSemestreSecondYear.text,
                                        secondSemestreSecondYear.position
                                    );

                                    firstPage.drawText(
                                        averageSubjectSecondYear.text,
                                        averageSubjectSecondYear.position
                                    );

                                    firstPage.drawText(
                                        observationAnnuelleMatier.text,
                                        observationAnnuelleMatier.position
                                    );

                                    // ! Graphic
                                    // Moyenne d'un eleve
                                    let average = secondYear.MOYENNE_MAT_GENERALE;
                                    let moyenneGroupMatier = secondYear.MOYENNE_MAT_GRPE_ANNUELLE;

                                    const getDrawLineStudents = getCoordinateGraph(average, student_index);
                                    const getDrawLineGroup = getCoordinateGraph(moyenneGroupMatier, student_index);

                                    // positionsLineGraphicStudent.push(drawLine);
                                    positionsLineGraphicGroup.push(getDrawLineGroup);
                                    positionsLineGraphicStudent.push(getDrawLineStudents);

                                    // *******
                                    if (student_index + 1 === studentsSecondeYear.length) {
                                        //drawline group
                                        printGraphic(secondePage, positionsLineGraphicGroup);

                                        //drawline student
                                        printGraphic(secondePage, positionsLineGraphicStudent, rgb(0.75, 0.2, 0.2));
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

    // ********************************************
}

// * since we can't create private methods in Javascript, I'm creating this function outside the class WITHOUT EXPORTING IT

function getCoordinateGraph(average, studentIndex) {
    if (average !== null && average !== NaN) {
        average = average.replace(",", ".");
        average = parseFloat(average);
    }

    const drawLine = {
        start: {
            x: 132 + 56 + (studentIndex - 1) * 56.8,
            y: 102 + 17 * average,
        },
    };

    if (average === NaN || average === null) {
        drawLine.start.y = 0;
    }
    // else if (average === 0) {
    //     // drawLine.start.y = 85;
    // }

    return drawLine;
}

const printGraphic = (page, arrayPositons, colorLine = rgb(0, 0, 0)) => {
    arrayPositons.map((position, indexLinePosition) => {
        if (indexLinePosition + 1 !== arrayPositons.length) {
            // If there is no note
            if (position.start.y !== 0 && arrayPositons[indexLinePosition + 1].start.y !== 0) {
                page.drawLine({
                    start: {
                        x: position.start.x,
                        y: position.start.y,
                    },
                    end: {
                        x: arrayPositons[indexLinePosition + 1].start.x,
                        y: arrayPositons[indexLinePosition + 1].start.y,
                    },
                    thickness: 2,
                    color: colorLine,
                });

                // Draw the circle the very first note
                if (indexLinePosition === 0) {
                    page.drawCircle({
                        x: position.start.x,
                        y: position.start.y,
                        size: 3,
                        color: colorLine,
                    });
                }

                // Draw the circle for the other notes
                page.drawCircle({
                    x: arrayPositons[indexLinePosition + 1].start.x,
                    y: arrayPositons[indexLinePosition + 1].start.y,
                    size: 3,
                    color: colorLine,
                });
            }

            // Draw the circle when there is no note
            if (arrayPositons[indexLinePosition + 1].start.y !== 0) {
                if (indexLinePosition === 0) {
                    page.drawCircle({
                        x: position.start.x,
                        y: position.start.y,
                        size: 3,
                        color: colorLine,
                    });
                }

                page.drawCircle({
                    x: arrayPositons[indexLinePosition + 1].start.x,
                    y: arrayPositons[indexLinePosition + 1].start.y,
                    size: 3,
                    color: colorLine,
                });
            }
        }
    });
};
