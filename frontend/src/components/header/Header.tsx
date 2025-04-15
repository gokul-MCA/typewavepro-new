import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import styles from "./Header.module.css";

function Header() {

  const googleAuth = () => {
    window.open(`https://localhost:5555/auth/google/callback`,
      "_self"
    );
  }
  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{backgroundColor:'black'}}>
        <Toolbar disableGutters >
          <Avatar
            alt="typewavepro-logo"
            src="typewavepro-logo-pre.png"
            variant="rounded"
          />

          {/* laptop screen */}
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mx: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 900,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
            className={styles.logo}
          >
            TypeWavePro
          </Typography>

          {/* tablet & mobile screen */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mx: 2,
              display: { xs: "flex", md: "none" },
              fontFamily: "monospace",
              fontWeight: 500,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
            className={styles.logo}
          >
            TypeWavePro
          </Typography>
          <Button
            // href="/sign-in"
            variant="contained"
            sx={{ ml: "auto", textTransform:"none" }}
            onClick={googleAuth}
          >
            Sign in
          </Button>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
