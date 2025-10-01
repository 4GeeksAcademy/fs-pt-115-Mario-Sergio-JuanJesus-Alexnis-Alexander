import { useAuth0 } from "@auth0/auth0-react";
import dropstyles from "../../styles/components/menuDropdown.module.css";
import styles from "../../styles/page/home.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const Home = () => {
	const { user } = useAuth()
	
	return (
		<>
			<div className={styles.main}>
				<div className="container">
					<h1 className={styles.title}>Bienvenido a <br></br> D&D MASTERS OF INFINITY</h1>
					<div className="row">
						<div className="col-md-6">
							<div className={styles.card}>
								<h2 className={styles.subtitle}>¿Qué es D&D MASTERS OF INFINITY?</h2>
								<p className={styles.text}>
									D&D MASTERS OF INFINITY es una plataforma web diseñada para facilitar la gestión y organización de partidas de Dungeons & Dragons. Nuestra misión es proporcionar a los jugadores y Dungeon Masters (DMs) una herramienta intuitiva y eficiente para crear, administrar y disfrutar de sus aventuras en el mundo de D&D.
								</p>
							</div>
						</div>
						<div className="col-md-6">
							<div className={styles.card}>
								<h2 className={styles.subtitle}>Visita la Newsletter de DnD</h2>
								<Link to="https://dungeonsanddragonsfan.com/" target="_blank" rel="noopener noreferrer">
									<img className={styles.img} src="https://dungeonsanddragonsfan.com/wp-content/uploads/2024/05/dungeons-and-dragons-fanatics-logo-1A.png" alt="" />
								</Link>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className={styles.card}>
								{!user && <h2 className={styles.subtitle}>¡Únete a nuestra comunidad!</h2>}
								{!user && <p className={styles.text}>Si eres un apasionado de Dungeons & Dragons, no dudes en registrarte y comenzar a explorar todo lo que D&D MASTERS OF INFINITY tiene para ofrecer. Ya seas un jugador experimentado o un principiante, nuestra plataforma está diseñada para adaptarse a tus necesidades y mejorar tu experiencia de juego.</p>}
								{!user && <p className={styles.text}>Regístrate hoy mismo y comienza tu aventura con nosotros.</p>}
								{!user && <div className={styles.buttonContainer}><Link to="/login" className={styles.button}>Regístrate</Link></div>}
								{user && <h2 className={styles.subtitle}>¡Hola {user.username}!</h2>}
								{user && <p className={styles.text}>Gracias por ser parte de nuestra comunidad. Explora nuestras funcionalidades y comienza a crear y gestionar tus partidas de Dungeons & Dragons de manera sencilla y eficiente.</p>}
								{user && <p className={styles.text}>¡Que comience la aventura!</p>}
								{user && <section className={dropstyles.dropLeft}>
										  <Link to={"/user/characters"}>
											<button className={dropstyles.charactersBtn}>
											  <span className={dropstyles.titleBtn}>MY CHARACTERS</span>
											</button>
										  </Link>
										  <Link to={"/user/campaigns"}>
											<button className={dropstyles.campaignsBtn}>
											  <span className={dropstyles.titleBtn}>MY CAMPAIGNS</span>
											</button>
										  </Link>
										  <Link to={"/user/magics-items"}>
											<button className={dropstyles.magicsBtn}>
											  <span className={dropstyles.titleBtn}>MY MAGIC ITEMS</span>
											</button>
										  </Link>
										  <Link to={"/user/spell"}>
											<button className={dropstyles.spellsBtn}>
											  <span className={dropstyles.titleBtn}>MY SPELLS</span>
											</button>
										  </Link>
										  <Link to={"/user/monster"}>
											<button className={dropstyles.monstersBtn}>
											  <span className={dropstyles.titleBtn}>MY MONSTERS</span>
											</button>
										  </Link>
										  <Link to="https://dnddice.com/collections/build-your-own-set" target="_blank" rel="noopener noreferrer">
											<button className={dropstyles.diceBtn}>
											  <span className={dropstyles.titleBtn}>MY DICE</span>
											</button>
										  </Link>
										</section>}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}; 