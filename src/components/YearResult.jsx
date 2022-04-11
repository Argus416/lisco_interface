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
function createData(id, fullName, studentCode) {
	return { id, fullName, studentCode };
}

const YearResult = ({ nextStep }) => {
	const dispatch = useDispatch();
	const students = useSelector((state) => state.students.value);
	const [display, setDisplay] = useState(true);
	let copiedStudents = JSON.parse(JSON.stringify(students));
	let todayYear = new Date();
	todayYear = todayYear.getFullYear();
	let years = 0;
	const trainingName = students[0]["2e ANNEE"][0].ABREGE_FORMATION;
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
		e.preventDefault();

		if (copiedStudents.length) {
			for (let i = 0; i < students.length; i++) {
				copiedStudents[i].validate = e.target[i + 1].value;
			}
		}

		dispatch(updateStudents(copiedStudents));
		// setDisplay(false);
		// nextStep();
	};

	return (
		display && (
			<Box component="section" id="StudentsValidation">
				<Typography variant="h4" className="title">
					Résultats des dernières années (facultatif)
				</Typography>

				<form onSubmit={submitHandler} className="form-student-validation">
					<Box className="btn-container">
						<Button type="submit" className="secondary-btn">
							Suivant
						</Button>
					</Box>

					<TableContainer component={Paper}>
						<Table size="small" aria-label="a dense table">
							<TableHead>
								<TableRow>
									<TableCell>Année</TableCell>
									<TableCell>Présentés</TableCell>
									<TableCell>Reçus</TableCell>
									<TableCell>%</TableCell>
									{/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
								</TableRow>
							</TableHead>
							<TableBody>
								{[...Array(years)].map((e, i) => (
									<TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
										<TableCell>{todayYear - i - 1}</TableCell>
										<TableCell>
											<TextField type="number" id="filled-basic" label="Filled" variant="filled" />
										</TableCell>
										<TableCell>
											<TextField type="number" id="filled-basic" label="Filled" variant="filled" />
										</TableCell>
										<TableCell>30%</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</form>
			</Box>
		)
	);
};
export default YearResult;
