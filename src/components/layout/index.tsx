"use client";

import Grid from "@mui/material/Grid";
import type { FC } from "react";

interface IProps {
  children: React.ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <Grid>
      <Grid>{children}</Grid>
    </Grid>
  );
};

export default Layout;
