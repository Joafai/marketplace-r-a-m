import {
  Button,
  Container,
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useNotification } from "../../context/notification.context";
import { LoginValidate } from "../../utils/validateForm";

type LoginType = {
  username: string;
  password: string;
};

const LoginPage: React.FC<{}> = () => {
  const { getSuccess, getError } = useNotification();
  const formik = useFormik<LoginType>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginValidate,
    onSubmit: (values: LoginType) => {
      getSuccess(JSON.stringify(values));
    },
  });

  return (
    <Container sx={{ mt: 9 }} maxWidth="sm">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
            <Typography variant="h4">Iniciar Sesion</Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
              <TextField
                name="username"
                type="text"
                margin="normal"
                sx={{ mt: 2, mb: 1.5 }}
                fullWidth
                label="Email"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                name="password"
                type="password"
                margin="normal"
                sx={{ mt: 1.5, mb: 1.5 }}
                fullWidth
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />

              <Button variant="contained" fullWidth type="submit">
                Iniciar sesion
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;