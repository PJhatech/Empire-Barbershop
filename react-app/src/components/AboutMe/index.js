import "./AboutMe.css";

const AboutMe = () => {
	return (
		<div>
			<div className="linkedin">
				{[
					{
						// name: "Paul Hutalla",
						linkedin: "https://www.linkedin.com/in/paul-hutalla/",
						github: "https://github.com/PJhatech",
					},
				].map((profile) => (
					<div className="profile">
						<h4>{profile.name}</h4>
						<ul width="500" className="linkicons">
							<>
								<a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
									<i className="fab fa-linkedin"></i>
								</a>
							</>
							<>
								<a href={profile.github} target="_blank" rel="noopener noreferrer">
									<i className="fab fa-github"></i>
								</a>
							</>
						</ul>
					</div>
				))}
			</div>
		</div>
	);
};
export default AboutMe;
