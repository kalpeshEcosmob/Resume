// const fs = require("fs");
// const imagePath = "/home/kalpesh/Desktop/ResumeMaking/uploads/images/delete";

// fs.unlink(imagePath + "/2023-03-15T06:29:55.693Z-adarsh.jpg", (err) => {
//   if (err) {
//     console.log("--->", err);
//     throw err;
//   }

//   console.log("Delete File successfully.");
// });

const dummyDataKalpesh = {
  aboutMe: {
    candidate_code: "693",
    email: "kalpesh.makwana@ecosmob.com",
    description: "",
    education: ["Bachlers in Engineering(Information & Technology)"],
    role: "Software Engineer",
    experienceYear: 0,
    experienceMonth: 3,
  },
  skills: [
    { skill: "PHP", Rating: 7 },
    { skill: "Codeigniter", Rating: 8 },
    { skill: "Laravel", Rating: 8 },
    { skill: "Linux", Rating: 6 },
    { skill: "MYSQL", Rating: 6 },
    { skill: "Visual Studio Code", Rating: 8 },
  ],
  experience: [
    {
      title: "Feedfleet",
      technologies: "Codeigniter, PHP, HTML, JavaScript, jQuery, Stripe,MYSQL.",
      about_project:
        "Feedfleet is a premier remote video capturing platform that enables customers from all around the world to record and share testimonials and messages. We use our advanced technology and resources to create unique testimonials that help elevate business.",
      description: [""],
      role: "Developer",
    },
    {
      title: "GoldArrow",
      technologies: "Bitrix24, PHP, JQuery, Bootstrap,MySql",
      about_project:
        " CRM system for Customer Management, Feature Of Lead,Deal,contact,Company Management. Provide Additional Feature for documents Management, Customer Portal and Some features for Tax management.",
      description: [
        "Understanding the queries/ bugs mentioned in the github issues by the customers and taking actions accordingly.",
        "Solving bugs given by the client.",
      ],
      role: "Developer",
    },
    {
      title: "Tuilly",
      technologies:
        "PHP, Laravel, Visual Studio,HTML, CSS, Javascript, Jquery, Ajax,Rest API, MYSQL",
      about_project:
        "Tuilly Concepts Private Limited is an e-commerce venture that provides plants and plants-related items like plant pots and others like clothes, jewelry home decor products, and anything needed at your doorstep.",
      description: [
        "Writing and modifying code to implement various functionalities. ",
      ],
      role: "Developer",
    },
    {
      title: "Jain Bandhu Trust",
      technologies: "PHP,CI, jQuery, Ecommerce, JavaScript",
      about_project:
        "Jain Bandhu Trust is a leading PAN card services provider in India. Their services includes CA Consultancy Service, PAN Card, Income Tax Return File, GST, Registration & GST Filing, Gumasta, Nagar Nigam, Food, License, Company Audit, Trust / Samiti / NGO Registration, All Financial Solution, Digital Signature (DSC), ISO / Trademark / Copyright",
      description: [""],
      role: "Developer",
    },
    {
      title: "Hop On India",
      technologies: "PHP, jQuery, Ecommerce, laravel, JavaScript",
      about_project:
        "Buying subscription and tickets for travel zones. Subscription wise unlimited entries. Visiting virtual and navigate mode long distance tours",
      description: [""],
      role: "Developer",
    },
  ],
  extraSkill: {
    certificate: [""],
    award: [""],
    training: [""],
  },
  image: { uid: "rc-upload-1677846265186-3" },
};

console.log(JSON.stringify(dummyData));
