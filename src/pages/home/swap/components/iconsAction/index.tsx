import { IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";

import { wrapperIcons } from "../../swap.style";
import type { FC } from "react";

interface IProps {
  setSwitch: (arg0: number) => void;
}

const IconsAction: FC<IProps> = ({ setSwitch }) => {
  const handleClick = () => {
    setSwitch(3);
  };

  return (
    <Grid sx={wrapperIcons}>
      {/* <IconButton>
        <img src="./assets/images/swap/wallet.svg" alt="flashift" />
      </IconButton>
      <IconButton>
        <img src="./assets/images/swap/settings.svg" alt="flashift" />
      </IconButton> */}
      <IconButton onClick={handleClick}>
        <img src="./assets/images/swap/history.svg" alt="flashift" />
      </IconButton>
    </Grid>
  );
};
export default IconsAction;
