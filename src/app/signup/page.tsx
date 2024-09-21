"use client";
import React from "react";
// import Password from "@/components/atom/Input/password";
// import MaterialButton from "@/components/atom/Buttons";
// import { Grid } from "@mui/material";
// import { useForm } from "react-hook-form";
import { containerLoginStyles, containerStyles } from "./contants";
import ViewModel from "./ViewModel";
import { formConst } from "@/constants";
import i18n from "@/i18n/i18n-es.json";
// import Text from "@/components/atom/Input/text";

const SignUp = () => {
  // const {
  //   control,
  //   handleSubmit,
  //   formState: { isLoading },
  // } = useForm();
  const { signup: signupUser } = ViewModel();
  const { signup } = formConst;
  return (
    <>
      <div style={containerStyles}>
        <div style={containerLoginStyles}>
          Login
          {/* <Grid container spacing={4}>
            <Text
              id={signup.username}
              label={i18n.username}
              required={true}
              fullWidth={true}
              control={control}
              validations={{
                length: { min: 10, max: 50 },
              }}
            />
            <Grid item xs={12} md={12}>
              <Password
                id={signup.password}
                label={i18n.passwordLabel}
                control={control}
                required={true}
                fullWidth={true}
                readOnly={false}
                helperText={i18n.passwordHelperText}
                validations={{
                  length: { min: 6, max: 20 },
                }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <MaterialButton
                color="primary"
                text={i18n.createUser}
                onClick={handleSubmit(signupUser)}
                disabled={isLoading}
              />
            </Grid>
          </Grid> */}
        </div>
        {/* <AlertComponent /> */}
      </div>
    </>
  );
};

export default SignUp;
