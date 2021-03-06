import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form, useField, useFormikContext } from "formik";
import "./styles.css";

async function fetchNewTextC(a, b) {
  await new Promise((r) => setTimeout(r, 500));
  return `textA: ${a}, textB: ${b}`;
}

const MyField = (props) => {
  const {
    values: { textA, textB },
    setFieldValue
  } = useFormikContext();
  const [field, meta] = useField(props);

  React.useEffect(() => {
    let isCurrent = true;
    // your business logic around when to fetch goes here.
    if (textA.trim() !== "" && textB.trim() !== "") {
      fetchNewTextC(textA, textB).then((textC) => {
        if (!!isCurrent) {
          // prevent setting old values
          setFieldValue(props.name, textC);
        }
      });
    }
    return () => {
      isCurrent = false;
    };
  }, [textB, textA, setFieldValue, props.name]);

  return (
    <>
      <input {...props} {...field} />
      {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
    </>
  );
};
function App() {
  const initialValues = { textA: "", textB: "", textC: "" };

  return (
    <div className="App">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => alert(JSON.stringify(values, null, 2))}
      >
        <div className="section">
          <h1>Dependent Formik fields with Async Request</h1>
          <p style={{ color: "#555" }}>
            This is an example of a complex dependent field in Formik v2. In
            this example, textC's value is set by making an async API request
            based on the current values of fields textA and textB.
          </p>
          <div>
            <small>
              <em>
                Instructions: enter values for textA, and textB, and then watch
                textC
              </em>
            </small>
          </div>
          <Form>
            <label>
              textA
              <Field name="textA" />
            </label><p></p>
            <label>
              textB
              <Field name="textB" />
            </label><p></p>
            <label>
              textC
              <MyField name="textC" />
              <small>
                (the result of <code>fetchNewTextC(textA, textB))</code>
              </small>
            </label><p></p>
            <button type="submit">Submit</button>
          </Form>
        </div>
      </Formik>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

/*
import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form } from 'formik';

const Basic = () => (
  <div>
    <h1>Sign Up</h1>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <label htmlFor="firstName">First Name</label>
        <Field id="firstName" name="firstName" placeholder="Jane" />

        <label htmlFor="lastName">Last Name</label>
        <Field id="lastName" name="lastName" placeholder="Doe" />

        <label htmlFor="email">Email</label>
        <Field
          id="email"
          name="email"
          placeholder="jane@acme.com"
          type="email"
        />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
);

ReactDOM.render(<Basic />, document.getElementById('root'));
*/
