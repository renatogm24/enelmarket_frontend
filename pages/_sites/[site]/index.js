import Logout from "@mui/icons-material/Logout";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { tabsClasses } from "@mui/material/Tabs";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import * as React from "react";
import Loader from "../../../components/Loader";
import ResponsiveAppBar from "../../../components/ResponsiveAppBar";
import styles from "./index.module.css";
import { upperFirst, lowerCase } from "lodash";
import CustomizedBadges from "../../../components/CustomizedBadges";

export default function Index({ dataStore }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const StyledTabs = styled((props) => (
    <Tabs
      {...props}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
    />
  ))({
    "& .MuiTabs-indicator": {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent",
    },
    "& .MuiTabs-indicatorSpan": {
      maxWidth: 40,
      width: "100%",
      backgroundColor: "##29d884",
    },
  });

  const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: "none",
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      color: "rgba(0, 0, 0, 0.7)",
      border: "1px solid rgba(0, 0, 0, 0.3)",
      borderRadius: "10px",
      "&.Mui-selected": {
        color: "#29d884",
        backgroundColor: "#e9fcf2",
        border: "1px solid #29d884",
      },
      "&.Mui-focusVisible": {
        backgroundColor: "#29d884",
      },
    })
  );

  let content = null;

  const [value, setValue] = React.useState(0);

  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };

  const img = "/bgimage.jpg";

  if (!dataStore) {
    content = <Loader centered />;
  } else {
    content = (
      <div>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <title>{dataStore.storeName} - Vercel Edge Functions</title>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
        </Head>
        <div
          className="w-full h-28 bg-no-repeat bg-center bg-cover m-0 p-0 mb-24"
          style={{
            backgroundImage: `url(${img})`,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backgroundBlendMode: "darken",
          }}
        >
          <Container fixed>
            <div className="flex justify-end pt-3">
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            </div>
          </Container>
          <Container fixed>
            <div className="relative bottom-2 flex">
              <div className={styles.hero_media}>
                <img src="/bgimage.jpg" alt="" className={styles.image} />
              </div>
              <div className="flex flex-grow flex-col justify-end ml-5 pb-5 text-2xl">
                {upperFirst(lowerCase(dataStore.storeName))}
              </div>
              <div className="flex flex-grow justify-end place-items-end pb-2">
                <Button onClick={toggleDrawer("right", true)}>
                  <CustomizedBadges />
                </Button>
              </div>
            </div>
          </Container>
        </div>
        <Container fixed sx={{ mb: "20px", mt: "100px" }}>
          <Box sx={{ flexGrow: 1, maxWidth: "100%", bgcolor: "#ffffff" }}>
            <StyledTabs
              value={value}
              onChange={handleChange2}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="visible arrows tabs example"
              sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                  "&.Mui-disabled": { opacity: 1 },
                },
              }}
            >
              <StyledTab label="Descuentos" />
              <StyledTab label="Mis Favoritos" />
              <StyledTab label="Polos" />
              <StyledTab label="Poleras" />
              <StyledTab label="Pantalones" />
              <StyledTab label="Casacas" />
              <StyledTab label="Item 7" />
              <StyledTab label="Item 8" />
              <StyledTab label="Item 9" />
              <StyledTab label="Item 10" />
              <StyledTab label="Item 11" />
            </StyledTabs>
          </Box>
        </Container>

        <ResponsiveAppBar />

        {/*        <AppBar position="static" id={"preview-nav-tabs"}>
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            aria-label="preview-window-tabs"
          >
            <Tab label="Instructions" />
            <Tab label="Sign Up" />
            <Tab label="Dashboard" />
            <Tab label="Blog" />
            <Tab label="Pricing" />
            <Tab label="Checkout" />
          </Tabs>
        </AppBar> */}

        <Container fixed>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "flex-end",
              px: "15px",
              py: "10px",
            }}
          >
            <Typography sx={{ minWidth: 100 }}>Contact</Typography>
            <Typography sx={{ minWidth: 100 }}>Profile</Typography>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>

          <h1 className="mb-6">
            <p>{dataStore.storeName}</p>
          </h1>
          <div className="mb-4">
            <Button variant="contained">Hello World</Button>
          </div>

          {["left", "right", "top", "bottom"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </Container>
      </div>
    );
  }

  return content;
}

export async function getStaticPaths() {
  /* const {
    data: { stores },
  } = await apolloClient.query({
    query: GET_STORES_NAMES,
  });*/

  const stores = [{ storeName: "rumbero" }, { storeName: "emprendeadvisor" }];
  const filteredStores = stores;
  /* const filteredStores = stores.filter((item) =>
    item.storeName !== "enelmarket" && item.storeName !== "admin" ? true : false
  );*/

  // build paths for each of the sites in the previous two lists
  const paths = [
    ...filteredStores.map((item) => {
      return { params: { site: item.storeName } };
    }),
  ];

  return {
    paths: paths,
    fallback: true, // fallback true allows sites to be generated using ISR
  };
}

export async function getStaticProps({ params: { site } }) {
  // check if site is a custom domain or a subdomain
  //const customDomain = site.includes(".") ? true : false;

  if (site == "enelmarket.com" || site == "localhost:3000") {
    site = "enelmarket";
  }

  /* const {
    data: { store },
  } = await apolloClient.query({
    query: GET_STORE_BY_NAME,
    variables: {
      idName: site,
    },
  });*/

  const stores = {
    rumbero: {
      id: 1,
      storeName: "rumbero",
      name: "Renato",
      lastname: "Garay",
      mail: "renatogaraym@gmail.com",
      password: "1234",
    },
    emprendeadvisor: {
      id: 1,
      storeName: "emprendeadvisor",
      name: "Asis",
      lastname: "Miranda",
      mail: "emprendeadvisor@gmail.com",
      password: "1234",
    },
  };

  const store = stores[site];

  if (!store) {
    return {
      redirect: {
        destination: "http://localhost:3000", //"https://enelmarket.com/"
        permanent: false,
      },
    };
  }

  return {
    props: {
      dataStore: store,
      //initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1, // set revalidate interval of 5s
  };
}
