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

//Redux
import { useDispatch, useSelector } from "react-redux";
import { updateStudents } from "../features/students";

const UploadContainer = ({ nextStep }) => {
	// TODO : Add chart line
	// https://devexpress.github.io/devextreme-reactive/react/chart/demos/line/line/

	const apiUrl = process.env.REACT_APP_API_URL;

	const [fileUploaded, setFileUploaded] = useState(false);
	const [progressConversion, setProgressConversion] = useState(false);
	const [fileIsUploaded, setFileIsUploaded] = useState(false);
	const [students, setStudents] = useState();
	const [studentPdf, setStudentPdf] = useState([]);
	const [traniningTitle, setTraniningTitle] = useState();
	const [isNotTraining, setIsNotTraining] = useState(false);
	const [display, setDisplay] = useState(true);

	const dispatch = useDispatch();

	const changeHandler = (e) => {
		if (e.target.value) {
			document.querySelector(".csv-file").classList.add("hidden");

			setFileUploaded(true);
			setFileIsUploaded(true);
			setStudents();
			setTimeout(() => {
				setFileUploaded(false);
				setIsNotTraining(false);
			}, 3000);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		const uploadedFile = document.querySelector(".csv-file");
		if (uploadedFile.files.length) {
			setTraniningTitle("");
			setFileIsUploaded(false);
			setIsNotTraining(false);
			const reader = new FileReader();
			const csvFile = uploadedFile.files[0];
			//read csv file
			reader.readAsText(csvFile);

			const url = `${apiUrl}/csv/analyse`;
			setProgressConversion(true);
			reader.onload = async function (event) {
				const text = event.target.result;
				axios
					.post(url, { csvFile: text })
					.then(async (resultStudents) => {
						if (typeof resultStudents.data.result === "object" && resultStudents.data.status === 200) {
							const { result, trainingAbrege } = resultStudents.data;
							// update students globale state
							dispatch(updateStudents(result));
							nextStep();
							setDisplay(false);
						} else {
							setIsNotTraining(true);
							setProgressConversion(false);
							setStudents([]);
						}
					})
					.catch((err) => console.error(err));
			};
		} else {
			setFileIsUploaded(true);
		}
	};

	return (
		display && (
			<Box>
				{fileUploaded && (
					<Alert
						className="alert"
						sx={{
							marginBottom: 1,
						}}
						onClose={() => {
							setFileUploaded(false);
						}}
					>
						Le fichier a été uploadé
					</Alert>
				)}

				{isNotTraining && (
					<Alert
						severity="error"
						onClose={() => {
							setIsNotTraining(false);
						}}
					>
						Formation non reconnue
					</Alert>
				)}
				<Box className="titles">
					<Typography component="h2" variant="h4" className="box-text-desc">
						Choisissez votre fichier csv
					</Typography>
				</Box>

				{progressConversion && (
					<Box sx={{ marginTop: "20px " }}>
						<Typography variant="p">Traitement des informations...</Typography>
						<LinearWithValueLabel />
					</Box>
				)}

				<form onSubmit={submitHandler} className="form-upload">
					<Box component="section" className="droparea">
						<Box className="content">
							<FontAwesomeIcon icon={faFileArrowUp} size="5x" />
							<input onChange={changeHandler} className="form-control csv-file" name="csvFile" accept=".csv" type="file" />
						</Box>
					</Box>
					{fileIsUploaded && (
						<Box className="btn-container">
							<Button variant="contained" className="btn-upload-file secondary-btn" type="submit">
								Suivant
							</Button>
						</Box>
					)}
				</form>
			</Box>
		)
	);
};

export default UploadContainer;
