// const fs = require("fs");
// const imagePath = "/home/kalpesh/Desktop/ResumeMaking/uploads/images/delete";

// fs.unlink(imagePath + "/2023-03-15T06:29:55.693Z-adarsh.jpg", (err) => {
//   if (err) {
//     console.log("--->", err);
//     throw err;
//   }

//   console.log("Delete File successfully.");
// });
const dummyData = {
  aboutMe: {
    candidate_code: "681",
    email: "varshil.shah@ecosmob.com",
    description:
      "Completed a RectJS training and developed a strong understanding of ReactJs, redux and related libraries. Developed a personal project using ReactJs and material Ui to create a movie app.Familiar with HTML, CSS, JavaScript & ReactJS. Good understanding of RESTful APIs & integrating them into Web Apps. Strong willingness to learn new skills and passion for technology",
    education: ["Bachelor of Engineering(Computer Engineering)"],
    role: "Software Engineer",
    experienceYear: 0,
    experienceMonth: 4,
  },
  skills: [
    { skill: "Html", Rating: 6 },
    { skill: "Css", Rating: 6 },
    { skill: "JavaScript", Rating: 7 },
    { skill: "ReactJs", Rating: 8 },
    { skill: "Firebase", Rating: 8 },
    { skill: "Git", Rating: 6 },
  ],
  experience: [
    {
      title: "Movie App",
      technologies: "ReactJs, Material Ui, Firebase, TMDB API",
      about_project:
        "MovieApp is a web application that helps users to check the trending, upcoming, and popular movies. On VEE5 the user can get the title, and overview as well as will also be able to rate the movies as well as he/she can add their favorite movies to the watchlist .  ",
      description: [
        "Developed user interface using Material UI from scratch",
        " Implemented firebase for login & registration and Firestore database for storing the ratings and watchlist data",
        "Implemented redux for maintaining and updating the data over the application,",

        "Integrated API for getting the data",
        "Implemented formik & Yup for form validation purpose and error boundaries for generating fallback UI",
      ],
      role: "Software Developer",
    },
    {
      title: "Crypto App",
      technologies: "ReactJs, NodeJs, CSS , Coingecko API, Socket Io",
      about_project:
        "Crytpo App is a web app for tracking the price of cryptocurrencies. Here the user will be able to watch the price of the cryptos, their logos, market cap, and ups and down in the last twenty-four hours. ",
      description: [
        "Developed user interface from scratch",
        "Implemented redux for maintaining and updating the data over the application.",
        "Created backend using NodeJs for implementing Socket Io to get the live updates about the change in price.",
      ],
      role: "Software Developer",
    },
  ],
  extraSkill: {
    certificate: [""],
    award: [""],
    training: ["ReactJs"],
  },
  image: { uid: "rc-upload-1677846265186-3" },
};

console.log(JSON.stringify(dummyData));
