import { Box, Container, Link, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { LoginForm } from "@/components/Login";

export default function LoginPage() {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 20,
        }}
      >
        <Stack spacing={2}>
          <LoginForm />
          <Link component={RouterLink} textAlign="center" to="/signup" variant="body2">
            회원가입 하러가기
          </Link>
        </Stack>
      </Box>
    </Container>
  );
}
