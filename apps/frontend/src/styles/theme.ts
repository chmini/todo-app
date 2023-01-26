import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Spoqa Han Sans Neo",
      "Pretendard",
      "-apple-system",
      "BlinkMacSystemFont",
      "system-ui",
      "Roboto",
      "Helvetica Neue",
      "Segoe UI",
      "Apple SD Gothic Neo",
      "Noto Sans KR",
      "Malgun Gothic",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: /* css */ `
        @font-face {
          font-family: "Spoqa Han Sans Neo";
          font-weight: 700;
          src: local("Spoqa Han Sans Neo Bold"),
            url("https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.woff2")
              format("woff2"),
            url("https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.woff")
              format("woff"),
            url("https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.ttf")
              format("truetype");
        }
        @font-face {
          font-family: "Spoqa Han Sans Neo";
          font-weight: 500;
          src: local("Spoqa Han Sans Neo Regular"),
            url("https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.woff2")
              format("woff2"),
            url("https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.woff")
              format("woff"),
            url("https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.ttf")
              format("truetype");
        }
        @font-face {
          font-family: "Spoqa Han Sans Neo";
          font-weight: 400;
          src: local("Spoqa Han Sans Neo Light"),
            url("https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.woff2")
              format("woff2"),
            url("https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.woff")
              format("woff"),
            url("https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.ttf")
              format("truetype");
        }
      `,
    },
  },
});

export default theme;
