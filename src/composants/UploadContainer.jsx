import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faFileArrowUp, faLariSign } from "@fortawesome/free-solid-svg-icons";
import { Alert, Button, Container, Typography } from "@mui/material";
import AccordionCus from "./AccordionCus";
import LinearWithValueLabel from "./LinearWithValueLabel";
import { Box } from "@mui/system";
import { PDFDocument } from "pdf-lib";
import downloadjs from "downloadjs";
import { BTS_NDRC } from "../class/BTS_NDRC";
import { BTS_MCO } from "../class/BTS_MCO";
import { BTS_GPME } from "../class/BTS_GPME";

const UploadContainer = () => {
    // TODO : Add chart line
    // https://devexpress.github.io/devextreme-reactive/react/chart/demos/line/line/

    const apiUrl = process.env.REACT_APP_API_URL;

    const [fileUploaded, setFileUploaded] = useState(false);
    const [fileIsUploaded, setFileIsUploaded] = useState(false);
    const [progressConversion, setProgressConversion] = useState(false);
    const [students, setStudents] = useState();
    const [studentPdf, setStudentPdf] = useState([]);
    const [traniningTitle, setTraniningTitle] = useState();
    const [pdfPreview, setPdfPreview] = useState("");
    const [isNotTraining, setIsNotTraining] = useState(false);

    const onChange = (e) => {
        if (e.target.value) {
            setFileUploaded(true);
            setStudents();
            setTimeout(() => {
                setFileUploaded(false);
            }, 3000);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const uploadedFile = document.querySelector(".csv-file");
        if (uploadedFile.files.length) {
            setFileIsUploaded(false);
            setIsNotTraining(false);
            const reader = new FileReader();
            const csvFile = uploadedFile.files[0];
            //read csv file
            reader.readAsText(csvFile);

            const url = `${apiUrl}/csv/analyse`;
            reader.onload = async function (event) {
                const text = event.target.result;
                axios
                    .post(url, { csvFile: text })
                    .then(async (resultStudents) => {
                        console.log(resultStudents.data);
                        if (typeof resultStudents.data === Array) {
                            setProgressConversion(true);
                            const trainingAbreg = resultStudents.data[0]["2e ANNEE"][0].ABREGE_FORMATION;
                            const trainingTitleHere = resultStudents.data[0]["2e ANNEE"][0].NOM_FORMATION;
                            let pdfs = [];
                            switch (trainingAbreg) {
                                case "BTS NDRC":
                                    setTraniningTitle(trainingTitleHere);
                                    setStudents(resultStudents.data);
                                    const bts_ndrc = new BTS_NDRC();
                                    pdfs = await bts_ndrc.generatePdf(resultStudents.data);
                                    break;

                                case "BTS GPME":
                                    setTraniningTitle(trainingTitleHere);
                                    setStudents(resultStudents.data);
                                    const bts_gpme = new BTS_GPME();
                                    pdfs = await bts_gpme.generatePdf(resultStudents.data);
                                    break;

                                case "BTS MCO":
                                    setTraniningTitle(trainingTitleHere);
                                    setStudents(resultStudents.data);
                                    const bts_mco = new BTS_MCO();
                                    pdfs = await bts_mco.generatePdf(resultStudents.data);
                                    break;
                            }
                            if (pdfs.length) {
                                setProgressConversion(false);
                                setStudentPdf(pdfs);

                                // TO DELETE
                                const pdfPreviewBlob = URL.createObjectURL(
                                    new Blob([pdfs[1]], { type: "application/pdf" })
                                );
                                setPdfPreview(pdfPreviewBlob);
                            }
                        } else {
                            setIsNotTraining(true);
                        }
                    })
                    .catch((err) => console.error(err));
            };
        } else {
            setFileIsUploaded(true);
        }
    };

    const downloadAll = async () => {
        if (studentPdf.length === students.length) {
            const doc = await PDFDocument.create();

            await Promise.all(
                studentPdf.map(async (pageBuffer) => {
                    const loadPage = await PDFDocument.load(pageBuffer);
                    const contentPages = await doc.copyPages(loadPage, loadPage.getPageIndices());
                    contentPages.map(async (page) => {
                        doc.addPage(page);
                    });
                })
            );

            const docSave = await doc.save();
            downloadjs(docSave, "gg.pdf");
        }
    };

    return (
        <Container variant="main">
            <Typography className="title" component="h1" variant="h3">
                Convertissez le fichier CSV
            </Typography>
            <Typography className="smallTitle" component="h2" variant="h5">
                CSV à PDF
            </Typography>
            {fileUploaded && (
                <Alert
                    className="alert"
                    onClose={() => {
                        setFileUploaded(false);
                    }}
                >
                    Le fichier a été uploader
                </Alert>
            )}

            {isNotTraining && (
                <Alert
                    severity="error"
                    onClose={() => {
                        setFileUploaded(false);
                    }}
                >
                    Formation non connu
                </Alert>
            )}

            <Box component="section" className="droparea">
                <Box className="content">
                    <FontAwesomeIcon icon={faFileArrowUp} size="5x" />
                    <Typography component="p" className="box-text-desc">
                        Jetez les élèyves dans la boîte :3
                    </Typography>
                    <form onSubmit={submitHandler} className="form-upload">
                        <input
                            onChange={onChange}
                            className="form-control csv-file"
                            name="csvFile"
                            accept=".csv"
                            type="file"
                        />
                        <Button variant="contained" className=" btn-upload-file" type="submit">
                            Convertir
                        </Button>
                    </form>

                    {/* <iframe src={pdfPreview} width="700" height="700" frameborder="0"></iframe> */}
                    {fileIsUploaded && (
                        <Typography component="p" className="error-file-upload">
                            Veuillez uploader un fichier
                        </Typography>
                    )}
                </Box>
            </Box>

            {progressConversion && (
                <Box sx={{ marginTop: "20px " }}>
                    <Typography variant="p">Convertir en pdf...</Typography>
                    <LinearWithValueLabel />
                </Box>
            )}
            {students && (
                <>
                    {!progressConversion && (
                        <section className="uploaded-files">
                            <Box component="header" className="header">
                                <Typography
                                    sx={{ marginBottom: "20px", marginTop: "40px", textAlign: "center" }}
                                    variant="h4"
                                    component="h3"
                                >
                                    {traniningTitle}
                                </Typography>
                                <Button
                                    onClick={downloadAll}
                                    className="downloadAll"
                                    color="warning"
                                    variant="contained"
                                >
                                    Télécharger tout
                                </Button>
                            </Box>

                            {students.map((student, index) => (
                                <AccordionCus key={index} student={student} index={index} pdf={studentPdf} />
                            ))}
                        </section>
                    )}
                </>
            )}
        </Container>
    );
};

export default UploadContainer;
