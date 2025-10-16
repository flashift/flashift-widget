import Grid from "@mui/material/Grid";
import { wrapperCard } from "./card.style";
import type { FC } from "react";

interface IProps {
  children: React.ReactNode;
}

const CustomCard: FC<IProps> = ({ children }) => {
  return (
    <Grid
      sx={{
        ...wrapperCard,
        background: (theme) => theme?.palette?.secondary?.main,
      }}
    >
      {children}
    </Grid>
  );
};

export default CustomCard;
