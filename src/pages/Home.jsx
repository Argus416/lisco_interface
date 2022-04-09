import { Box, Typography, Container } from "@mui/material";
import Navbar from "../composants/Navbar";
import UploadContainer from "../composants/UploadContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import "../style/style.scss";

const Home = () => {
	return (
		<Box component="main" className="Home">
			<Navbar />
			<Container>
				<Typography className="title" component="h1" variant="h3">
					Convertissez le fichier CSV en PDF
				</Typography>

				<Box className="ProgressionMenu">
					<Box className="ProgressionMenuStep pmStep1">
						<Typography component="span" className="cercle-progression-menu cpm">
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
				{/* <UploadContainer /> */}
			</Container>
		</Box>
	);
};

export default Home;
