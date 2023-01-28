import { Box, Container, Link, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { SignupForm } from "./components";

export default function SignupPage() {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 20,
        }}
      >
        <Stack spacing={2}>
          <SignupForm />
          <Link component={RouterLink} textAlign="center" to="/login" variant="body2">
            Already have an account? Log in
          </Link>
        </Stack>
      </Box>
    </Container>
  );
}
