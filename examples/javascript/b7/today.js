import { formatDate } from "./today_format.js";

const paragraph = document.querySelector("#date");
paragraph.textContent = `Today is ${formatDate(new Date())}.`;
