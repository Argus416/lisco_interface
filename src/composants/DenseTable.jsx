import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// import { Container } from "@mui/material";

// import { Table, TableBody, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const DenseTable = ({ student }) => {
    return (
        <>
            {student && (
                <TableContainer component={Paper} className="tableStudent">
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>NOM_MATIERE</TableCell>
                                <TableCell>ABREGE MATIERE</TableCell>
                                <TableCell>M_MATIERE_1</TableCell>
                                <TableCell>M_MATIERE_2</TableCell>
                                <TableCell>Moyenne général par matière</TableCell>
                                <TableCell>Moyenne groupe général par matière</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {student &&
                                student.map((detail, index) => (
                                    <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {detail.NUM_ORDRE_MATIERE}
                                        </TableCell>
                                        <TableCell>{detail.NOM_MATIERE}</TableCell>
                                        <TableCell>{detail.ABREGE_MATIERE}</TableCell>
                                        <TableCell>{detail.MOYENNE_1}</TableCell>
                                        <TableCell>{detail.MOYENNE_2}</TableCell>
                                        <TableCell>{detail.MOYENNE_MAT_GENERALE}</TableCell>
                                        <TableCell>{detail.MOYENNE_MAT_GRPE_ANNUELLE}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
};

export default DenseTable;
