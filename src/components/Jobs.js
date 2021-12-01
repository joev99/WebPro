import Job from "./Job";

function Jobs({ jobs, theme, jobHandler }) {
  // this function is to show all the jobs form the API
  return (
    <div className="jobs-container">
      {/*use array method map to loops through the datas which get from the API*/}
      {jobs.map(job => {
        // return the job datas
        return <Job job={job} key={job.id} theme={theme} jobHandler={jobHandler} />
      })}
    </div>
  );
}

export default Jobs;
