import axios from 'axios';

interface ElementsReference {
  cardElement: string,
  cardErrorElement: string,
  paymentButton: string,
  paymentForm: string,
  resultMessageElement: string,
  resultMessageLink: string,
  spinnerElement: string,
  buttonTextElement: string 
}

export function stripeSetup(stripeInstance: any, allElementsReference: ElementsReference, token: string) {
  createPaymentIntent(stripeInstance, allElementsReference, token);
}

function mountCardElement(stripeInstance: any, elementsReference: { cardElement: string, paymentButton: string, cardErrorElement: string }) {
  const elements = stripeInstance.elements();
  const style = {
    base: {
      color: "#32325d",
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d"
      }
    },
    invalid: {
      fontFamily: 'Arial, sans-serif',
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  };
  const card = elements.create('card', { style: style });

  // Add an instance of the card Element into the `card-element` <div>
  card.mount(elementsReference.cardElement);

  card.on("change", function (event: any) {
    // Disable the Pay button if there are no card details in the Element
    const paymentButton = document.querySelector(elementsReference.paymentButton) as HTMLButtonElement;
    paymentButton.disabled = event.empty;

    const cardErrorElement = document.querySelector(elementsReference.cardErrorElement) as HTMLParagraphElement;
    cardErrorElement.textContent = event.error ? event.error.message : "";
  });

  return card;
}


async function createPaymentIntent(
  stripeInstance: any, 
  elementsReference: {
    cardElement: string, 
    paymentButton: string, 
    cardErrorElement: string, 
    paymentForm: string, 
    resultMessageElement: string, 
    resultMessageLink: string,
    spinnerElement: string,
    buttonTextElement: string,
  },
  token: string
) {
  try {
    const response = await axios.post('http://localhost/api/payment-intent', {}, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      }
    });
  
    const data = response.data;

    const card = mountCardElement(stripeInstance, elementsReference);

    var form = document.querySelector(elementsReference.paymentForm) as HTMLFormElement;
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      // Complete payment when the submit button is clicked
      payWithCard(stripeInstance, card, data.clientSecret, {
        resultMessageElement: elementsReference.resultMessageElement,
        resultMessageLink: elementsReference.resultMessageElement,
        paymentButton: elementsReference.paymentButton,
        cardErrorElement: elementsReference.cardErrorElement,
        spinnerElement: elementsReference.spinnerElement,
        buttonTextElement: elementsReference.buttonTextElement,
      });
    });

    
  } catch(error) {
    console.log(error);
  }
}

// Calls stripe.confirmCardPayment
// If the card requires authentication Stripe shows a pop-up modal to
// prompt the user to enter authentication details without leaving your page.
function payWithCard(
  stripe: any, 
  card: any, 
  clientSecret: any,
  elementsReference: { 
    resultMessageElement: string, 
    resultMessageLink: string, 
    paymentButton: string, 
    cardErrorElement: string, 
    spinnerElement: string, 
    buttonTextElement: string 
  }
) {
  loading(true, { 
    paymentButton: elementsReference.paymentButton, 
    spinnerElement: elementsReference.spinnerElement, 
    buttonTextElement: elementsReference.buttonTextElement
  });

  stripe
    .confirmCardPayment(clientSecret, {
      payment_method: {
        card: card
      }
    })
    .then(function(result: any) {
      if (result.error) {
        // Show error to your customer
        showError(result.error.message, { 
          paymentButton: elementsReference.paymentButton, 
          spinnerElement: elementsReference.spinnerElement, 
          buttonTextElement: elementsReference.buttonTextElement, 
          cardErrorElement: elementsReference.cardErrorElement 
        });
      } else {
        // The payment succeeded!
        orderComplete(result.paymentIntent.id, {
          resultMessageElement: elementsReference.resultMessageElement,
          resultMessageLink: elementsReference.resultMessageLink,
          paymentButton: elementsReference.paymentButton,
          spinnerElement: elementsReference.spinnerElement,
          buttonTextElement: elementsReference.buttonTextElement
        });
      }
    });
};

/* ------- UI helpers ------- */

// Shows a success message when the payment is complete
function orderComplete(
  paymentIntentId: any, 
  elementsReference: { resultMessageElement: string, resultMessageLink: string, paymentButton: string, spinnerElement: string, buttonTextElement: string
}) {
  loading(false, { 
    paymentButton: elementsReference.paymentButton, 
    spinnerElement: elementsReference.spinnerElement, 
    buttonTextElement: elementsReference.buttonTextElement
  });

  // @ts-ignore
  $nuxt.$router.push('/order-finished');

  const resultMessageLink = document.querySelector(elementsReference.resultMessageLink) as HTMLLinkElement;

  resultMessageLink.setAttribute("href", "https://dashboard.stripe.com/test/payments/" + paymentIntentId);
  
  const resultMessageElement = document.querySelector(elementsReference.resultMessageElement) as HTMLParagraphElement;
  resultMessageElement.classList.remove("invisible");

  const paymentButton = document.querySelector(elementsReference.paymentButton) as HTMLButtonElement;
  paymentButton.disabled = true;
};

// Show the customer the error from Stripe if their card fails to charge
function showError(errorMsgText: any, elementsReference: { paymentButton: string, spinnerElement: string, buttonTextElement: string, cardErrorElement: string }) {
  loading(false, { 
    paymentButton: elementsReference.paymentButton, 
    spinnerElement: elementsReference.spinnerElement, 
    buttonTextElement: elementsReference.buttonTextElement
  });
  
  const errorMsg = document.querySelector(elementsReference.cardErrorElement) as HTMLParagraphElement;
  errorMsg.textContent = errorMsgText;

  setTimeout(function() {
    errorMsg.textContent = "";
  }, 4000);
};

// Show a spinner on payment submission
function loading (
  isLoading: boolean, 
  elementsReference: { paymentButton: string, spinnerElement: string, buttonTextElement: string }
) {
  const paymentButton = document.querySelector(elementsReference.paymentButton) as HTMLButtonElement;
  const spinnerElement = document.querySelector(elementsReference.spinnerElement) as HTMLDivElement;
  const buttonTextElement = document.querySelector(elementsReference.buttonTextElement) as HTMLSpanElement;

  if (isLoading) {
    // Disable the button and show a spinner
    paymentButton.disabled = true;
    spinnerElement.classList.remove("invisible");
    buttonTextElement.classList.add("invisible");
  } else {
    paymentButton.disabled = false;
    spinnerElement.classList.add("invisible");
    buttonTextElement.classList.remove("invisible");
  }
};