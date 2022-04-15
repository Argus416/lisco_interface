import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { updateStudents } from "../features/students";
import { useState } from "react";
import { calcResultLastYears } from "../Helpers/helpers";
function createData(id, fullName, studentCode) {
	return { id, fullName, studentCode };
}

const ResultStudent = () => {
	const dispatch = useDispatch();
	const students = useSelector((state) => state.students.value);
	const [display, setDisplay] = useState(true);

	let copiedStudents = JSON.parse(JSON.stringify(students));
	let todayYear = new Date();
	todayYear = todayYear.getFullYear();
	let years = 0;
	const trainingName = students[0]["2e ANNEE"][0].ABREGE_FORMATION;
	console.log(students);
	switch (trainingName) {
		case "BTS NDRC":
			years = 3;
			break;

		case "BTS GPME":
			years = 3;
			break;

		case "BTS MCO":
			years = 5;
			break;
	}
	const submitHandler = (e) => {
		// Taux de réussite brut = (Bacheliers x 100) / Présents
		e.preventDefault();
		let results = [];
		for (let i = 0; i < years; i++) {
			results.push({
				presentes: e.target[`presente${i}`].value,
				recus: e.target[`recus${i}`].value,
			});
		}

		copiedStudents[0] = { ...copiedStudents[0], yearResult: { ...results } };
		dispatch(updateStudents(copiedStudents));
		console.log(students);
		// setDisplay(false);
		// nextStep();
	};

	return (
		display && (
			<Box component="section" id="ResultStudent">
				<Typography variant="h1" color="initial">
					result
				</Typography>
			</Box>
		)
	);
};
export default ResultStudent;
