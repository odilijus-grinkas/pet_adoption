type FormValues = {
  userName: string;
  email: string;
  password: string;
  repeatPassword: string;
};

type ValidationResult<T> = {
  values: T;
  errors: Record<keyof T, { type: string; message: string }>;
};

const Validation: (values: FormValues) => Promise<ValidationResult<FormValues>> = async (values) => {
  const errors: Record<keyof FormValues, { type: string; message: string }> = {
    userName: { type: '', message: '' },
    email: { type: '', message: '' },
    password: { type: '', message: '' },
    repeatPassword: { type: '', message: '' },
  };

  // Tikrina ar userName Tuščias
  if (!values.userName) {
    errors.userName = {
      type: "required",
      message: "Prašau pateikti Vartotojo Vardą.",
    };
  } else if (values.userName.includes(' ')) {
    errors.userName = {
      type: "format",
      message: "Vartotojo vardas negali turėti tarpų.",
    };
  } else if (values.userName.length > 20) {
    errors.userName = {
      type: "format",
      message: "Per daug simboliu Maksimalus kiekis 20.",
    };
  }

  // Tikrina paštą ar tučias ir ar teisingos formos
  if (!values.email) {
    errors.email = {
      type: "required",
      message: "Prašau pateikti El. Paštą.",
    };
  } else if (values.email.includes(' ')) {
    errors.email = {
      type: "format",
      message: "El. Paštas negali turėti tarpų.",
    };
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = {
      type: "format",
      message: "Netinkamas Formatas El. Pašto.",
    };
  }

  // Tikrina ar slaptažodis tučias
  if (!values.password) {
    errors.password = {
      type: "required",
      message: "Prašau pateikti Slaptažodį.",
    };
  } else if (values.password.includes(' ')) {
      errors.password = {
        type: "format",
        message: "Slaptažodis negali turėti tarpų.",
      };
  } else if (values.password.length < 8) {
    errors.password = {
      type: "format",
      message: "Slaptažodis turi turėti bent jau 8 simbolius.",
    };
  }
  

  // Tikrina ar slaptažodis sutampa
  if (values.password !== values.repeatPassword) {
    errors.repeatPassword = {
      type: "mismatch",
      message: "Slaptažodžiai nesutampa.",
    };
  }

  return {
    values,
    errors,
  };
};

export default Validation;
