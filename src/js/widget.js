import { getCardIssuer } from "./card";
import { isValidCardNumber } from "./validator";

export class cardValidatorWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;

    this.onInput = this.onInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static get markup() {
    return `
    <h1 class="title">Check your credit card number</h1>
    <ul class="cards">
      <li><span class="card mir" title="Mir"></span></li>
      <li><span class="card visa" title="Visa"></span></li>
      <li><span class="card master" title="MasterCard"></span></li>
      <li><span class="card amex" title="American Express"></span></li>
      <li><span class="card discover" title="Discover"></span></li>
      <li><span class="card jcb" title="JCB"></span></li>
      <li><span class="card diners_club" title="Diners Club"></span></li>
    </ul>
    <form class="form">
      <div class="form-group">
        <input class="input" type="text" placeholder="Credit card number" required="">
        <button class="submit">Click to Validate</button>
      </div>
    </form>
    `;
  }

  bindToDOM() {
    this.parentEl.innerHTML = cardValidatorWidget.markup;

    this.cards = this.parentEl.querySelector(".cards");
    this.form = this.parentEl.querySelector(".form");
    this.input = this.form.querySelector(".input");
    this.submit = this.form.querySelector(".submit");

    this.form.addEventListener("input", this.onInput);
    this.form.addEventListener("submit", this.onSubmit);
  }

  enableAllCards() {
    this.cards
      .querySelectorAll(".card")
      .forEach((card) => card.classList.remove("disabled"));
  }

  disableAllCards() {
    this.cards
      .querySelectorAll(".card")
      .forEach((card) => card.classList.add("disabled"));
  }

  onInput(event) {
    event.preventDefault();

    const value = this.input.value;

    if (value) {
      const isValidValue = /^[\d\s]*$/.test(value);

      if (isValidValue) {
        const cardIssuer = getCardIssuer(value);

        if (cardIssuer) {
          this.disableAllCards();
          this.cards
            .querySelector(`.${cardIssuer}`)
            .classList.remove("disabled");
        } else {
          this.enableAllCards();
        }
      } else {
        this.input.value = value.slice(0, -1);
      }
    } else {
      this.enableAllCards();
      this.input.classList = "input";
    }
  }

  onSubmit(event) {
    event.preventDefault();

    const value = this.input.value;
    const isValid = isValidCardNumber(value);

    this.input.classList.toggle("valid", isValid);
    this.input.classList.toggle("invalid", !isValid);
  }
}
