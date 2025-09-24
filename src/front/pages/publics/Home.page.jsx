import { useAuth0 } from "@auth0/auth0-react";
import styles from "../../styles/page/home.module.css";

export const Home = () => {
	const { user } = useAuth0()
	console.log(user);
	
	return (
		<>
			<div className={styles.main}>
			<h1 className={styles.title}>Bienvenido a <br></br> D&D MASTERS OF INFINITY</h1>
			</div>
		</>
	);
}; 