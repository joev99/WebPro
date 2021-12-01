//this is an about page which contains informations about the web
//and the author who make this websitee
const About = ()=> {

  return (
    <div className="container">
        <div className="jobs">
          <p className={`results-summary`}>About this web</p>
        </div>
        <div>
          <h3>This website is used GithubJob API to get the list of jobs from the API and show it on the list in main page.</h3>
          <h4>The content in this website will shows us the list of developer jobs and its details</h4>
        </div>
        <div style={{height:230,display:'flex',flexDirection:'column',justifyContent:'space-evenly'}}>
          <p>Name : Kansil Jovial Veiva Junior</p>
          <p>NIM : 105021710030</p>
          <p>Class Subject : Web Programming</p>
          <p>Study Program : Informatics</p>
        </div>
    </div>
  );
}

export default About;
