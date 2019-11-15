import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import styled from "styled-components"
import axios from "axios";
import * as Yup from "yup";


const Container = styled('div')`
background-color: lightgray;
width:30%;
margin: 150px auto;
padding-top: 50px;
padding-bottom: 50px;
`

const Hl = styled('p')`
color: white;
`

const Title = styled('div')`


`







const NewUser = ({ values, errors, touched, status }) => {

    const [user, setUser] = useState([]);

  
    useEffect(() => {
        status && setUser (user => [...user, status]);
      }, [status]);

    return (
        <div>

            <Form>
                <Container>
                    <Title>
                        <h1>Sign Up Now!</h1>
                    </Title>
                    <div>
                        <Hl>Enter Name : </Hl>
                        <Field type="text" name="name" placeholder="enter name" />
                        {touched.name && errors.name && (<p className="error">{errors.name}</p>)}
                    </div>
                    <div>
                        <Hl>Enter Email : </Hl>
                        <Field type="email" name="email" placeholder="enter email" />
                        {touched.email && errors.email && (<p className="error">{errors.email}</p>)}
                    </div>
                    <div>
                        <Hl>Enter Password : </Hl>
                        <Field type="password" name="password" placeholder="enter password" />
                        {touched.password && errors.password && (<p className="error">{errors.password}</p>)}
                    </div>
                    <Hl>Agree to Terms of Services : <Field type="checkbox" name="terms" checked={values.terms} /></Hl>
                    {touched.terms && errors.terms && (<p className="error">{errors.terms}</p>)}
                    <button>Submit</button>
                </Container>
            </Form>
            

            {user.map(user => (
                <div>
                    <p>Thank you {user.name} confirmation sent to {user.email}</p>
                </div>
            ))}
        </div>

    )
}
const FormikNewUser = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },


    validationSchema: Yup.object().shape({
        name: Yup.string().min(2, "* must have at least 2 characters").required("*Required"),
        email: Yup.string().email("* Email not valid").required("*Required"),
        password: Yup.string().min(8, "* must have at least 8 characters").required("*Required"),
        terms: Yup.boolean().oneOf([true], "* Must accept Terms of Service").required()
    }),

    handleSubmit(values, { setStatus }) {
        axios
            .post("https://reqres.in/api/users/", values)
            .then(response => {
                console.log(response);
                setStatus(response.data);
            })
            .catch(error => console.log(error.response));
    }
})(NewUser)




export default FormikNewUser;  