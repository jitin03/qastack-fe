import { Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <Container maxWidth="sm" style={{ textAlign: "center" }}>
      <Grid container justifyContent="center" alignItems="center" mt={20}>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          spacing={4}
        >
          <Grid item md={12}>
            <Typography variant="h4">Oops!</Typography>
            <Typography>Page Not Found</Typography>
          </Grid>
          <Grid item md={12}>
            <div className="flexGrow">
              <Link to="/">Visit Our Homepage</Link>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Missing;
