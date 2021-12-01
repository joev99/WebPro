import { Link } from "react-router-dom";

//functions or components to handle the job details
function Job({ job, theme, jobHandler }) {
  const {
    contract,
    logo,
    logoBackground,
    postedAt,
    company,
    location,
    position,
  } = job;
  function handleJob() {
    jobHandler(job);
  }

  return (
    //routing to job-details
    <Link to="/job-details">
      <div className={`job-container bg-${theme}`} onClick={handleJob}>
        {/*set the company logo backgroundColor*/}
        <div
          className="company-logo-container"
          style={{ backgroundColor: logoBackground }}
        >
        {/*set the company logo*/}
          <img src={logo} alt={company} className="company-logo" />
        </div>
        {/*set the company posted job time*/}
        <div className="time-type-container text-gray mb-md">
          <p>{postedAt}</p>
          <span className="dot-divider"></span>
            {/*set the company posted job contract*/}
          <p>{contract}</p>
        </div>
        {/*set the company posted job position*/}
        <h2>{position}</h2>
          {/*set the company posted job company*/}
        <p className="text-gray mb-lg">{company}</p>
          {/*set the company posted job location*/}
        <p className="text-violet">{location}</p>
      </div>
    </Link>
  );
}

export default Job;
