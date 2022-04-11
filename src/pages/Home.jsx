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
	let step = 0;
	const progressionHandler = () => {
		const allSteps = document.querySelectorAll(".ProgressionMenuStep");
		if (step !== allSteps.length - 1) {
			allSteps[step].querySelector(".cpm").classList.remove("active");
			allSteps[step + 1].querySelector(".cpm").classList.add("active");
			step++;
		}
		console.log(step);
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
						<Typography component="span" className="cercle-progression-menu cpm active">
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

				<UploadContainer nextStep={() => progressionHandler()} />
				{students && <StudentsValidation nextStep={() => progressionHandler()} />}
			</Container>
		</Box>
	);
};

export default Home;
