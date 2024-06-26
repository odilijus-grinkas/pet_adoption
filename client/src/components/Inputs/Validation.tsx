interface FormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  pet_name: string;
  description: string;
}
interface post {
  pet_name: string;
  description: string;
  city_id: number;
  species_id: number;
}

interface Errors {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  pet_name?: string;
  description?: string;
  city_id?: string;
  species_id?: string;
}

export const ValidationEdit = (post: post): Errors => {
  const errors: Errors = {};

  if (!post.pet_name) {
    errors.pet_name = "Reikalingas gyvūno vardas";
  } else if (post.pet_name.length < 3) {
    errors.pet_name = "Gyvūno vardas negali būti trumpesnis už 3 simbolius";
  } else if (post.pet_name.length > 30) {
    errors.pet_name = "Gyvūno vardas negali būti ilgesnis už 30 simbolių";
  }

  if (!post.description) {
    errors.description = "Reikalingas Skelbimo aprašymas";
  }
  return errors;
};

export const ValidationCreate = (Post: Post): Errors => {
  const errors: Errors = {};

  if (!Post.pet_name) {
    errors.pet_name = "Reikalingas gyvūno vardas";
  } else if (Post.pet_name.length < 3) {
    errors.pet_name = "Gyvūno vardas negali būti trumpesnis už 3 simbolius";
  } else if (Post.pet_name.length > 30) {
    errors.pet_name = "Gyvūno vardas negali būti ilgesnis už 30 simbolių";
  }

  if (!Post.description) {
    errors.description = "Reikalingas Skelbimo aprašymas";
  }

  if (!Post.city_id) {
    errors.city_id = "Reikalingas miesto pasirinkimas";
  }

  if (!Post.species_id) {
    errors.species_id = "Reikalingas gyvūno rūšies pasirinkimas";
  }
  return errors;
};

export const ValidationRecovery = (formData: FormData): Errors => {
  const errors: Errors = {};

  if (!formData.email) {
    errors.email = "Reikalingas el. paštas";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Neteisingas El. Pašto formatas.";
  }
  return errors;
};

export const ValidationRegister = (formData: FormData): Errors => {
  const errors: Errors = {};

  if (!formData.email) {
    errors.email = "Reikalingas El. Paštas.";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Neteisingas El. Pašto formatas.";
  }

  if (!formData.username) {
    errors.username = "Reikalingas Vartotojo Vardas.";
  } else if (/\s/.test(formData.username)) {
    errors.username = "Vartotojo Vardas negali turėti tarpų.";
  }

  if (!formData.password) {
    errors.password = "Reikalingas Slaptažodis.";
  } else if (formData.password.length < 8) {
    errors.password = "Slaptažodis turi turėti bent 8 simbolius.";
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = "Reikia patvirtinti Slaptažodį.";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Slaptažodžiai nesutampa.";
  }

  return errors;
};

export const ValidationPasswordReset = (formData: FormData): Errors => {
  const errors: Errors = {};
  if (!formData.password) {
    errors.password = "Reikalingas Slaptažodis.";
  } else if (formData.password.length < 8) {
    errors.password = "Slaptažodis turi turėti bent 8 simbolius.";
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = "Reikia patvirtinti Slaptažodį.";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Slaptažodžiai nesutampa.";
  }
  return errors;
};

interface FormDataLogin {
  username: string;
  password: string;
}

interface ErrorsLogin {
  username?: string;
  password?: string;
}
export const ValidationLogin = (formData: FormDataLogin): ErrorsLogin => {
  const errors: ErrorsLogin = {};

  if (!formData.username) {
    errors.username = "Reikalingas Vartotojo Vardas.";
  } else if (/\s/.test(formData.username)) {
    errors.username = "Vartotojo Vardas negali turėti tarpų.";
  }

  if (!formData.password) {
    errors.password = "Reikalingas Slaptažodis.";
  }
  // } else if (formData.password.length < 8) {
  //   errors.password = "Slaptažodis turi turėti bent 8 simbolius.";
  // }

  return errors;
};
