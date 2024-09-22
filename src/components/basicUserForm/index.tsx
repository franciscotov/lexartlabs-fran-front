"use client";
import { useFormik } from "formik";
import { Button, Grid, TextField } from "@mui/material";

type ValidationErrorType = {
  username?: string;
  password?: string;
};

const initialFormValues = {
  username: "",
  password: "",
};

interface BasicUserFormProps {
  submitHandler: (values: typeof initialFormValues) => void;
  buttonText: string;
  secondButtonText?: string;
  redirectTo?: () => void;
}

const BasicUserForm = ({
  submitHandler,
  buttonText,
  secondButtonText,
  redirectTo,
}: BasicUserFormProps) => {
  const validate = (values: typeof initialFormValues) => {
    const errors: ValidationErrorType = {};

    const { username, password } = values;
    if (!username) errors.username = "Username is required.";
    if (username.length < 3) errors.username = "Username is too short.";
    if (username.length > 20) errors.username = "Username is too long.";
    if (!password) errors.password = "Password is required.";
    if (password.length < 8) errors.password = "Password is too short.";
    if (password.length > 20) errors.password = "Password is too long.";

    return errors;
  };
  const formik = useFormik({
    initialValues: initialFormValues,
    onSubmit: submitHandler,
    validateOnChange: true,
    validate: validate,
  });
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    formik;

  const handleRedirect = () => {
    redirectTo && redirectTo();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
          </Grid>
          <Grid item xs={12} md={12} top={"100px"}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              {buttonText}
            </Button>
          </Grid>
          {secondButtonText && (
            <Grid item xs={12} md={12} top={"100px"}>
              <Button
                color="primary"
                variant="outlined"
                fullWidth
                onClick={handleRedirect}
              >
                {secondButtonText}
              </Button>
            </Grid>
          )}
        </Grid>
      </form>
    </div>
  );
};

export default BasicUserForm;
