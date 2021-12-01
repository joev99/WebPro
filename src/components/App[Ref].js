import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import JobDetalis from "./JobDetails";
import NotFound from "./NotFound";

function App() {
  const [theme, setTheme] = React.useState("light");
  const [status, setStatus] = React.useState("idle");
  const [jobs, setJobs] = React.useState([]);
  const [job, setJob] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [queries, setQueries] = React.useState(() => ({
    description: "",
    location: "",
    fulltime: false,
  }));
  const [error, setError] = React.useState(null);
  const [lastPage, setLastPage] = React.useState(false);

  function handlePage() {
    setPage(page + 1);
  }

  function handleHome() {
    setPage(1);
    setJobs([]);
    setQueries({
      description: "",
      location: "",
      fulltime: false,
    });
  }

  function handleSubmit(data) {
    setPage(1);
    setJobs([]);
    setLastPage(false);
    setQueries(data);
  }

  document.body.className = `body-bg-${theme}`;
  const prevPageRef = React.useRef();

  React.useEffect(() => {
    const { description, location, fulltime } = queries;
    const url = `https://jobs.github.com/positions.json?description=${description}&location=${location}&full_time=${fulltime}&markdown=true&page=${page}`;

    document.title = "Github Jobs";
    const prevPage = prevPageRef.current;
    prevPageRef.current = page;

    setStatus("pending");
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.length < 50) {
          setLastPage(true);
        }
        if (page !== prevPage && data.length !== 0) {
          setStatus("resolved");
          setJobs(prevJobs => [...prevJobs, ...data]);
        } else {
          setStatus("resolved");
          setJobs(data);
        }
      })
      .catch(e => {
        console.log(e.message);
        setStatus("resolved");
        setError(e.message);
      });
  }, [page, queries]);

  return (
    <div className="App">
      <Header setTheme={setTheme} handleHome={handleHome} />
      <main className="main">
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
                error={error}
                status={status}
                lastPage={lastPage}
                jobHandler={setJob}
                handlePage={handlePage}
                handleSubmit={handleSubmit}
              />
            )}
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
