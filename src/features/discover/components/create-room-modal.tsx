import * as React from 'react';
import styled from 'react-emotion';
import { Formik } from 'formik';
import CoreModal from 'src/components/CoreModal';
import { ModalTextInput } from 'src/components/input';
import gql from 'graphql-tag';
import { Button } from 'src/components/buttons';
import { Mutation } from 'react-apollo';
import { ModalParagraph, ModalSubtitle } from 'src/components/text';
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
  fill: colors.ALMOST_WHITE,
});

const FormContainer = styled('div')({
  width: 340,
  flexShrink: 0,
  padding: 25,
  height: '100%',
  background: colors.ALMOST_WHITE,
  position: 'relative',
});

const Form = styled('form')({
  width: '100%',
  ModalTextInput: {
    marginBottom: 10,
  },
});

const TitleContainer = styled('div')({
  width: '100%',
  height: '100%',
  marginLeft: 110,
  paddingLeft: 25,
  paddingRight: 25,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
});

const Title = styled('h1')({
  fontSize: 56,
  lineHeight: '56px',
  textAlign: 'left',
});

const Headings = styled('div')({
  marginBottom: 20,
});

const FormTitle = styled(ModalSubtitle)({
  marginBottom: 10,
});

const TextInput = styled(ModalTextInput)({
  marginBottom: 20,
  ':last-child': {
    marginBottom: 0,
  },
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

          <Headings>
            <FormTitle>Create a room</FormTitle>
            <ModalParagraph>Customize your room as you wish</ModalParagraph>
          </Headings>

          <Formik
            initialValues={{ name: '', description: '' }}
            validate={(values) => {
              const errors: any = {};
              if (!values.name) {
                errors.name = 'Required';
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
            }) => (
              <Form onSubmit={handleSubmit}>
                <TextInput
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  autoComplete="off"
                />
                {errors.name && touched.name && errors.name}
                <TextInput
                  type="text"
                  name="description"
                  placeholder="Description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  autoComplete="off"
                />
                {errors.description &&
                  touched.description &&
                  errors.description}
                <Button type="submit" disabled={isSubmitting}>
                  Create
                </Button>
              </Form>
            )}
          </Formik>
          {/*
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
                */}
        </FormContainer>

        <TitleContainer>
          <Title>It’s better together</Title>
        </TitleContainer>
      </Container>
    </Modal>
  );
};

export default CreateRoomModal;
