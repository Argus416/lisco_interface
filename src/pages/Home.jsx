import { Box, Typography, Container, Button } from "@mui/material";
import Navbar from "../composants/utils/Navbar";
import UploadContainer from "../composants/UploadContainer";
import StudentsValidation from "../composants/StudentsValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import "../style/style.scss";
import { useSelector } from "react-redux";
import { useState } from "react";

const Home = () => {
	const students = useSelector((state) => state.students.value);

	const [screen, setSreen] = useState(1);

	const progressionHandler = () => {
		const allSteps = document.querySelectorAll(".ProgressionMenuStep");
		console.log(students);
	};

	return (
		<Box component="main" className="Home">
			<Navbar />
			<Container>
				<Typography className="title" component="h1" variant="h3">
					Convertissez le fichier CSV en PDF
				</Typography>

				<Box className="ProgressionMenu">
					<Box className="ProgressionMenuStep pmStep1">
						<Typography component="span" className="cercle-progression-menu cpm" sx={{ border: "6px solid #e5077e !important" }}>
							1
						</Typography>
						<FontAwesomeIcon className="arrowIcon" icon={faArrowRightLong} size="3x" />
					</Box>
					<Box className="ProgressionMenuStep pmStep2">
						<Typography component="span" className="cercle-progression-menu cpm">
							2
						</Typography>
						<FontAwesomeIcon className="arrowIcon" icon={faArrowRightLong} size="3x" />
					</Box>

					<Box className="ProgressionMenuStep pmStep3">
						<Typography component="span" className="cercle-progression-menu cpm">
							3
						</Typography>
						<FontAwesomeIcon className="arrowIcon" icon={faArrowRightLong} size="3x" />
					</Box>

					<Box className="ProgressionMenuStep pmStep4">
						<Typography component="span" className="cercle-progression-menu cpm">
							4
						</Typography>
					</Box>
				</Box>

				<Box className="btn-container">
					<Button onClick={progressionHandler} className="secondary-btn continue-btn" variant="contained">
						Continuer
					</Button>
				</Box>
				{students && <StudentsValidation />}
				<UploadContainer display={true} />
			</Container>
		</Box>
	);
};

export default Home;
