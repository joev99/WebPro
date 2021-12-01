import Search from "./Search";
import Jobs from "./Jobs";
import Loading from "./Loading";

function Home({
  theme,
  jobs,
  jobHandler,
  handlePage,
  handleSubmit,
  queries,
  status,
  lastPage,
}) {

  const { description, location, fulltime } = queries;
  const numJobs = jobs.length;

  let resultsSummary = `Showing ${numJobs} jobs`;
  //show job location
  if (description) {
    resultsSummary += ` for ${description}`;
  }
  //show job description
  if (location) {
    resultsSummary += ` in ${location}`;
  }
  //show job time
  if (fulltime) {
    resultsSummary += ` that is fulltime.`;
  }

  return (
    <>
      <div className="container">
        <Search theme={theme} handleSubmit={handleSubmit} />
        {status === "pending" && jobs.length === 0 ? (
          //fetching all the datas when loading
          <Loading text="Fetching data" className="loading" />
        ) : (
          //get all the fetched job datas from API
          <div className="jobs">
            <p className={`results-summary ${theme}`}>{resultsSummary}</p>
            <Jobs jobs={jobs} theme={theme} jobHandler={jobHandler} />
            //button to handle when user submit
            <button
              className="btn btn-violet btn-lg"
              onClick={handlePage}
              disabled={lastPage}
            >
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
