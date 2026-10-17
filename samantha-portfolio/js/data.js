/* Central editable data. Only facts from Samantha's resume. */
const PROFILE = {
  name: "Samantha M.", role: "B.Sc. Computer Science Student",
  email: "samanthamuthu27@gmail.com", phone: "+91 86083 12577", phoneTel: "+918608312577",
  github: "https://github.com/samantha27-code",
  whatsapp: "918608312577",
  waMessage: "Hii Sam🤗👋! I visited your portfolio and would like to connect with you.",
  mailSubject: "Portfolio Inquiry — Samantha M.",
  location: "Kumbakonam, Tamil Nadu, India"
};
/* status: Learning | Planned | Completed (Completed only when verified) */
const COURSES = [
  { id:"python", title:"Python Foundations", category:"Python", level:"Beginner", status:"Learning", hours:40, icon:"bi-braces",
    description:"Personal learning plan for core Python programming.",
    objectives:["Write and run simple Python programs","Use conditions, loops and functions","Work with lists, dictionaries and files"],
    prerequisites:["None"],
    modules:[{title:"Basics",lessons:["Syntax and variables","Input and output","Operators"]},{title:"Control flow",lessons:["Conditions","Loops"]},{title:"Functions & data",lessons:["Functions","Lists and dictionaries"]}] },
  { id:"fullstack", title:"Full Stack Development Path", category:"Web Development", level:"Beginner", status:"Learning", hours:120, icon:"bi-layers",
    description:"Personal learning plan covering front end, back end and databases.",
    objectives:["Understand how front end and back end connect","Build a small database-backed web app","Use Git and GitHub to manage code"],
    prerequisites:["HTML, CSS and JavaScript basics"],
    modules:[{title:"Front end",lessons:["Responsive layouts","DOM and events"]},{title:"Back end",lessons:["Server basics","REST APIs"]},{title:"Data",lessons:["SQL basics","Connecting app to database"]}] },
  { id:"web-basics", title:"HTML, CSS & JavaScript Basics", category:"Frontend Development", level:"Beginner", status:"Planned", hours:50, icon:"bi-window-stack",
    description:"Planned foundation for building the personal portfolio website.",
    objectives:["Structure pages with semantic HTML","Style responsive layouts with CSS","Add interactivity with JavaScript"],
    prerequisites:["None"],
    modules:[{title:"HTML",lessons:["Semantic elements","Forms"]},{title:"CSS",lessons:["Flexbox and grid","Responsive design"]},{title:"JavaScript",lessons:["Variables and functions","Events and DOM"]}] },
  { id:"cs-fundamentals", title:"Programming & CS Fundamentals", category:"Computer Science Fundamentals", level:"Beginner", status:"Planned", hours:60, icon:"bi-cpu",
    description:"Planned study of logic and problem-solving using C and core CS ideas.",
    objectives:["Break problems into steps","Read and write basic C programs","Understand basic data structures"],
    prerequisites:["None"],
    modules:[{title:"Logic",lessons:["Algorithms and flowcharts","Problem decomposition"]},{title:"C basics",lessons:["Syntax","Arrays and functions"]}] },
  { id:"databases", title:"SQL & Databases Introduction", category:"Databases", level:"Beginner", status:"Planned", hours:30, icon:"bi-database",
    description:"Planned introduction to relational databases and SQL.",
    objectives:["Design simple tables","Write SELECT, INSERT, UPDATE, DELETE queries","Understand keys and relationships"],
    prerequisites:["None"],
    modules:[{title:"SQL basics",lessons:["Tables and queries","Joins"]}] }
];
