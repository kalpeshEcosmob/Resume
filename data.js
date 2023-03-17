//...............................................................................//
// 1) Book Shop
// 2) Chat Apllication
// 3) Football application using rest application
// 4) Resume Making
// 5) Signal Wire
//...............................................................................//

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
    { skill: "Node", Rating: 9 },
    { skill: "HTML", Rating: 8 },
    { skill: "CSS", Rating: 8 },
    { skill: "Git", Rating: 7 },
    { skill: "MYSQL", Rating: 8 },
    { skill: "Maria DB", Rating: 8 },
    { skill: "Visual Studio Code", Rating: 8 },
    { skill: "MongoDB", Rating: 8 },
    { skill: "Rabbit MQ", Rating: 8 },
    { skill: "React", Rating: 5 },
  ],
  experience: [
    {
      title: "Book-Shop",
      technologies:
        " HTML , CSS , JavaScript, Mongo DB , Node , Express , Stripe ",
      about_project:
        "Book shop application using node js , where user can login and logout , create , update , view and purchase book",
      description: [""],
      role: "Software Developer",
    },
    {
      title: "Chat Apllication",
      technologies: "HTML , CSS , JavaScript, Mongo DB , Node , Express",
      about_project:
        " CRM system for Customer Management, Feature Of Lead,Deal,contact,Company Management. Provide Additional Feature for documents Management, Customer Portal and Some features for Tax management.",
      description: [
        "Understanding the queries/ bugs mentioned in the github issues by the customers and taking actions accordingly.",
        "Solving bugs given by the client.",
      ],
      role: "Software Developer",
    },
    {
      title: "Football application",
      technologies:
        "HTML , CSS , JavaScript, MYSQL , Node , Express , Sequelize",
      about_project:
        "Tuilly Concepts Private Limited is an e-commerce venture that provides plants and plants-related items like plant pots and others like clothes, jewelry home decor products, and anything needed at your doorstep.",
      description: [
        "Writing and modifying code to implement various functionalities. ",
      ],
      role: "Software Developer",
    },
    {
      title: "Resume Making",
      technologies: "PHP,CI, jQuery, Ecommerce, JavaScript",
      about_project:
        "Jain Bandhu Trust is a leading PAN card services provider in India. Their services includes CA Consultancy Service, PAN Card, Income Tax Return File, GST, Registration & GST Filing, Gumasta, Nagar Nigam, Food, License, Company Audit, Trust / Samiti / NGO Registration, All Financial Solution, Digital Signature (DSC), ISO / Trademark / Copyright",
      description: [""],
      role: "Software Developer",
    },
    {
      title: "Signal Wire",
      technologies: "PHP, jQuery, Ecommerce, laravel, JavaScript",
      about_project:
        "Buying subscription and tickets for travel zones. Subscription wise unlimited entries. Visiting virtual and navigate mode long distance tours",
      description: [""],
      role: "Software Developer",
    },
  ],
  extraSkill: {
    certificate: [""],
    award: [""],
    training: [""],
  },
  image: { uid: "rc-upload-1677846265186-3" },
};

console.log(JSON.stringify(dummyDataKalpesh));
