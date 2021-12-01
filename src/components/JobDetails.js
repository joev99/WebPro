import React from "react";
import { v4 as uuidv4 } from "uuid";

function isUrl(url) {
  //use regular expression to handle the url
  const regexp =
    /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

  return regexp.test(url);
}

// function to handle and get the job details
function JobDetails({ theme, job }) {
  //if there is/are a job, then it will show the job's get data
  // else, it will show the paragraf bellow here whi contains no job is selected... text
  if (!job) {
    return (
      <p className="no-job">
        No job is selected. Please select a job from home page
      </p>
    );
  }

  // destructuring object in job data from the API
  let {
    company,
    logo,
    logoBackground,
    postedAt,
    description,
    apply,
    location,
    position,
    contract,
    website,
    requirements,
    role,
  } = job;

  // check if the website url is exist or not
  website = isUrl(website) ? website : "";

  return (
    <>
      <div className="container">
        <div className="job-details">
          <div className={`company-info bg-${theme}`}>
            {/*get the company logo container backgroundColor*/}
            <div
              className="logo-container"
              style={{ backgroundColor: logoBackground }}
            >
            {/*get the company logo */}
              <img src={logo} alt={company} className="company-logo" />
            </div>
            {/*get the company informatoin, from company name and website*/}
            <div className="name-link">
              <div>
                <h3>{company}</h3>
                <p>{website}</p>
              </div>
              {/*check if there is a company website then return it with the link*/}
              {website && (
                <a
                  href={website}
                  className="btn-link btn-washed"
                  target="_blank"
                  rel="noreferrer"
                >
                  Company Site
                </a>
              )}
            </div>
          </div>
          <div className={`job bg-${theme}`}>
            <div className="job-summary">
              <div>
                {/*show the time when the job is posted*/}
                <div className="time-type-container text-gray mb-md">
                  <p>{postedAt}</p>
                  <span className="dot-divider"></span>
                  {/*show the job contract*/}
                  <p>{contract}</p>
                </div>
                {/*show the offered job position*/}
                <h2>{position}</h2>
                {/*show where the offered job location*/}
                <p className="text-violet">{location}</p>
              </div>
              {/*button to apply the job and direct to the apply site*/}
              <a href={apply} className="btn btn-violet btn-link">
                Apply now
              </a>
            </div>
            {/*paragraf to get the job description details*/}
            <div className="job-description">
              <p>{description}</p>
              <h2>Requirements</h2>
              {/*paragraf to get the job description requirements*/}
              <p>{requirements.content}</p>
              <ul>
                {//get all the requirements by loop with map() method to return the results
                  requirements.items.map(item => {
                  return <li key={uuidv4()}>{item}</li>
                })}
              </ul>

              <h2>Role</h2>
              <p>{role.content}</p>
              <ol>
                {role.items.map(item => (
                  <li key={uuidv4()}>{item}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <footer className={`footer bg-${theme}`}>
        <div className="container">
          <div className="name-link">
            <div>
              <h3>{company}</h3>
              <p>{website}</p>
            </div>
            <a href={apply} className="btn btn-violet btn-link">
              Apply Now
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default JobDetails;
