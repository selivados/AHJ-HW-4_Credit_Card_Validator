import { cardValidatorWidget } from "./widget";

const container = document.querySelector(".container");
const widget = new cardValidatorWidget(container);

widget.bindToDOM();
