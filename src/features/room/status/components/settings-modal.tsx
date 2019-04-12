import * as React from 'react';
import styled from 'styled-components';
import { CoreModal } from 'src/components/CoreModal';
import {
  ModalTextInput,
  InputInformation,
  TextInputValidationError,
  InputTitle,
  Toggle,
  Checkbox,
} from 'src/components/input';
import { GreenButton } from 'src/components/buttons';
import { ModalTitle, ModalParagraph } from 'src/components/text';
import { Formik } from 'formik';
import { CoopIcon, DjIcon } from 'src/components/icons';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const UPDATE_MUTATION = gql`
  mutation updateRoom($input: UpdateRoomInput!) {
    updateRoom(input: $input)
  }
`;

const Modal = styled(CoreModal)``;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: column;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: column;
  justify-content: space-between;
`;

const FormRow = styled.div`
  height: 100%;
  margin-bottom: 25px;
`;

const Fields = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`;

const modalStyles = {
  modal: {
    width: 480,
    height: '100%',
    maxHeight: 500,
    overflowY: 'scroll',
  },
};

interface Props {
  isOpen: boolean;
  close: () => void;
  room: any;
}

const SettingsModal: React.FC<Props> = ({ isOpen, close, room }) => {
  return (
    <Modal isOpen={isOpen} close={close} styles={modalStyles}>
      <Container>
        <ModalTitle>Settings</ModalTitle>
        <ModalParagraph>Customize the room</ModalParagraph>

        <Formik
          initialValues={{
            ...room,
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
                  <InputTitle>Room name</InputTitle>
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

                <FormRow>
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
                </FormRow>
              </Fields>

              <Mutation mutation={UPDATE_MUTATION}>
                {(mutate) => (
                  <div>
                    <GreenButton
                      type="submit"
                      disabled={isSubmitting}
                      onClick={async () => {
                        const res: any = await mutate({
                          variables: {
                            input: {
                              id: room.id,
                              name: values.name,
                              mode: values.mode,
                              private: values.private,
                            },
                          },
                        });

                        if (res.data.updateRoom === true) {
                          close();
                        }
                      }}
                    >
                      Save
                    </GreenButton>
                  </div>
                )}
              </Mutation>
            </Form>
          )}
        </Formik>
      </Container>
    </Modal>
  );
};

export default SettingsModal;
