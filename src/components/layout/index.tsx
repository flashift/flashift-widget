"use client";

import Grid from "@mui/material/Grid";
import { wrapperMain } from "./layout.style";
import type { FC } from "react";

interface IProps {
  children: React.ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <Grid sx={wrapperMain}>
      <Grid>{children}</Grid>
    </Grid>
  );
};

export default Layout;
