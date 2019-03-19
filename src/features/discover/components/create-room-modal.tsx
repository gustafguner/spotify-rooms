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
import { Svg } from 'src/components/icons';

const CREATE_ROOM_MUTATION = gql`
  mutation createRoom($input: CreateRoomInput!) {
    createRoom(input: $input)
  }
`;

const Modal = styled(CoreModal)({});

const Container = styled('div')({
  display: 'flex',
  width: '100%',
  height: '100%',
  flexFlow: 'row',
});

const CurveSvg = styled(Svg)({
  position: 'absolute',
  width: 195,
  top: 0,
  right: -195,
  bottom: 0,
  height: '100%',
});

const FormContainer = styled('div')({
  width: 340,
  flexShrink: 0,
  padding: 25,
  height: '100%',
  background: colors.WHITE,
  position: 'relative',
});

const TitleContainer = styled('div')({
  width: '100%',
  height: '100%',
  marginLeft: 125,
  paddingLeft: 25,
  paddingRight: 25,
  display: 'flex',
  alignItems: 'center',
});

const modalStyles = {
  modal: {
    padding: 0,
    height: 500,
    background: 'linear-gradient(#009FAE, #1ED760)',
  },
};

interface Props {
  isOpen: boolean;
  close: () => void;
}

const CreateRoomModal: React.SFC<Props> = ({ isOpen, close }) => {
  return (
    <Modal isOpen={isOpen} close={close} styles={modalStyles}>
      <Container>
        <FormContainer>
          <CurveSvg viewBox="0 0 300 768">
            <path d="M63.5,0H0v768h168.2C216.5,538.1,57,583.4,57,449c0-95,136-143.6,136-288C193,99.1,138.9,45.2,63.5,0z" />
          </CurveSvg>
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
        </FormContainer>

        <TitleContainer>
          <h2>Create a room</h2>
        </TitleContainer>
      </Container>
    </Modal>
  );
};

export default CreateRoomModal;
