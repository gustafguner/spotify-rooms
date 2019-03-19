import { colors } from 'src/styles';
import styled from 'react-emotion';

const Title = styled('h1')({
  fontSize: 52,
  lineHeight: '56px',
  color: colors.WHITE,
});

const ModalTitle = styled(Title)({
  color: colors.BLACK,
});

const Subtitle = styled('h2')({
  fontSize: 28,
  lineHeight: '32px',
  color: colors.WHITE,
});

const ModalSubtitle = styled(Subtitle)({
  color: colors.PRIMARY_GRAY,
  fontWeight: 500,
});

const Paragraph = styled('p')({
  fontSize: 18,
  lineHeight: '22px',
  fontWeight: 400,
});

const ModalParagraph = styled(Paragraph)({
  color: colors.GRAY,
});

export {
  Title,
  ModalTitle,
  Subtitle,
  ModalSubtitle,
  Paragraph,
  ModalParagraph,
};
