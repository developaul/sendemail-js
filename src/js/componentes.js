import '../css/tailwind.min.css';

// References
const form         = document.querySelector( '#enviar-mail' ),
      inputs       = document.querySelectorAll( '.input' ),
      email        = document.querySelector( '#email' ),
      subjet       = document.querySelector( '#asunto' ),
      message      = document.querySelector( '#mensaje' ),
      submitButton = document.querySelector( '#enviar' ),
      resetButton  = document.querySelector( '#resetBtn' ),
      er           = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


      
/*FUNCTIONS*/
// This function starts the application
const startApp = () => {
    disableButton( submitButton );
    activateButton( resetButton );
    resetForm( inputs );
}

// This function activates the send button
const activateButton = button => {
    button.disabled  = false;
    button.classList.remove( 'cursor-not-allowed', 'opacity-50' );
}

// This function disables the send button
const disableButton = button => {
    button.disabled = true;
    button.classList.add( 'cursor-not-allowed', 'opacity-50' );
}

// This function marks the inputs as correct
const correctInput = input => {
    input.classList.remove( 'border', 'border-red-500' );
    input.classList.add( 'border', 'border-green-500' );
}

// This function marks the inputs as incorrect
const incorrectInput = input => {
    input.classList.remove( 'border', 'border-green-500' );
    input.classList.add( 'border', 'border-red-500' );
}

// This function resets the form
const resetForm = inputs => {
    form.reset();
    inputs.forEach( input => input.classList.remove( 'border', 'border-green-500' ) );
    disableButton( submitButton );
    activateButton( resetButton );
}

// This function displays an error message
const showError = message => {
    const errorMessage = document.createElement( 'p' );
    errorMessage.textContent = `${ message }`;
    errorMessage.classList.add( 'border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error' );
    
    const errors = document.querySelectorAll( '.error' );
    if( errors.length === 0 ) { form.appendChild( errorMessage ); }
}

// This function removes the error message
const removeErrorMessage = () => {
    const error = document.querySelector( 'p.error' );
    if( error ) { error.remove(); }
}

// This function validates the form fields
const validateFields = formField => {
    if( formField.value.length > 0 ) {
        removeErrorMessage();
        correctInput( formField );
    } else {
        showError( 'Todos los campos son obligatorios' );
        incorrectInput( formField );
    }
}

// This function validates the email
const validateEmail = formField => {
    if( formField.type === 'email' ) {
        if( er.test( formField.value ) ) {
            removeErrorMessage();
            correctInput( formField );
        } else {
            showError( 'Email no valido' );
            incorrectInput( formField );
        }
    }
};

// This function shows the feedback
const showFeedback = () => {
    const spinner  = document.querySelector( '#spinner' );
    spinner.style.display = 'flex';

    setTimeout( () => {
        spinner.style.display = 'none';
        
        const paragraph       = document.createElement( 'p' );
        paragraph.textContent = 'El mensaje se envio correctamente';
        paragraph.classList.add( 'text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase' );
        form.insertBefore( paragraph, spinner );

        setTimeout( () => {
            paragraph.remove();
            resetForm( inputs );
        }, 5000 );
    },3000 );
}

// This function validates the form
const validateForm = event => {
    const formField = event.target;
    
    validateFields( formField );

    validateEmail( formField );

    // Validate that everything is validated
    const validated = ( er.test( email.value ) && subjet.value !== '' && message.value !== '' );
    validated ? activateButton( submitButton ) : disableButton( submitButton );
}

// This function sends the email
const sendEmail = event => {
    event.preventDefault();

    disableButton( submitButton );
    disableButton( resetButton );

    showFeedback();
}

// This functions cleans the form
const restoreForm = event => {
    event.preventDefault();
    resetForm( inputs );
}



/*EVENTS*/
export const startEventListeners = () => {    
    document.addEventListener( 'DOMContentLoaded', startApp );

    email.addEventListener( 'blur', validateForm );
    subjet.addEventListener( 'blur', validateForm );
    message.addEventListener( 'blur', validateForm );

    submitButton.addEventListener( 'click', sendEmail );
    resetButton.addEventListener( 'click', restoreForm );
}