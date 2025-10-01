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
					<div className="row">
						<div className="col-md-6 mt-4">
							<div className={styles.card}>
								<h2 className={styles.subtitle}>What is D&D MASTERS OF INFINITY?</h2>
								<p className={styles.text}>
									D&D MASTERS OF INFINITY is a web platform designed to facilitate the management and organization of Dungeons & Dragons games. Our mission is to provide players and Dungeon Masters (DMs) with an intuitive and efficient tool to create, manage and enjoy their adventures in the world of D&D.
								</p>
							</div>
						</div>
						<div className="col-md-6 mt-4">
							<div className={styles.card}>
								<h2 className={styles.subtitle}>Visit the DnD Newsletter</h2>
								<Link to="https://dungeonsanddragonsfan.com/" target="_blank" rel="noopener noreferrer">
									<img className={`${styles.img} mx-auto d-block`} src="https://dungeonsanddragonsfan.com/wp-content/uploads/2024/05/dungeons-and-dragons-fanatics-logo-1A.png" alt="" />
								</Link>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12 d-flex flex-wrap gap-2">
							<div className={styles.card}>
								{!user && <h2 className={styles.subtitle}>Join our community!</h2>}
								{!user && <p className={styles.text}>If you are passionate about Dungeons & Dragons, feel free to sign up and start exploring everything D&D MASTERS OF INFINITY has to offer. Whether you are an experienced player or a beginner, our platform is designed to adapt to your needs and improve your gaming experience.</p>}
								{!user && <p className={styles.text}>Register today and start your adventure with us.</p>}
								{!user && <div className={styles.buttonContainer}><Link to="/login" className={styles.button}>Sign up</Link></div>}
								{user && <h2 className={styles.subtitle}> Hi {user.username}!</h2>}
								{user && <p className={styles.text}>Thank you for being part of our community. Explore our features and start creating and managing your Dungeons & Dragons games simply and efficiently.</p>}
								{user && <p className={styles.text}>Let the adventure begin!</p>}
								{user && <section className={dropstyles.dropLeftbtn}>
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
										  <Link to={"/user/feats"}>
											<button className={dropstyles.featsBtn}>
											  <span className={dropstyles.titleBtn}>MY FEATS</span>
											</button>
										  </Link>
										  <Link to={"/user/background"}>
											<button className={dropstyles.backgroundsBtn}>
											  <span className={dropstyles.titleBtn}>MY BACKGROUNDS</span>
											</button>
										  </Link>
										  <Link to={"/user/subclasses"}>
											<button className={dropstyles.classesBtn}>
											  <span className={dropstyles.titleBtn}>MY CLASSES</span>
											</button>
										  </Link>
										  <Link to={"/user/specie"}>
											<button className={dropstyles.speciesBtn}>
											  <span className={dropstyles.titleBtn}>MY SPECIES</span>
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