import { Svg } from 'src/components/icons/Svg';
import styled from 'react-emotion';
import { colors } from 'src/styles/colors';

const PlaybackIcon = styled(Svg)({
  fill: colors.PLAYBACK_UNHOVERED,
  ':hover': {
    fill: colors.WHITE,
  },
});

export default PlaybackIcon;
