import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { PDFDocument } from "pdf-lib";
import downloadjs from "downloadjs";
import {
	Box,
	NativeSelect,
	Typography,
	FormControl,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TextField,
} from "@mui/material";

import { BTS_NDRC } from "../class/BTS_NDRC";
import { BTS_MCO } from "../class/BTS_MCO";
import { BTS_GPME } from "../class/BTS_GPME";

import { useState } from "react";
import { useEffect } from "react";

const ResultStudent = () => {
	const students = useSelector((state) => state.students.value);
	const [display, setDisplay] = useState(true);
	const [trainingTitle, setTrainingTitle] = useState();

	const [studentPdf, setStudentPdf] = useState([]);
	const trainingTitleHere = students[0]["2e ANNEE"][0].NOM_FORMATION;
	const trainingAbrege = students[0]["2e ANNEE"][0].ABREGE_FORMATION;
	let pdfs = [];
	useEffect(async () => {
		switch (trainingAbrege) {
			case "BTS NDRC":
				setTrainingTitle(trainingTitleHere);
				const bts_ndrc = new BTS_NDRC();
				pdfs = await bts_ndrc.generatePdf(students);
				break;

			case "BTS GPME":
				setTrainingTitle(trainingTitleHere);
				const bts_gpme = new BTS_GPME();
				pdfs = await bts_gpme.generatePdf(students);
				break;

			case "BTS MCO":
				setTrainingTitle(trainingTitleHere);
				const bts_mco = new BTS_MCO();
				pdfs = await bts_mco.generatePdf(students);
				break;
		}

		setStudentPdf(pdfs);
	}, []);

	const clickHandler = async () => {
		console.log(studentPdf.length, students.length);
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

			downloadjs(docSave, `${trainingTitle}.pdf`);
		}
	};

	return (
		display && (
			<Box component="section" id="ResultStudent">
				<Typography variant="h1" color="initial">
					result
				</Typography>
				<Button onClick={clickHandler}>downloadPdf</Button>
			</Box>
		)
	);
};
export default ResultStudent;
