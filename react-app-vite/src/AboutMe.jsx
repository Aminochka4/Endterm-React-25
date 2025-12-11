import "./App.css";

function AboutMe() {
  return (
    <section className="text-center about">
      <h1>About Me</h1>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div
            className="col-lg-4 col-sm-6 col-12 about-item animate__animated animate__lightSpeedIn"
            data-wow-offset="200"
          >
            <span className="fa fa-info"></span>
            <h2>Who am I</h2>
            <p className="lead">
              My name is Amina, 21 years old <br />
              4th year student at SITE
            </p>
          </div>

          <div
            className="col-lg-4 col-sm-6 col-12 about-item animate__animated animate__lightSpeedIn"
            data-wow-offset="200"
          >
            <span className="fa fa-info"></span>
            <h2>My favorite things</h2>
            <p className="lead">
              Delicious food, planned weekends, long and healthy sleep, spending time with loved ones, 
              the smell of rain, warm and beautiful clothes, salary, impressive films
            </p>
          </div>

          <div
            className="col-lg-4 col-sm-6 col-12 about-item animate__animated animate__lightSpeedIn"
            data-wow-offset="200"
          >
            <span className="fa fa-info"></span>
            <h2>My contacts</h2>
            <p className="lead">
              email: am_amanzholova@kbtu.kz <br />
              github: Aminochka4 <br />
              telegram: mineo_mango
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
