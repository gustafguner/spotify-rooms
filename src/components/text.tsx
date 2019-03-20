import { colors } from 'src/styles';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 52px;
  line-height: 56px;
  color: ${colors.WHITE};
`;

const ModalTitle = styled(Title)`
  color: ${colors.BLACK};
`;

const Subtitle = styled.h2`
  font-size: 28px;
  line-height: 32px;
  color: ${colors.WHITE};
`;

const ModalSubtitle = styled(Subtitle)`
  color: ${colors.PRIMARY_GRAY};
  font-weight: 500;
`;

const Paragraph = styled.p`
  font-size: 18px;
  line-height: 22px;
  font-weight: 400;
`;

const ModalParagraph = styled(Paragraph)`
  color: ${colors.GRAY};
`;

export {
  Title,
  ModalTitle,
  Subtitle,
  ModalSubtitle,
  Paragraph,
  ModalParagraph,
};
