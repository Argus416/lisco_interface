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

	const recus = students.filter((student) => student.validate !== "0").length;
	const presnet = students.length;
	const thisYearYear = {
		recus: students.filter((student) => student.validate !== "0").length,
		presnetes: students.length,
		result: (students.filter((student) => student.validate !== "0").length / students.length) * 100,
	};

	console.log(thisYearYear);
	console.log(recus, presnet, "eee");
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

	const inputIsDisabled = (condition1, condition2 = 0) => {
		if (condition1 === condition2) {
			return { disabled: true };
		}
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
									<TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
										<TableCell sx={{ display: "none" }}>
											<input type="hidden" name={todayYear - i - 1} />
										</TableCell>
										<TableCell>{todayYear - i - 1}</TableCell>
										<TableCell>
											<TextField
												name={"presente" + i}
												type="number"
												placeholder="25"
												variant="filled"
												{...inputIsDisabled(i)}
												value={i == 0 ? thisYearYear.presnetes : ""}
												// {...(i == 0 ? { disabled: true } : "")}
											/>
										</TableCell>
										<TableCell>
											<TextField
												name={"recus" + i}
												type="number"
												placeholder="25"
												variant="filled"
												{...inputIsDisabled(i)}
												value={i == 0 ? thisYearYear.recus : ""}
											/>
										</TableCell>
										<TableCell>{i == 0 ? thisYearYear.result + "%" : "0%"}</TableCell>
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
