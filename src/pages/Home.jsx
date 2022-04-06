import Navbar from "../composants/Navbar";
import UploadContainer from "../composants/UploadContainer";
import "../style/style.scss";

const Home = () => {
	return (
		<main className="Home">
			<Navbar />

			<UploadContainer />
		</main>
	);
};

export default Home;
