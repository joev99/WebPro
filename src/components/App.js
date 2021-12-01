import React, {useState,useEffect} from "react";
import { Switch, Route } from "react-router-dom";

//imiport the components and page that will be used in the project
import Header from "./Header";
import Home from "./Home";
import About from "./about";
import JobDetalis from "./JobDetails";
import NotFound from "./NotFound";
import jobsList from "../data.json";

//the main app function
function App() {
  //set the state in order to make some changes for dynamic content
  //dark theme state
  const [theme, setTheme] = useState("light");
  //job status state
  const [status, setStatus] = useState("idle");
  // list of jobs state
  const [jobs, setJobs] = useState([]);
  // single job state
  const [job, setJob] = useState(null);
  // query state which gonna be used for searching the jobs
  const [queries, setQueries] = React.useState(() => ({
    description: "",
    location: "",
    fulltime: false,
  }));
  // const [error, setError] = React.useState(null);

  //function to handle state change in homepage.
  // to reset the job list and search queries.
  function handleHome() {
    setJobs([]);
    setQueries({
      description: "",
      location: "",
      fulltime: false,
    });
  }

  //handle data when user submit the queries to search for jobs
  function handleSubmit(data) {
    setJobs([]);
    setQueries(data);
  }

  //function to handle when user use the filter in search queries
  function filterOnDescription(description) {

    // return the jobs that has been filtered when user searchs
    //use filter() method to filter the jobs
    return jobsList.filter(job => {
      return (
        //return the result and lowercased it
        job.company.toLowerCase().includes(description) ||
        job.position.toLowerCase().includes(description)
      );
    });
  }

  //function to handle filter by the job's location
  function filterOnLocation(jobs, location) {
    return jobs.filter(
      job => job.location.toLowerCase() === location.toLowerCase()
    );
  }

  //function to handle filter when user check the full time only box, and show all the job result only in full-time
  function filterFulltimeOnly(jobs) {
    return jobs.filter(job => job.contract.toLowerCase() === "full time");
  }

  //set new classname and its style
  document.body.className = `body-bg-${theme}`;

  //get all the data from API and show it iin the home page every time the component is update or the web is refreshed
  useEffect(() => {
    setJobs(jobsList);

    const { description, location, fulltime } = queries;

    if (description) {
      let filteredJobs = filterOnDescription(description);

      if (location) {
        filteredJobs = filterOnLocation(filteredJobs, location);
      }

      if (fulltime) {
        filteredJobs = filterFulltimeOnly(filteredJobs);
      }

      setJobs(filteredJobs);
    }

    if (location) {
      setJobs(filterOnLocation(jobsList, location));
    }

    if (fulltime) {
      setJobs(filterFulltimeOnly(jobsList));
    }

    document.title = "Dev Jobs";

    setStatus("pending");
    setStatus("resolved");
  }, [queries]);

  return (
    <div className="App">
      <Header setTheme={setTheme} handleHome={handleHome} />
      <main className="main">
        {/*handle the routing inside the web which start from main page an about and when user see the job's details and not found page*/}
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Home
                {...props}
                jobs={jobs}
                theme={theme}
                queries={queries}
                status={status}
                lastPage={true}
                jobHandler={setJob}
                handleSubmit={handleSubmit}
              />
            )}
          />
          <Route
            path="/about"
            render={() => <About/>}
          />
          <Route
            path="/job-details"
            exact
            render={() => <JobDetalis theme={theme} job={job} />}
          />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
