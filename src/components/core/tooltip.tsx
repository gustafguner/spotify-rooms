import * as React from 'react';
import * as ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { colors } from 'src/styles';

interface Props extends ReactTooltip.Props {
  id: string;
}

const CustomTooltip = styled(ReactTooltip)`
  background: ${colors.PRIMARY_GRAY} !important;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  padding: 5px 12px !important;
  font-size: 12px !important;
  color: ${colors.ALMOST_WHITE} !important;
  &.show {
    opacity: 1 !important;
  }
  &:before {
    border-color: ${colors.PRIMARY_GRAY} !important;
  }
`;

const Tooltip: React.FC<Props> = ({ id, children, ...tooltipProps }) => (
  <CustomTooltip
    id={id}
    effect="solid"
    place="bottom"
    type="dark"
    {...tooltipProps}
  >
    {children}
  </CustomTooltip>
);

export default Tooltip;
