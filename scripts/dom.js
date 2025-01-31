import { projects } from "./projects.js"

const htmlProjects = document.getElementById("htmlProjects");
const jsProjects = document.getElementById("jsProjects");

const dom = projects.forEach((project) => {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col");
  
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "h-100", "d-flex", "flex-column");
  
    const img = document.createElement("img");
    img.src = `./images/${project.name}.png`;
    img.alt = project.name;
    img.classList.add("card-img-top");
    cardDiv.appendChild(img);
  
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "flex-grow-1");
  
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = project.title;
  
    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = project.description;
  
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
  
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("container", "my-3");
  
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row", "justify-content-center");
  
    project.languages.forEach((lang) => {
      const colAutoDiv = document.createElement("div");
      colAutoDiv.classList.add("col-auto");
  
      const langImg = document.createElement("img");
      langImg.src = `./images/${lang}.png`;
      langImg.alt = `${lang.toUpperCase()} Icon`;
      langImg.classList.add("img-fluid");
      langImg.width = 80;
      langImg.height = 80;
  
      colAutoDiv.appendChild(langImg);
      rowDiv.appendChild(colAutoDiv);
    });
  
    containerDiv.appendChild(rowDiv);
    cardBody.appendChild(containerDiv);
  
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("mt-auto", "mb-3");
  
    const link = document.createElement("a");
    link.href = `./intro/${project.name}.html`;
    link.classList.add("btn", "btn-primary");
    link.textContent = "כניסה";
  
    buttonDiv.appendChild(link);
  
    cardDiv.appendChild(cardBody);
    cardDiv.appendChild(buttonDiv);
  
    colDiv.appendChild(cardDiv);
    if(project.languages.includes("js")) {
      jsProjects.appendChild(colDiv);
    } else {
      htmlProjects.appendChild(colDiv);
    }
  });

export { dom }