import * as Yup from "yup";

export const errorSchema = {
  loginSchema: Yup.object().shape({
    email_id: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Required"),
  }),
  registerSchema: Yup.object().shape({
    userName: Yup.string().required("Required"),
    email_id: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Required"),
  }),
};
