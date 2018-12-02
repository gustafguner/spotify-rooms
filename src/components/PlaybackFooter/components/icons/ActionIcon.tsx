import { Svg } from 'src/components/icons/Svg';
import styled from 'react-emotion';
import { colors } from 'src/styles/colors';

interface ActionIconProps {
  toggled?: boolean;
}

const ActionIcon = styled(Svg)(({ toggled = false }: ActionIconProps) => ({
  fill: toggled ? colors.SPOTIFY_GREEN : colors.PLAYBACK_UNHOVERED,
  width: 20,
  height: 20,
  ':hover': {
    fill: toggled ? colors.SPOTIFY_GREEN : colors.WHITE,
  },
}));

export default ActionIcon;
