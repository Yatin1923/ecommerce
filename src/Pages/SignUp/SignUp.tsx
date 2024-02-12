import * as React from "react";
import "./SignUp.css";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  Input,
  TextField,
  ThemeProvider,
  createTheme,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "../../Interceptor/interceptor";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { loadCartAsync } from "../../Redux/reducers";
import { useDispatch } from "react-redux";

export default function SignUp() {
  type FormValues = {
    name: string;
    email: string;
    password: string;
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "#000",
      },
    },
  });

  const handleHaveAccount = () => {
    form.reset();
    sethaveAccount(!haveAccount);
  };
  const dispatch = useDispatch<any>();
  React.useEffect(() => {
    if (localStorage.getItem("JWTToken")) {
      navigate("/");
    }
  }, []);
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [haveAccount, sethaveAccount] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const navigate = useNavigate();
  const onSubmit = (data: FormValues) => {
    setloading(true);
    if (haveAccount) {
      axios
        .post("User/Authenticate", {
          email: data.email,
          password: data.password,
        })
        .then((res) => {
          if (res.data) {
            localStorage.setItem("JWTToken", res.data.token);
             dispatch(loadCartAsync(res.data))
            navigate("/");
            toast.success("Login Successfully");
          } else {
            toast.error("Login Failed: Invalid Email or Password");
          }
        })
        .catch((error) => {
          setloading(false);
          toast.error("Error occured while Signing in");
        })
        .finally(() => {
          setloading(false);
        });
    } else {
      axios
        .post("User", {
          name: data.name,
          email: data.email,
          password: data.password,
        })
        .then((res) => {
          if (res.data) {
            navigate("/");
            localStorage.setItem("JWTToken", res.data);
            toast.success("Account created successfully", res.data);
          }
        })
        .catch((error) => {
          toast.error(error?.response?.data);
        })
        .finally(() => setloading(false));
    }
  };
  return (
    <div>
      <Grid container className="signup">
        <Grid item md={6} xs={12} className="signup-image-div">
          <h2>3legant</h2>
          <div className="signup-image"></div>
        </Grid>
        <Grid item md={6} xs={12} className="signup-form-container">
          {!haveAccount ? (
            <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
              <h2>Sign Up</h2>
              <span>
                Already have an account?{" "}
                <b className="signup-link" onClick={handleHaveAccount}>
                  Sign In
                </b>
              </span>
              <ThemeProvider theme={theme}>
                <TextField
                  {...register("name")}
                  error={!!errors.name}
                  helperText={!!errors.name?.message}
                  required
                  name="name"
                  type="text"
                  variant="standard"
                  label="Your name"
                  className="input-field"
                />
                <TextField
                  {...register("email")}
                  error={!!errors.email}
                  helperText={!!errors.email?.message}
                  required
                  name="email"
                  variant="standard"
                  label="Email Address"
                />
                <TextField
                  {...register("password")}
                  error={!!errors.password}
                  helperText={!!errors.password?.message}
                  required
                  name="password"
                  variant="standard"
                  type="password"
                  label="Password"
                  className="input-field"
                />
                <span>
                  <Checkbox required name="agreement"></Checkbox>I agree with{" "}
                  <b>Privacy Policy</b> and <b>Terms of use</b>
                </span>
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  className="signup-button"
                  type="submit"
                >
                  {" "}
                  Sign up
                </LoadingButton>
              </ThemeProvider>
            </form>
          ) : (
            <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
              <h2>Sign In</h2>
              <span>
                Don't have an account yet?{" "}
                <b className="signup-link" onClick={handleHaveAccount}>
                  Sign Up
                </b>
              </span>
              <ThemeProvider theme={theme}>
                <TextField
                  required
                  {...register("email")}
                  error={!!errors.email}
                  variant="standard"
                  label="Email"
                  className="input-field"
                />
                <TextField
                  required
                  {...register("password")}
                  error={!!errors.password}
                  variant="standard"
                  type="password"
                  label="Password"
                  className="input-field"
                />
                <span>
                  <Checkbox></Checkbox>Remember me
                </span>
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  className="signup-button"
                  type="submit"
                >
                  {" "}
                  Sign In
                </LoadingButton>
              </ThemeProvider>
            </form>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
