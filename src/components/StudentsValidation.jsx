import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, NativeSelect, Typography, FormControl, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { updateStudents } from "../features/students";
import { useState } from "react";
function createData(id, fullName, studentCode) {
	return { id, fullName, studentCode };
}

const StudentsValidation = ({ nextStep }) => {
	const dispatch = useDispatch();
	const students = useSelector((state) => state.students.value);
	const [display, setDisplay] = useState(true);
	let copiedStudents = JSON.parse(JSON.stringify(students));
	const rows = [];
	let rowsId = 0;

	students.map((year) => {
		rowsId++;
		//  ,prenom, code_appreant
		const fullName = year["2e ANNEE"][0].NOM_APPRENANT + " " + year["2e ANNEE"][0].PRENOM_APPRENANT;
		const studentCode = year["2e ANNEE"][0].CODE_APPRENANT;

		rows.push(createData(rowsId, fullName, studentCode));
	});

	const submitHandler = (e) => {
		e.preventDefault();
		let juryDecision = { none: 0, tf: 0, f: 0, dfsp: 0, total: 0, sign: { title: "", note: 0 } };

		if (copiedStudents.length) {
			for (let i = 0; i < students.length; i++) {
				// todo correct here
				copiedStudents[i].validate = e.target[i + 1].value;
				juryDecision.sign.note = e.target[i + 1].value;

				switch (e.target[i + 1].value) {
					case "0":
						juryDecision.none++;
						juryDecision.sign.title = "None";
						break;

					case "1":
						juryDecision.tf++;
						juryDecision.total++;
						juryDecision.sign.title = "Favorable";
						break;

					case "2":
						juryDecision.f++;
						juryDecision.total++;
						juryDecision.sign.title = "Doit faire ses preuves";
						break;

					case "3":
						juryDecision.dfsp++;
						juryDecision.total++;
						juryDecision.sign.title = "Trés favorable";
						break;
				}
			}

			for (let i = 0; i < students.length; i++) {
				copiedStudents[i].juryDecision = juryDecision;
			}
		}
		dispatch(updateStudents(copiedStudents));
		console.log(students);
		setDisplay(false);
		nextStep();
	};

	const changeHandler = (e) => {
		if (e.target.value != 0) {
			e.target.classList.add("ok");
			e.target.classList.remove("error");
		} else {
			e.target.classList.remove("ok");
			e.target.classList.add("error");
		}
	};
	return (
		display && (
			<Box component="section" id="StudentsValidation">
				<Typography variant="h4" className="title">
					Avis du conseil de classe (facultatif)
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
									<TableCell></TableCell>
									<TableCell>Nom complet</TableCell>
									<TableCell>Code Appreant</TableCell>
									<TableCell>Avis</TableCell>
									{/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row, index) => (
									<TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
										<TableCell>{row.id}</TableCell>
										<TableCell>{row.fullName}</TableCell>
										<TableCell>{row.studentCode}</TableCell>
										<TableCell>
											<FormControl fullWidth>
												<NativeSelect
													defaultValue={String(parseInt(Math.random() * 4))}
													inputProps={{
														name: "avis",
														id: "uncontrolled-native",
													}}
													onChange={changeHandler}
													name={String(index)}
													// required
												>
													<option value="0">Choisir une avis</option>
													<option value="1">Favorable</option>
													<option value="2">Doit faire ses preuves</option>
													<option value="3">Trés favorable</option>
												</NativeSelect>
											</FormControl>
										</TableCell>
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
export default StudentsValidation;
