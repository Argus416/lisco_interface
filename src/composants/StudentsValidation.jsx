import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import { NativeSelect } from "@mui/material";

function createData(id, fullName, studentCode) {
	return { id, fullName, studentCode };
}

const StudentsValidation = ({ display }) => {
	const students = useSelector((state) => state.students.value);

	const rows = [];
	let rowsId = 0;
	students.map((year) => {
		rowsId++;
		//  ,prenom, code_appreant
		const fullName = year["2e ANNEE"][0].NOM_APPRENANT + " " + year["2e ANNEE"][0].PRENOM_APPRENANT;
		const studentCode = year["2e ANNEE"][0].CODE_APPRENANT;

		rows.push(createData(rowsId, fullName, studentCode));
	});

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
					{rows.map((row) => (
						<TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
							<TableCell>{row.id}</TableCell>
							<TableCell>{row.fullName}</TableCell>
							<TableCell>{row.studentCode}</TableCell>
							<TableCell>
								<FormControl fullWidth>
									<NativeSelect
										defaultValue={0}
										inputProps={{
											name: "avis",
											id: "uncontrolled-native",
										}}
									>
										<option value={0}>Choisir une avis</option>
										<option value={1}>Favorable</option>
										<option value={2}>Doit faire ses preuves</option>
										<option value={3}>Trés favorable</option>
									</NativeSelect>
								</FormControl>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
export default StudentsValidation;
