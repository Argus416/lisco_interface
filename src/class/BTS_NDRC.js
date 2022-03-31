import axios from "axios";
import { PDFDocument, grayscale, rgb } from "pdf-lib";
import { getObservation, insertIntoArray } from "../Helpers/helpers";

export class BTS_NDRC {
    constructor() {
        const apiUrl = process.env.REACT_APP_API_URL;

        this.pdfURL = `${apiUrl}/data/BTS_NDRC.pdf`;
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
                            size: 10,
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
                                            text: "Anglais",
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
                                            // Print only one time
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
                                        text: getObservation(secondYear.OBSERVATION_ANNUELLE_MATIERE),
                                        position: {
                                            x: width / 2 + 120,
                                            y: height / 2 + moyenneMetierY + 3,
                                            size: 9,
                                            color: rgb(0, 0, 0.5),
                                            lineHeight: 12,
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
                                    let moyenne = secondYear.MOYENNE_MAT_GENERALE;
                                    let moyenneGroupMatier = secondYear.MOYENNE_MAT_GRPE_ANNUELLE;

                                    const getDrawLineStudents = getCoordinateGraph(moyenne, student_index);
                                    const getDrawLineGroup = getCoordinateGraph(moyenneGroupMatier, student_index);

                                    // positionsLineGraphicStudent.push(drawLine);
                                    positionsLineGraphicGroup.push(getDrawLineGroup);
                                    positionsLineGraphicStudent.push(getDrawLineStudents);
                                    // *******
                                    if (student_index + 1 === studentsSecondeYear.length) {
                                        //drawline group
                                        printGraphic(
                                            secondePage,
                                            positionsLineGraphicGroup,
                                            student_index,
                                            studentsSecondeYear
                                        );

                                        //drawline student
                                        printGraphic(
                                            secondePage,
                                            positionsLineGraphicStudent,
                                            student_index,
                                            studentsSecondeYear,
                                            rgb(0.75, 0.2, 0.2)
                                        );
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

function getCoordinateGraph(moyenne, studentIndex) {
    if (moyenne !== null && moyenne !== NaN) {
        moyenne = moyenne.replace(",", ".");
        moyenne = parseFloat(moyenne);
    }

    const drawLine = {
        start: {
            x: 120 + 80 + (studentIndex - 1) * 79.5,
            y: 85 + 14.2 * moyenne,
        },
    };

    if (moyenne === 20) {
        console.log("moyenne 20 start x", drawLine.start.x);
        console.log("moyenne 20 start y", drawLine.start.y);
    }

    if (moyenne === NaN || moyenne === null) {
        drawLine.start.y = 0;
    }
    // else if (moyenne === 0) {
    //     // drawLine.start.y = 85;
    // }

    return drawLine;
}

const printGraphic = (page, arrayPositons, studentIndex, studentsSecondeYear, colorLine = rgb(0, 0, 0)) => {
    if (studentIndex + 1 === studentsSecondeYear.length) {
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
    }
};
