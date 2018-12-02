import { Svg } from 'src/components/icons/Svg';
import styled from 'react-emotion';
import { colors } from 'src/styles/colors';

const ActionIcon = styled(Svg)({
  fill: colors.PLAYBACK_UNHOVERED,
  width: 20,
  height: 20,
  ':hover': {
    fill: colors.WHITE,
  },
});

export default ActionIcon;
