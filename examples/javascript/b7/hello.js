import { greeting } from "./greeting.js";

const hour = new Date().getHours();
const heading = document.querySelector("#title");

heading.textContent = greeting("visitor", hour);
console.log("hello.js ran after the page was parsed");
