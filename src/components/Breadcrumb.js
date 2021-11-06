import { Link, Typography } from "@mui/material";
import React from "react";
import { Breadcrumbs } from "@mui/material";

import NavigateNext from "@mui/icons-material/NavigateNext";
import { withRouter } from "react-router";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  breadcrumb: {
    "& .MuiBreadcrumbs-li": {
      cursor: "pointer",
    },
  },
});
const Breadcrumb = (props) => {
  const {
    history,
    location: { pathname },
  } = props;

  const classes = useStyles();
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <>
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
        className={classes.breadcrumb}
      >
        <Link underline="none" onClick={() => history.push("/")}>
          Home
        </Link>

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;

          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <Typography key={name}>{name}</Typography>
          ) : (
            <Link
              underline="none"
              key={name}
              onClick={() => history.push(routeTo)}
            >
              {name}
            </Link>
          );
        })}
      </Breadcrumbs>
    </>
  );
};

export default withRouter(Breadcrumb);
