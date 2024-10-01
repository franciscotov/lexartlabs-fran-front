import { useFormik } from "formik";
import { Button, Grid, TextField } from "@mui/material";
import { ProductDto } from "@/lib/definitions";
import { initialValuesProductForm } from "../../lib/inital";

interface BasicUserFormProps {
  submitHandler: (values: typeof initialValuesProductForm) => void;
  buttonText: string;
  secondButtonText?: string;
  redirectTo?: () => void;
}

const ProductForm = ({
  submitHandler,
  buttonText,
  secondButtonText,
  redirectTo,
}: BasicUserFormProps) => {
  const validate = (values: typeof initialValuesProductForm) => {
    const errors = {} as ProductDto;

    const { name, brand, model } = values;
    if (!name) errors.name = "Name is required.";
    if (name.length < 3) errors.name = "Name is too short.";
    if (name.length > 20) errors.name = "Username is too long.";
    if (!brand) errors.brand = "Brand is required.";
    if (brand.length < 3) errors.brand = "Brand is too short.";
    if (brand.length > 20) errors.brand = "Brand is too long.";
    if (!model) errors.model = "Model is required.";
    if (model.length < 3) errors.model = "Model is too short.";
    if (model.length > 20) errors.model = "Model is too long.";

    return errors;
  };
  const formik = useFormik({
    initialValues: initialValuesProductForm,
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
              id="name"
              name="name"
              label="Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              id="brand"
              name="brand"
              label="Brand"
              // type="password"
              value={values.brand}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.brand && Boolean(errors.brand)}
              helperText={touched.brand && errors.brand}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              id="model"
              name="model"
              label="Model"
              // type="password"
              value={values.model}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.model && Boolean(errors.model)}
              helperText={touched.model && errors.model}
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

export default ProductForm;
