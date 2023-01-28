import { AccountCircle, Inventory } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Stack,
  Link,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { useAuthActions, useIsAuthenticated } from "@/store/auth";

import useMenu from "./useMenu";

export default function Header() {
  const isAuthenticated = useIsAuthenticated();
  const { setToken } = useAuthActions();

  const { anchorEl, isMenuOpen, handleMenuOpen, handleMenuClose } = useMenu();

  const handleLogout = () => {
    handleMenuClose();
    setToken("");
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar>
          <Link color="inherit" component={RouterLink} to="/" underline="none">
            <Stack alignItems="center" direction="row">
              <Inventory sx={{ mr: 1 }} />
              <Typography sx={{ mr: 2 }} variant="h6">
                Todo App
              </Typography>
            </Stack>
          </Link>
          <Box flexGrow={1} />
          {isAuthenticated ? (
            <>
              <Tooltip title="Open settings">
                <IconButton color="inherit" onClick={handleMenuOpen}>
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                login
              </Button>
              <Button color="inherit" component={RouterLink} to="/signup">
                sign up
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
