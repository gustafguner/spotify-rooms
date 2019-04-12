import { colors } from 'src/styles';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 52px;
  line-height: 56px;
  color: ${colors.WHITE};
`;

const ModalTitle = styled.h1`
  font-size: 28px;
  line-height: 32px;
  font-weight: 500;
  color: ${colors.PRIMARY_GRAY};
  margin-bottom: 10px;
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

const ModalHeadline = styled.span`
  font-size: 52px;
  line-height: 56px;
  color: ${colors.WHITE};
  font-weight: 600;
`;

const ModalParagraph = styled(Paragraph)`
  color: ${colors.GRAY};
  margin-bottom: 25px;
`;

export {
  Title,
  ModalTitle,
  Subtitle,
  ModalSubtitle,
  Paragraph,
  ModalParagraph,
  ModalHeadline,
};
