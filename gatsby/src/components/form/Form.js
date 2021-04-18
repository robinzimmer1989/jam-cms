import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useForm } from 'react-hook-form';
import axios from 'axios';

// import app components
import Edges from '../Edges';

const Form = (props) => {
  const { formid } = props;

  const [success, setSuccess] = useState(false);

  // const forms = useFormQuery();
  // const form = forms.find((o) => o.formId === formid);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const endpoint =
      process.env.GATSBY_JAM_CMS_URL + '/wp-json/gf/v2/forms/' + formid + '/submissions';

    axios
      .post(endpoint, data)
      .then((response) => {
        if (response?.data?.is_valid) {
          setSuccess(true);
        }
      })
      .catch((response) => {
        console.log(response);
      });
  };

  return (
    <Container>
      <Edges size="xs">
        {success ? (
          <Success>Thanks! I'll get back to you as soon as possible!</Success>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input name="input_1" {...register('input_1')} placeholder="Name" required />
            <Input
              name="input_2"
              {...register('input_2')}
              type="email"
              placeholder="Email"
              required
            />
            <Textarea
              name="input_3"
              {...register('input_3')}
              rows={4}
              placeholder="Message"
              required
            />

            <Button children="Submit" />
          </form>
        )}
      </Edges>
    </Container>
  );
};

const Container = styled.div`
  padding: 40px 0 60px;
`;

const textfield = css`
  width: 100%;
  margin-bottom: 20px;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: #fff;
`;

const Input = styled.input`
  ${textfield}
`;

const Textarea = styled.textarea`
  ${textfield}
`;

const Button = styled.button`
  display: inline-block;
  padding: 8px 20px;
  text-decoration: none;
  border-radius: 5px;
  min-width: 160px;
  text-align: center;
  transition: ease-in-out 0.2s all;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primarycontrast};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  cursor: pointer;

  &:hover {
    background: rgb(2 14 53 / 0.8);
    color: ${({ theme }) => theme.colors.primarycontrast};
  }
`;

const Success = styled.div`
  z-index: 1;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  padding: 25px;
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.primarycontrast};
  text-align: center;
`;

// const useFormQuery = () => {
//   const {
//     wpGravityFormsForm: { nodes: forms },
//   } = useStaticQuery(
//     graphql`
//       query {
//         allWpGravityFormsForm {
//           nodes {
//             formId
//             title
//             formFields {
//               nodes {
//                 ... on WpTextField {
//                   id
//                 }
//                 ... on WpEmailField {
//                   id
//                 }
//                 ... on WpTextAreaField {
//                   id
//                 }
//               }
//             }
//           }
//         }
//       }
//     `
//   );
//   return forms;
// };

export default Form;
