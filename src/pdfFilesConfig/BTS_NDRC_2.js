import { rgb } from "pdf-lib";

export function allPostion(value, width, height) {
    // console.log(value);

    // let MoyenneMetierSemestreUn = [];
    // let MoyenneMetierSemestreDeux = [];
    // let MoyenneMetierClass = [];
    // let pdf_Config_BTS_NDRC_2 = [];
    // let MoyenneMetier = [];

    const configText = {
        size: 13,
        // font: helveticaFont,
        color: rgb(0, 0, 0.5),
    };

    const Coordonnes = [
        {
            text: value["2e ANNEE"].NOM_APPRENANT ?? "",
            position: {
                x: width / 2 - 130,
                y: height / 2 + 228,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },

        {
            text: value["2e ANNEE"].PRENOM_APPRENANT ?? "",
            position: {
                x: width / 2 - 130,
                y: height / 2 + 195,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },

        {
            text: value["2e ANNEE"].DATE_NAISSANCE_APPRENANT ?? "",

            position: {
                x: width / 2 - 130,
                y: height / 2 + 163,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },

        {
            text: "à remplir",
            position: {
                x: width / 2 + 10,
                y: height / 2 + 163,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },
    ];

    let MoyenneMetier = [
        {
            text: value["1ere ANNEE"].MOYENNE_MAT_GENERALE ?? "",
            position: {
                x: width / 2 + 83,
                y: height / 2 + 101,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },

        {
            text: value["1ere ANNEE"].MOYENNE_MAT_GENERALE ?? "",
            position: {
                x: width / 2 + 83,
                y: height / 2 + 76,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },
        {
            text: value["1ere ANNEE"].MOYENNE_MAT_GENERALE ?? "",
            position: {
                x: width / 2 + 83,
                y: height / 2 + 51,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },
        {
            text: value["1ere ANNEE"].MOYENNE_MAT_GENERALE ?? "",
            position: {
                x: width / 2 + 83,
                y: height / 2 + 26,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },

        {
            text: value["1ere ANNEE"].MOYENNE_MAT_GENERALE ?? "",
            position: {
                x: width / 2 + 83,
                y: height / 2 + 1,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },

        {
            text: value["1ere ANNEE"].MOYENNE_MAT_GENERALE ?? "",
            position: {
                x: width / 2 + 83,
                y: height / 2 - 25,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },

        {
            text: value["1ere ANNEE"].MOYENNE_MAT_GENERALE ?? "",
            position: {
                x: width / 2 + 83,
                y: height / 2 - 51,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },
    ];

    let MoyenneMetierSemestreUn = [
        {
            text: value["1ere ANNEE"].MOYENNE_1 ?? "",
            position: {
                x: width / 2 + 29,
                y: height / 2 + 101,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },

        {
            text: value["1ere ANNEE"].MOYENNE_1 ?? "",
            position: {
                x: width / 2 + 29,
                y: height / 2 + 76,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },
        {
            text: value["1ere ANNEE"].MOYENNE_1 ?? "",
            position: {
                x: width / 2 + 29,
                y: height / 2 + 51,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },
        {
            text: value["1ere ANNEE"].MOYENNE_1 ?? "",
            position: {
                x: width / 2 + 29,
                y: height / 2 + 26,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },

        {
            text: value["1ere ANNEE"].MOYENNE_1 ?? "",
            position: {
                x: width / 2 + 29,
                y: height / 2 + 1,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },

        {
            text: value["1ere ANNEE"].MOYENNE_1 ?? "",
            position: {
                x: width / 2 + 29,
                y: height / 2 - 25,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },

        {
            text: value["1ere ANNEE"].MOYENNE_1 ?? "",
            position: {
                x: width / 2 + 29,
                y: height / 2 - 51,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },
    ];

    let MoyenneMetierSemestreDeux = [
        {
            text: value["2e ANNEE"].MOYENNE_2 ?? "",
            position: {
                x: width / 2 - 27,
                y: height / 2 + 101,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },

        {
            text: value["2e ANNEE"].MOYENNE_2 ?? "",
            position: {
                x: width / 2 - 27,
                y: height / 2 + 76,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },
        {
            text: value["2e ANNEE"].MOYENNE_2 ?? "",
            position: {
                x: width / 2 - 27,
                y: height / 2 + 51,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },
        {
            text: value["2e ANNEE"].MOYENNE_2 ?? "",
            position: {
                x: width / 2 - 27,
                y: height / 2 + 26,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },

        {
            text: value["2e ANNEE"].MOYENNE_2 ?? "",
            position: {
                x: width / 2 - 27,
                y: height / 2 + 1,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },

        {
            text: value["2e ANNEE"].MOYENNE_2 ?? "",
            position: {
                x: width / 2 - 27,
                y: height / 2 - 25,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },

        {
            text: value["2e ANNEE"].MOYENNE_2 ?? "",
            position: {
                x: width / 2 - 27,
                y: height / 2 - 51,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },
    ];

    let MoyenneMetierClass = [
        {
            text: value["1ere ANNEE"].MOYENNE_MAT_GENERALE ?? "",
            position: {
                x: 80,
                y: height / 2 + 101,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },

        {
            text: value["1ere ANNEE"].MOYENNE_MAT_GENERALE ?? "",
            position: {
                x: 80,
                y: height / 2 + 76,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },
        {
            text: value["1ere ANNEE"].MOYENNE_MAT_GENERALE ?? "",
            position: {
                x: 80,
                y: height / 2 + 51,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },
        {
            text: value["1ere ANNEE"].MOYENNE_MAT_GENERALE ?? "",
            position: {
                x: 80,
                y: height / 2 + 26,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },

        {
            text: value["1ere ANNEE"].MOYENNE_MAT_GENERALE ?? "",
            position: {
                x: 80,
                y: height / 2 + 1,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },

        {
            text: value["1ere ANNEE"].MOYENNE_MAT_GENERALE ?? "",
            position: {
                x: 80,
                y: height / 2 - 25,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },

        {
            text: value["1ere ANNEE"].MOYENNE_MAT_GENERALE ?? "",
            position: {
                x: 80,
                y: height / 2 - 51,
                size: configText.size,
                // font: configText.font,
                color: configText.color,
            },
        },
    ];

    // pdf_Config_BTS_NDRC_2 = [
    //     ...Coordonnes,
    //     ...MoyenneMetier,
    //     ...MoyenneMetierSemestreUn,
    //     ...MoyenneMetierSemestreDeux,
    //     ...MoyenneMetierClass,
    // ];

    // return pdf_Config_BTS_NDRC_2;
}
