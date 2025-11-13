// import { SxProps, Theme } from "@mui/material";

export const heightNavbar = "10vh";

export const formConst = {
  login: {
    username: "username",
    password: "password",
  },
  signup: {
    username: "username",
    password: "password",
    role: "role",
  },
  game: {
    id: "id",
    name: "name",
    day: "dayValue",
    initHour: "initHour",
    endHour: "endHour",
    totalPlayers: "totalPlayers",
    campusId: "campusId",
  },
  campus: {
    name: "name",
    address: "address",
    lng: "lng",
    lat: "lat",
  },
  list: {
    list: "list",
    campus: "campus",
  },
};

export enum Status {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

// export const navbar: SxProps<Theme> = (theme: Theme) => ({
//   position: "absolute",
//   width: "100%",
//   minHeight: "10vh",
//   backgroundColor: theme.palette.primary.main,
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   height: heightNavbar,
// });

// export const appBar: SxProps<Theme> = (theme: Theme) => ({
//   width: "100%",
//   height: "100%",
//   backgroundColor: theme.palette.primary.main,
// });

// export const containerItemsNavbar: SxProps<Theme> = (theme: Theme) => ({
//   display: "flex",
//   width: "100%",
//   justifyContent: "space-between",
// });

// export const containerSocialMedia: SxProps<Theme> = (theme: Theme) => ({
//   display: "flex",
//   justifyContent: "center",
//   color: theme.palette.secondary.main,
// });

// export const containerMediaIcon: SxProps<Theme> = (theme: Theme) => ({
//   height: "fit-content",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   minHeight: "100%",
//   minWidth: "3rem",
//   color: "red",
// });

// export const iconStiles: SxProps<Theme> = (theme: Theme) => ({
//   color: theme.palette.secondary.main,
// });

// export const containerIcon: SxProps<Theme> = (theme: Theme) => ({
//   color: theme.palette.secondary.main,
// });

// export const sections: SxProps<Theme> = (theme: Theme) => ({
//   width: "100%",
//   backgroundColor: theme.palette.secondary.contrastText,
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   marginTop: '10vh'
// });

// export const sectionContainer: SxProps<Theme> = (theme: Theme) => ({
//   width: "100%",
//   backgroundColor: theme.palette.secondary.contrastText,
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// });
