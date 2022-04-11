import { Box, Typography, Container, Button } from "@mui/material";
import Navbar from "../components/utils/Navbar";
import UploadContainer from "../components/UploadContainer";
import StudentsValidation from "../components/StudentsValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import "../style/style.scss";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
	const students = useSelector((state) => state.students.value);
	// let step = currentScreen;
	const progressionHandler = (step) => {
		const allSteps = document.querySelectorAll(".ProgressionMenuStep");
		allSteps[step - 1].querySelector(".cpm").classList.remove("active");
		allSteps[step].querySelector(".cpm").classList.add("active");
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

				<UploadContainer nextStep={() => progressionHandler(1)} />
				{students && <StudentsValidation nextStep={() => progressionHandler(2)} />}
			</Container>
		</Box>
	);
};

export default Home;
