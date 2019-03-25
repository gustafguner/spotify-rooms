import * as React from 'react';
import styled from 'styled-components';
import { Formik, Field } from 'formik';
import CoreModal from 'src/components/CoreModal';
import {
  Checkbox,
  ModalTextInput,
  TextInputValidationError,
  InputInformation,
  InputTitle,
  Toggle,
} from 'src/components/input';
import gql from 'graphql-tag';
import { Button } from 'src/components/buttons';
import { Mutation } from 'react-apollo';
import { ModalParagraph, ModalSubtitle } from 'src/components/text';
import { colors } from 'src/styles';
import { Svg, CoopIcon, DjIcon } from 'src/components/icons';
import { Spacing } from 'src/components/core';
import { withRouter } from 'react-router';

const CREATE_ROOM_MUTATION = gql`
  mutation createRoom($input: CreateRoomInput!) {
    createRoom(input: $input) {
      id
      name
    }
  }
`;

const Modal = styled(CoreModal)``;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: row;
`;

const CurveSvg = styled(Svg)`
  position: absolute;
  width: 195px;
  top: 0;
  right: -195px;
  bottom: 0;
  height: 100%;
  fill: ${colors.ALMOST_WHITE};
`;

const FormContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 340px;
  flex-shrink: 0;
  padding: 25px;
  height: 100%;
  background: ${colors.ALMOST_WHITE};
  position: relative;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: column;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 110px;
  padding-left: 25px;
  padding-right: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 56px;
  line-height: 56px;
  text-align: left;
`;

const Fields = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`;

const SubmitButton = styled(Button)`
  background: ${colors.GREEN};
`;

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
  match: any;
  location: any;
  history: any;
}

const CreateRoomModal: React.SFC<Props> = ({ isOpen, close, history }) => {
  return (
    <Modal isOpen={isOpen} close={close} styles={modalStyles}>
      <Container>
        <FormContainer>
          <CurveSvg viewBox="0 0 300 768">
            <path d="M63.5,0H0v768h168.2C216.5,538.1,57,583.4,57,449c0-95,136-143.6,136-288C193,99.1,138.9,45.2,63.5,0z" />
          </CurveSvg>

          <ModalSubtitle>Create a room</ModalSubtitle>
          <Spacing height={10} />
          <ModalParagraph>Customize your room as you wish</ModalParagraph>
          <Spacing height={25} />

          <Mutation mutation={CREATE_ROOM_MUTATION}>
            {(mutate) => (
              <Formik
                initialValues={{
                  name: '',
                  mode: 'co-op',
                  private: false,
                }}
                validate={(values) => {
                  const errors: any = {};
                  if (!values.name) {
                    errors.name = 'Required';
                  } else if (values.name.length > 32) {
                    errors.name = 'Too many characters';
                  }
                  return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(true);
                  const res: any = await mutate({
                    variables: {
                      input: {
                        name: values.name,
                        mode: values.mode,
                        private: values.private,
                      },
                    },
                  });
                  console.log(res);

                  if (res.data.createRoom !== null) {
                    history.push(`/room/${res.data.createRoom.id}`);
                  }
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
                    <Fields>
                      <ModalTextInput
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        autoComplete="off"
                      />
                      {errors.name && touched.name && (
                        <TextInputValidationError>
                          {errors.name}
                        </TextInputValidationError>
                      )}

                      <Spacing height={25} />

                      <InputTitle>Mode</InputTitle>

                      <Toggle
                        name="mode"
                        selected={values.mode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fields={[
                          {
                            value: 'co-op',
                            label: 'Co-op',
                            id: 'coop-mode-choice',
                            icon: <CoopIcon width={28} height={28} />,
                          },
                          {
                            value: 'dj',
                            label: 'DJ',
                            id: 'dj-mode-choice',
                            icon: <DjIcon width={28} height={28} />,
                          },
                        ]}
                      />
                      {values.mode === 'co-op' ? (
                        <InputInformation>
                          You vote together on which tracks to play.
                        </InputInformation>
                      ) : (
                        <InputInformation>
                          You can all suggest tracks, but it's up to the DJ to
                          choose which ones to play.
                        </InputInformation>
                      )}

                      <Spacing height={35} />

                      <Checkbox
                        name="private"
                        checked={values.private}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="Private"
                      />

                      <InputInformation>
                        A private room can only be accessed through a link.
                      </InputInformation>
                    </Fields>

                    <div>
                      <SubmitButton type="submit" disabled={isSubmitting}>
                        Create
                      </SubmitButton>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </Mutation>
        </FormContainer>

        <TitleContainer>
          <Title>It’s better together</Title>
        </TitleContainer>
      </Container>
    </Modal>
  );
};

export default withRouter(CreateRoomModal);
