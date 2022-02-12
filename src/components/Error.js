import { Button } from "@mui/material";
import React from "react";
import { withRouter } from "react-router";
import { Link, Typography } from "@mui/material";
const Error = (props) => {
  const { history } = props;
  return (
    <>
      <h1>oops! it's a dead end</h1>
      <Button>
        <Link onClick={() => navigate("/")} underline="none">
          back home
        </Link>
      </Button>
    </>
  );
};

export default withRouter(Error);
