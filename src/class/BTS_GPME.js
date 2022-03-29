import { borderColor } from "@mui/system";
import axios from "axios";
import { grayscale, PDFDocument, rgb } from "pdf-lib";

export class BTS_GPME {
    constructor() {
        const apiUrl = process.env.REACT_APP_API_URL;
        this.pdfURL = `${apiUrl}/data/BTS_GPME.pdf`;
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
            await Promise.all(
                students.map(async (eleve, index) => {
                    // Load an existing PDFDocument
                    const pdfDoc = await PDFDocument.load(pdf);

                    // Get the first page of the document
                    const firstPage = pdfDoc.getPage(0);
                    const secondePage = pdfDoc.getPage(1);

                    // Get the width and height of the first page
                    const { width, height } = firstPage.getSize();
                    const { widthSecondPage, heightSecondPage } = secondePage.getSize();

                    // **********************************************

                    const studentsFirstYear = eleve["1ere ANNEE"] ?? [];
                    const studentsSecondeYear = eleve["2e ANNEE"] ?? [];

                    const configText = {
                        size: 12,
                        color: rgb(0, 0, 0.5),
                    };

                    let moyenneMetierYFirstYear = height / 2 + 275;
                    let moyenneMetierYSecondYear = height / 2 + 50;

                    // ! Change year here
                    if (studentsSecondeYear.length && studentsSecondeYear !== undefined) {
                        let studentIndex = 0;
                        let studentIndex2 = 8;

                        const positionsLineGraphicStudentCommuns = [];
                        const positionsLineGraphicGroupCommuns = [];
                        const positionsLineGraphicSubjectsSecondYearStudents = [];
                        const positionsLineGraphicSubjectsSecondYearGroup = [];

                        let differnceY = 25;

                        let differnceYFirstYearYear = differnceY;
                        let differnceYSecondYear = differnceY;

                        // ! Change year here
                        await Promise.all(
                            studentsSecondeYear.map(async (secondYear, student_index) => {
                                if (student_index < 2) {
                                    //First year
                                    differnceYFirstYearYear = differnceYFirstYearYear - 1;

                                    //Second year
                                    differnceYSecondYear = differnceYSecondYear - 0.4;
                                    moyenneMetierYSecondYear = moyenneMetierYSecondYear - differnceYSecondYear;
                                } else {
                                    //First year
                                    differnceYFirstYearYear = differnceYFirstYearYear;

                                    //Second year
                                    moyenneMetierYSecondYear = moyenneMetierYSecondYear - differnceYSecondYear + 0.6;
                                    differnceYSecondYear = differnceYSecondYear - 0.1;
                                }

                                moyenneMetierYFirstYear = moyenneMetierYFirstYear - differnceYFirstYearYear;

                                const Coordonnes = [
                                    {
                                        text: secondYear.NOM_APPRENANT !== null ? secondYear.NOM_APPRENANT : "",
                                        position: {
                                            x: width / 2 - 15,
                                            y: height / 2 + 353,
                                            ...configText,
                                        },
                                    },

                                    {
                                        text: secondYear.PRENOM_APPRENANT !== null ? secondYear.PRENOM_APPRENANT : "",
                                        position: {
                                            x: width / 2 - 80,
                                            y: height / 2 + 330,
                                            ...configText,
                                        },
                                    },

                                    {
                                        text:
                                            secondYear.DATE_NAISSANCE_APPRENANT !== null
                                                ? secondYear.DATE_NAISSANCE_APPRENANT
                                                : "",

                                        position: {
                                            x: width / 2 - 116,
                                            y: height / 2 + 297,
                                            ...configText,
                                        },
                                    },

                                    {
                                        text:
                                            secondYear.CODE_APPRENANT !== null
                                                ? "code apprenant " + secondYear.CODE_APPRENANT
                                                : "",
                                        position: {
                                            x: width / 2 - 30,
                                            y: height / 2 + 297,
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

                                // First year **************************

                                let MoyenneMetierPremiereAnnee = {};
                                let semestreUnPremiereAnnee = {};
                                let semestreDeuxPremiereAnnee = {};

                                // Because the subjects of the first year are less than the second year
                                if (studentsFirstYear[student_index] !== undefined) {
                                    MoyenneMetierPremiereAnnee = {
                                        text: studentsFirstYear[student_index].MOYENNE_MAT_GENERALE,
                                        position: {
                                            x: width / 2 - 8,
                                            y: moyenneMetierYFirstYear,
                                            ...configText,
                                        },
                                    };

                                    semestreUnPremiereAnnee = {
                                        text: studentsFirstYear[student_index].MOYENNE_1,
                                        position: {
                                            x: width / 2 - 102,
                                            y: moyenneMetierYFirstYear,
                                            ...configText,
                                        },
                                    };

                                    semestreDeuxPremiereAnnee = {
                                        text: studentsFirstYear[student_index].MOYENNE_2,
                                        position: {
                                            x: width / 2 - 58,
                                            y: moyenneMetierYFirstYear,
                                            ...configText,
                                        },
                                    };
                                }

                                // Second year **************************
                                let MoyenneMetierDeuxiemeAnnee = {
                                    text:
                                        secondYear.MOYENNE_MAT_GENERALE === null ? "" : secondYear.MOYENNE_MAT_GENERALE,
                                    position: {
                                        x: width / 2 - 8,
                                        y: moyenneMetierYSecondYear,
                                        ...configText,
                                    },
                                };

                                let semestreUnDeuxiemeAnnee = {
                                    text:
                                        secondYear.MOYENNE_1 !== null && secondYear.MOYENNE_1 !== undefined
                                            ? secondYear.MOYENNE_1
                                            : "",
                                    position: {
                                        x: width / 2 - 102,
                                        y: moyenneMetierYSecondYear,
                                        ...configText,
                                    },
                                };

                                let semestreDeuxDeuxiemeAnnee = {
                                    text:
                                        secondYear.MOYENNE_2 !== null && secondYear.MOYENNE_2 !== undefined
                                            ? secondYear.MOYENNE_2
                                            : "",
                                    position: {
                                        x: width / 2 - 58,
                                        y: moyenneMetierYSecondYear,
                                        ...configText,
                                    },
                                };

                                // let observationAnnuelleMatier = {
                                //     text:
                                //         secondYear.OBSERVATION_ANNUELLE_MATIERE !== null &&
                                //         secondYear.OBSERVATION_ANNUELLE_MATIERE !== undefined
                                //             ? secondYear.OBSERVATION_ANNUELLE_MATIERE
                                //             : "",
                                //     position: {
                                //         x: width / 2 + 70,
                                //         y: moyenneMetierYSecondYear,
                                //         ...configText,
                                //     },
                                // };

                                if (studentsFirstYear[student_index] !== undefined) {
                                    if (
                                        studentsFirstYear[student_index].MOYENNE_MAT_GENERALE !== null &&
                                        studentsFirstYear[student_index].MOYENNE_MAT_GENERALE !== Boolean &&
                                        studentsFirstYear[student_index].MOYENNE_MAT_GENERALE !== undefined
                                    ) {
                                        if (studentsFirstYear[student_index].ABREGE_MATIERE === "ATELIER PRO") {
                                            // let coief = 0;
                                            let yPosition = height / 2 + 95;

                                            drawCirelAtelierPro(
                                                studentsFirstYear[student_index].MOYENNE_MAT_GENERALE,
                                                yPosition,
                                                firstPage,
                                                width
                                            );
                                        } else {
                                            firstPage.drawText(
                                                MoyenneMetierPremiereAnnee.text,
                                                MoyenneMetierPremiereAnnee.position
                                            );

                                            firstPage.drawText(
                                                semestreUnPremiereAnnee.text,
                                                semestreUnPremiereAnnee.position
                                            );
                                            firstPage.drawText(
                                                semestreDeuxPremiereAnnee.text,
                                                semestreDeuxPremiereAnnee.position
                                            );
                                        }
                                    }
                                }
                                if (secondYear.ABREGE_MATIERE === "ATELIER PRO") {
                                    let yPosition2 = height / 2 - 180;
                                    drawCirelAtelierPro(secondYear.MOYENNE_MAT_GENERALE, yPosition2, firstPage, width);
                                } else {
                                    firstPage.drawText(semestreUnDeuxiemeAnnee.text, semestreUnDeuxiemeAnnee.position);
                                    firstPage.drawText(
                                        semestreDeuxDeuxiemeAnnee.text,
                                        semestreDeuxDeuxiemeAnnee.position
                                    );

                                    firstPage.drawText(
                                        MoyenneMetierDeuxiemeAnnee.text,
                                        MoyenneMetierDeuxiemeAnnee.position
                                    );
                                }

                                // firstPage.drawText(observationAnnuelleMatier.text, observationAnnuelleMatier.position);

                                // ! Graphic

                                // Moyenne d'un eleve
                                let moyenne = secondYear.MOYENNE_MAT_GENERALE;
                                let moyenneGroupMatier = secondYear.MOYENNE_MAT_GRPE_ANNUELLE;

                                // positionsLineGraphicStudentCommuns.push(drawLine);
                                // *******
                                if (secondYear.ABREGE_MATIERE !== "U51" && secondYear.ABREGE_MATIERE !== "U52") {
                                    const getDrawLineStudents = getCoordinateGraph(
                                        moyenne,
                                        studentIndex,
                                        secondYear.ABREGE_MATIERE
                                    );
                                    const getDrawLineGroup = getCoordinateGraph(
                                        moyenneGroupMatier,
                                        studentIndex,
                                        secondYear.ABREGE_MATIERE
                                    );

                                    positionsLineGraphicGroupCommuns.push(getDrawLineGroup);
                                    positionsLineGraphicStudentCommuns.push(getDrawLineStudents);
                                    if (student_index + 1 === studentsSecondeYear.length) {
                                        calculateAverage(studentsFirstYear, studentsSecondeYear);
                                        //drawline group
                                        printGraphic(
                                            secondePage,
                                            positionsLineGraphicGroupCommuns,
                                            studentIndex,
                                            studentsSecondeYear
                                        );

                                        //drawline student
                                        printGraphic(
                                            secondePage,
                                            positionsLineGraphicStudentCommuns,
                                            studentIndex,
                                            studentsSecondeYear,
                                            rgb(0.75, 0.2, 0.2)
                                        );
                                    }
                                    studentIndex++;
                                } else {
                                    // Enseignements de 2ème année

                                    const getDrawLineGroup2 = getCoordinateGraph(
                                        moyenneGroupMatier,
                                        studentIndex2,
                                        secondYear.ABREGE_MATIERE
                                    );

                                    const getDrawLineStudents2 = getCoordinateGraph(
                                        moyenne,
                                        studentIndex2,
                                        secondYear.ABREGE_MATIERE
                                    );

                                    positionsLineGraphicSubjectsSecondYearGroup.push(getDrawLineGroup2);
                                    positionsLineGraphicSubjectsSecondYearStudents.push(getDrawLineStudents2);

                                    studentIndex2++;
                                }

                                // Print graphic subjects second year
                                if (positionsLineGraphicGroupCommuns.length === 8) {
                                    if (positionsLineGraphicSubjectsSecondYearStudents.length === 2) {
                                        if (positionsLineGraphicStudentCommuns[7].start.y !== 0) {
                                            //drawline student
                                            secondePage.drawLine({
                                                start: {
                                                    x: positionsLineGraphicStudentCommuns[7].start.x,
                                                    y: positionsLineGraphicStudentCommuns[7].start.y,
                                                },
                                                end: {
                                                    x: positionsLineGraphicSubjectsSecondYearStudents[0].start.x,
                                                    y: positionsLineGraphicSubjectsSecondYearStudents[0].start.y,
                                                },
                                                thickness: 2,
                                                color: rgb(0.75, 0.2, 0.2),
                                            });

                                            //drawline student
                                            printGraphic(
                                                secondePage,
                                                positionsLineGraphicSubjectsSecondYearStudents,
                                                0,
                                                studentsSecondeYear,
                                                rgb(0.75, 0.2, 0.2)
                                            );
                                        }

                                        if (positionsLineGraphicGroupCommuns[7].start.y !== 0) {
                                            //drawline group
                                            secondePage.drawLine({
                                                start: {
                                                    x: positionsLineGraphicGroupCommuns[7].start.x,
                                                    y: positionsLineGraphicGroupCommuns[7].start.y,
                                                },
                                                end: {
                                                    x: positionsLineGraphicSubjectsSecondYearGroup[0].start.x,
                                                    y: positionsLineGraphicSubjectsSecondYearGroup[0].start.y,
                                                },
                                                thickness: 2,
                                            });

                                            //drawline group
                                            printGraphic(
                                                secondePage,
                                                positionsLineGraphicSubjectsSecondYearGroup,
                                                0,
                                                studentsSecondeYear
                                            );
                                        }
                                    }
                                }

                                // ! *********************************************************
                            })
                        );
                    }

                    let pdfStudent = await pdfDoc.save();
                    allStudentPdf.push(pdfStudent);
                })
            );
        } else {
            console.error("No students have been found");
        }

        return allStudentPdf;
    }

    // ********************************************
}

// * since we can't create private methods in Javascript, I'm creating this function outside the class WITHOUT EXPORTING IT

const drawCirelAtelierPro = (moyenne_mat_generale, yPosition, page, widthPage) => {
    let coeif = 0;
    if (moyenne_mat_generale !== null && moyenne_mat_generale !== undefined && moyenne_mat_generale !== "") {
        moyenne_mat_generale = moyenne_mat_generale.replace(",", ".");
        moyenne_mat_generale = parseFloat(moyenne_mat_generale);

        for (let i = 1; i <= 4; i++) {
            if (moyenne_mat_generale <= 5 * i) {
                coeif = 11 * i;
                if (5 * i === 20) {
                    coeif = 10.5 * i;
                }
                break;
            }
        }

        page.drawCircle({
            x: widthPage / 2 - 114 + coeif,
            y: yPosition,
            size: 6,
            borderWidth: 2,
            borderColor: rgb(0, 0, 0.5),
        });
    }
};

const calculateAverage = (averageFirstYear, averageSecondeYear) => {
    const result = [];
    averageSecondeYear = averageSecondeYear.filter((subject) => {
        if (subject.ABREGE_MATIERE !== "U51" && subject.ABREGE_MATIERE !== "U52") {
            return subject;
        }
    });

    if (averageFirstYear.length !== 0 && averageSecondeYear.length !== 0) {
        for (let i = 0; i < averageFirstYear.length; i++) {
            const firstYear = toNumber(averageFirstYear[i].MOYENNE_MAT_GENERALE);
            const secondYear = toNumber(averageSecondeYear[i].MOYENNE_MAT_GENERALE);
            const resultAverage = numberExistThenCalculate(firstYear, secondYear);
            result.push(resultAverage);
        }
    }

    console.log({ result: result, first: averageFirstYear, second: averageSecondeYear });

    return result;
};

function getCoordinateGraph(moyenne, studentIndex, subjectAbrege = "") {
    if (moyenne !== null && moyenne !== NaN) {
        moyenne = moyenne.replace(",", ".");
        moyenne = parseFloat(moyenne);
    }

    //Conditions
    let xDifference = 52.6;
    let yDifference = 14.2;

    switch (subjectAbrege) {
        case "GRCF & GRCF EBP":
            xDifference = 51.6;
            break;

        case "U51":
            xDifference = 53.2;
            break;

        case "U52":
            xDifference = 53.4;
            break;
    }

    const drawLine = {
        start: {
            x: 167 + xDifference + (studentIndex - 1) * xDifference,
            y: 82 + yDifference * moyenne,
        },
    };

    if (moyenne === NaN || moyenne === null) {
        drawLine.start.y = 0;
    }

    return drawLine;
}

const printGraphic = (page, arrayPositons, studentIndex, studentsSecondeYear, colorLine = rgb(0, 0, 0)) => {
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

const numberExistThenCalculate = (checkNumber_1, checkNumber_2) => {
    const valuesToCheck = [checkNumber_1, checkNumber_2];
    let number = "";
    let i = 0;

    for (let j = 0; j < valuesToCheck.length; j++) {
        if (valuesToCheck[j] !== null && valuesToCheck[j] !== undefined) {
            valuesToCheck[j] = valuesToCheck[j];
            i++;
        } else {
            valuesToCheck[j] = 0;
        }
    }

    if (i > 0) {
        number = (checkNumber_1 + checkNumber_2) / i;
    } else {
        number = "";
    }

    return number;
};

const toNumber = (number) => {
    if (number !== null && number !== NaN) {
        number = number.replace(",", ".");
        number = parseFloat(number);
    }

    return number;
};
