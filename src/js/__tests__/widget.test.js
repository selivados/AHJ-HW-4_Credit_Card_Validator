/**
 * @jest-environment jsdom
 */

import { cardValidatorWidget } from "../widget";

test("widget should render", () => {
  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector(".container");
  const widget = new cardValidatorWidget(container);

  widget.bindToDOM();

  expect(container.innerHTML).toEqual(cardValidatorWidget.markup);
});

test("widget should add valid class to input element if credit card number is valid", () => {
  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector(".container");
  const widget = new cardValidatorWidget(container);

  widget.bindToDOM();

  widget.input.value = "2200260590112854";
  widget.submit.click();

  expect(widget.input.classList.contains("valid")).toBe(true);
});

test("widget should add invalid class to input element if credit card number is invalid", () => {
  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector(".container");
  const widget = new cardValidatorWidget(container);

  widget.bindToDOM();

  widget.input.value = "2200260590112853";
  widget.submit.click();

  expect(widget.input.classList.contains("invalid")).toBe(true);
});
