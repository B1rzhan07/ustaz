declare module '@mui/material/styles' {
  interface ZIndex {
    dashboardAppBar: number;
    dashboardSideBar: number;
    modal: number;
    snackbar: number;
    tooltip: number;
    managementBottomNavigation: number;
  }
}

const zIndex = {
  dashboardAppBar: 100,
  dashboardSideBar: 105,
  modal: 1000,
  snackbar: 10000,
  tooltip: 10000,
  managementBottomNavigation: 100,
};

export default zIndex;
