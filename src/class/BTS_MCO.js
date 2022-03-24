import axios from "axios";
import { PDFDocument, rgb } from "pdf-lib";

export class BTS_MCO {
    constructor() {
        this.pdfURL = "http://localhost:3001/data/BTS_MCO.pdf";
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
                            // ! Change year here
                            await Promise.all(
                                studentsSecondeYear.map(async (secondYear, student_index) => {
                                    console.log(secondYear.MOYENNE_MAT_GENERALE);

                                    moyenneMetierY = moyenneMetierY - 25;
                                    const Coordonnes = [
                                        {
                                            text: secondYear.NOM_APPRENANT !== null ? secondYear.NOM_APPRENANT : "",
                                            position: {
                                                x: width / 2 - 40,
                                                y: height / 2 + 268,
                                                ...configText,
                                            },
                                        },

                                        {
                                            text:
                                                secondYear.PRENOM_APPRENANT !== null ? secondYear.PRENOM_APPRENANT : "",
                                            position: {
                                                x: width / 2 + 140,
                                                y: height / 2 + 268,
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
                                            x: width / 2 + 15,
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
                                            x: width / 2 - 40,
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

                                    const drawLineConfig = {
                                        thickness: 1,
                                        color: rgb(0.75, 0.2, 0.2),
                                        opacity: 0.75,
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

                                    // Moyenne d'un eleve
                                    secondePage.drawLine({
                                        start: { x: 80 + 40, y: 113 },
                                        end: { x: 80, y: 84.6 },
                                        ...drawLineConfig,
                                    });
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
