export function validate(input) {
    const inputType = input.getAttribute('data-tipo');

    const validator = validators[inputType];
    if (validator) {
      validator(input);
    }

    const parent = input.parentElement;
    const errorMessageContainer = parent.querySelector('.input-mensagem-erro');
    if (input.validity.valid) {
      parent.classList.remove('input-container--invalido');
      errorMessageContainer.innerHTML = '';
    } else {
      parent.classList.add('input-container--invalido');
      errorMessageContainer.innerHTML = showErrorMessage(inputType, input);
    }
  }

const errorType = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const errorMessage = {
    name: {
      valueMissing: 'Por favor, preencha seu nome.',
    },
    email: {
      valueMissing: 'Por favor, preencha seu email.',
      typeMismatch: 'Por favor, digite um email válido.',
    },
    password: {
      valueMissing: 'Por favor, preencha sua senha.',
      patternMismatch: 'A senha deve ter entre 6 e 12 caracteres, conter pelo menos uma letra maiúscula e um número, e não deve ter símbolos.',
    },
    dateOfBirth: {
      valueMissing: 'Por favor, preencha sua data de nascimento.',
      customError: 'Você deve ter mais de 18 anos para se cadastrar.',
    },
    cpf: {
      valueMissing: 'Por favor, preencha seu CPF.',
      customError: 'Por favor, digite um CPF válido.',
    },
    cep: {
      valueMissing: 'Por favor, preencha seu CEP.',
      patternMismatch: 'Por favor, digite um CEP válido.',
      customError: 'Não foi possível encontrar o CEP informado.',
    },
    street: {
      valueMissing: 'Por favor, preencha seu endereço.',
    },
    city: {
      valueMissing: 'Por favor, preencha sua cidade.',
    },
    state: {
      valueMissing: 'Por favor, preencha seu estado.',
    },
    price: {
      valueMissing: 'Por favor, preencha o preço.',
    },
  };

const validators = {
    dateOfBirth:input => validateDateOfBirth(input),
    cpf:input => validateCPF(input),
    cep:input => getCEP(input)
}

function showErrorMessage(inputType, input) {
    let message = ''
    errorType.forEach(error => {
        if(input.validity[error]) {
            message = errorMessage[inputType][error]
        }
    })

    return message
}

function validateDateOfBirth(input) {
    const receivedDate = new Date(input.value)
    let message = ''

    if(!overEighteen(receivedDate)) {
        message = 'Você deve ser maior que 18 anos para se cadastrar.'
    }

    input.setCustomValidity(message)
}

function overEighteen(date) {
    const currentDate = new Date()
    const dateOverEighteen = new Date(date.getUTCFullYear() + 18, date.getUTCMonth(), date.getUTCDate())

    return dateOverEighteen <= currentDate
}

function validateCPF(input) {
    const formattedCpf = input.value.replace(/\D/g, '')
    let message = ''

    if(!checkRepeatedCpf(formattedCpf) || !checkCpfStructure(formattedCpf)) {
        message = 'O CPF digitado não é válido.'
    }

    input.setCustomValidity(message)
}

function checkRepeatedCpf(cpf) {
    const repeatedValues = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    let validCpf = true

    repeatedValues.forEach(val => {
        if(val == cpf) {
            validCpf = false
        }
    })

    return validCpf
}

function checkCpfStructure(cpf) {
    const multiplier = 10

    return checkVerifierDigit(cpf, multiplier)
}

function checkVerifierDigit(cpf, multiplier) {
    if(multiplier >= 12) {
        return true
    }

    let initialMultiplier = multiplier
    let sum = 0
    const noDigitsCpf = cpf.substr(0, multiplier - 1).split('')
    const verifierDigit = cpf.charAt(multiplier - 1)
    for(let counter = 0; initialMultiplier > 1 ; initialMultiplier--) {
        sum = sum + noDigitsCpf[counter] * initialMultiplier
        counter++
    }

    if(verifierDigit == confirmDigit(sum)) {
        return checkVerifierDigit(cpf, multiplier + 1)
    }

    return false
}

function confirmDigit(sum) {
    return 11 - (sum % 11)
}

function getCEP(input) {
    const cep = input.value.replace(/\D/g, '')
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        }
    }

    if(!input.validity.patternMismatch && !input.validity.valueMissing) {
        fetch(url,options).then(
            response => response.json()
        ).then(
            data => {
                if(data.erro) {
                    input.setCustomValidity('Não foi possível buscar o CEP.')
                    return
                }
                input.setCustomValidity('')
                fillFieldsWithCEP(data)
                return
            }
        )
    }
}

function fillFieldsWithCEP(data) {
    const street = document.querySelector('[data-tipo="street"]')
    const city = document.querySelector('[data-tipo="city"]')
    const state = document.querySelector('[data-tipo="state"]')

    street.value = data.logradouro
    city.value = data.localidade
    state.value = data.uf
}
