import * as React from 'react';
import styled from 'react-emotion';
import { Formik } from 'formik';
import CoreModal from 'src/components/CoreModal';
import { TextInputModal } from 'src/components/input';
import gql from 'graphql-tag';
import { Button } from 'src/components/buttons';
import { Mutation } from 'react-apollo';
import { SubTitle } from 'src/components/text';
import { colors } from 'src/styles';

const CREATE_ROOM_MUTATION = gql`
  mutation createRoom($input: CreateRoomInput!) {
    createRoom(input: $input)
  }
`;

const Modal = styled(CoreModal)({
  backgroundColor: colors.WHITE,
});

interface Props {
  isOpen: boolean;
  close: () => void;
}

const CreateRoomModal: React.SFC<Props> = ({ isOpen, close }) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <SubTitle>Create room</SubTitle>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors: any = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <TextInputModal
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <TextInputModal
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
      <Mutation mutation={CREATE_ROOM_MUTATION}>
        {(mutate) => (
          <>
            <Button
              onClick={() => {
                mutate({
                  variables: {
                    input: {
                      name: 'Test',
                    },
                  },
                });
              }}
            >
              Create
            </Button>
          </>
        )}
      </Mutation>
    </Modal>
  );
};

export default CreateRoomModal;
