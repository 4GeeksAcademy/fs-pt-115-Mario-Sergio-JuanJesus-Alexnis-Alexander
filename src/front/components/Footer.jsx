import styles from '../styles/components/footer.module.css'

export const Footer = () => {

	return (
		<footer className={styles.footer}>
			<div className={styles.footerContainer}>
				<div className={styles.footerContent}>

					{/* Company Info Section */}
					<div className={styles.footerSection}>
						<h3>About Us</h3>
						<p>
							We are a group committed to offering the best services to the D&D community.
							Thanks to so many years of playing we want to offer a better online service to help
							as much as possible to the community to be able to better control their games.

						</p>
					</div>

					<div className={styles.footerSection}>
						<h3>Quick Links</h3>
						<ul>
							<li><a href="#">Home</a></li>
							<li><a href="#">Services</a></li>
							<li><a href="#">Products</a></li>
						</ul>
					</div>

					<div className={styles.footerSection}>
						<h3>Contact</h3>
						<div className={styles.contactInfo}>
							<div className={styles.contactItem}>
								<svg viewBox="0 0 24 24">
									<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
								</svg>
								<span>Main Street 123, City</span>
							</div>
							<div className={styles.contactItem}>
								<svg viewBox="0 0 24 24">
									<path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
								</svg>
								<span>+34 123 456 789</span>
							</div>
							<div className={styles.contactItem}>
								<svg viewBox="0 0 24 24">
									<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
								</svg>
								<a href='mailto:team.masterofinfinity@gmail.com'>team.masterofinfinity@gmail.com</a>
							</div>
							
						</div>
					</div>
				</div>

				<div className={styles.footerBottom}>
					<div className={styles.footerBottomContent}>
						<div className={styles.copyright}>
							<p>&copy; 2025 MasterOfInfinity. All rights reserved.</p>
						</div>
						<nav className={styles.footerNav}>
							<a href="#">Privacy Policy</a>
							<a href="#">Sitemap</a>
						</nav>
					</div>
				</div>
			</div>
		</footer>
	);
};

