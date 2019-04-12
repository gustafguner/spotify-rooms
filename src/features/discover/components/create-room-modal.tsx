import * as React from 'react';
import styled from 'styled-components';
import { Formik, Field } from 'formik';
import { CoreModal } from 'src/components/CoreModal';
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
import {
  ModalParagraph,
  ModalSubtitle,
  ModalHeadline,
  ModalTitle,
} from 'src/components/text';
import { colors } from 'src/styles';
import { Svg, CoopIcon, DjIcon } from 'src/components/icons';
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

const FormRow = styled.div`
  margin-bottom: 25px;
  height: 100%;
`;

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

const CreateRoomModal: React.FC<Props> = ({ isOpen, close, history }) => {
  return (
    <Modal isOpen={isOpen} close={close} styles={modalStyles}>
      <Container>
        <FormContainer>
          <CurveSvg viewBox="0 0 300 768">
            <path d="M63.5,0H0v768h168.2C216.5,538.1,57,583.4,57,449c0-95,136-143.6,136-288C193,99.1,138.9,45.2,63.5,0z" />
          </CurveSvg>

          <ModalTitle>Create a room</ModalTitle>
          <ModalParagraph>Customize your room as you wish</ModalParagraph>

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
                      <FormRow>
                        <ModalTextInput
                          type="text"
                          name="name"
                          placeholder="Room name"
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
                      </FormRow>

                      <FormRow>
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
                              icon: <CoopIcon />,
                            },
                            {
                              value: 'dj',
                              label: 'DJ',
                              id: 'dj-mode-choice',
                              icon: <DjIcon />,
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
                      </FormRow>

                      <Checkbox
                        name="private"
                        checked={values.private}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="Private"
                      />
                      <FormRow>
                        <InputInformation>
                          A private room can only be accessed through a link.
                        </InputInformation>
                      </FormRow>
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
          <ModalHeadline>It’s better together</ModalHeadline>
        </TitleContainer>
      </Container>
    </Modal>
  );
};

export default withRouter(CreateRoomModal);
