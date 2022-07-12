/*global chrome*/
import logo from "./logo.svg";
import "./App.css";

import * as React from "react";
import { useState, useEffect } from "react";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Button, Grid, Link, Tooltip, Zoom } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [session, setSession] = useState({
    baseUrl: "No Session",
    accessToken: "No Session",
    csrfToken: "No Session",
  });
  const [hostingData, setHostingData] = useState({
    pod: "No Session",
    region: "No Session",
  });
  const [tenantSessions, setTenantSessions] = useState();

  const [tenant, setTenant] = useState("No Session");
  const [warningHidden, setWarningHidden] = useState();

  const apiURLTemplate = "https://tenant.api.identitynow.com";
  const [apiURL, setApiURL] = useState("No Session");

  const vscodelink =
    "vscode://yannick-beot-sp.vscode-sailpoint-identitynow/addtenant?tenantName=TEMPTENANT&accessToken=TEMPACCESSTOKEN&authenticationMethod=AccessToken";

  let tempTenant;

  function FetchSession() {
    chrome.tabs &&
      chrome.tabs.query(
        {
          //Get focused tabs
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          // and use that tab to fill in out title and url
          let tab = tabs[0];
          let theURL = new URL(tab.url);
          let sessionUrl =
            "https://" + theURL.hostname + "/ui/session?force=true";

          console.log("Session URL:");
          console.log(sessionUrl);

          fetch(sessionUrl)
            .then((response) => response.json())
            .then((result) => {
              console.log(result);

              tempTenant = result.baseUrl
                .replace("https://", "")
                .replace(".api.identitynow.com", "");

              setTenant(tempTenant);
              setSession(result);

              if (result.strongAuth === true) {
                setWarningHidden(true);
              } else {
                setWarningHidden(false);
              }

              setApiURL(apiURLTemplate.replace("tenant", tempTenant));

              fetch(
                apiURLTemplate.replace("tenant", tempTenant) +
                  "/beta/tenant-data/hosting-data",
                {
                  method: "GET", // POST, PUT, DELETE, etc.
                  headers: {
                    Authorization: "Bearer " + result.accessToken,
                    "X-CSRF-Token": result.csrfToken,
                  },
                }
              )
                .then((response) => response.json())
                .then((result) => {
                  setHostingData(result);
                });

              chrome.storage?.sync.get(["tenantSessions"], function (sessions) {
                setTenantSessions(sessions);
                console.log("Tenant Sessions State:");
                console.log(sessions);
              });
              if (tenantSessions?.baseUrl.indexOf(session.baseUrl) > -1) {
                console.log("Tenant found in array");
              } else {
                console.log("Tenant not found in array");
              }
              console.log(tenantSessions);
              chrome.storage?.sync.set(
                { tenantSessions: tenantSessions },
                function () {
                  console.log(
                    "Tenant Sessions Storage is set to " + tenantSessions
                  );
                }
              );
            });
        }
      );
  }

  function UpdateSession() {
    useEffect(() => {
      FetchSession();
    }, []);
  }

  UpdateSession();

  console.log("Session:");
  console.log(session);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography align="center" hidden={warningHidden} color="#ff051e">
        Please ensure you are strongly authenticated
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
          aria-label="basic tabs example"
        >
          <Tab label="Tenant" {...a11yProps(0)} />
          <Tab label="Support" {...a11yProps(1)} />
          <Tab label="About" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Card variant="outlined" color="primary">
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  Tenant Info:
                  <br />
                  <br />
                  Tenant: {tenant}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  Pod: {hostingData?.pod}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  Region: {hostingData?.region}
                </Typography>
              </CardContent>
            </Card>
            <Grid item xs={12}>
              <Card variant="outlined" color="primary">
                <CardContent>
                  <Box sx={{ width: "100%", maxWidth: 250 }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                      Session Info:
                      <br />
                      <br />
                      API Url: <br />
                      {apiURL}
                    </Typography>
                    <br />
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      variant="body2"
                      noWrap
                    >
                      Access Token: <br />
                      {session?.accessToken}
                    </Typography>
                    <br />
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      variant="body2"
                      noWrap
                    >
                      CSRF Token: <br />
                      {session?.csrfToken}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <br />
            <Grid item xs={12}>
              <Button fullWidth variant="outlined">
                <Tooltip
                  title={"Opens the Tenant in the SailPoint VSCode Extension"}
                  placement="bottom"
                  TransitionComponent={Zoom}
                  arrow
                >
                  <Link
                    href={vscodelink
                      .replace("TEMPTENANT", tenant)
                      .replace("TEMPACCESSTOKEN", session.accessToken)}
                    target="_blank"
                    color="primary"
                    underline="hover"
                  >
                    Open Tenant in Visual Studio Code
                  </Link>
                </Tooltip>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Accordion>
          <AccordionSummary aria-controls="panel2a-content" id="panel2a-header">
            <Typography>General</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button fullWidth variant="outlined">
                  <Tooltip
                    title={"The SailPoint Compass Community Search Page"}
                    placement="bottom"
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <Link
                      href={"https://community.sailpoint.com"}
                      target="_blank"
                      color="primary"
                      underline="hover"
                    >
                      Compass Search
                    </Link>
                  </Tooltip>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="outlined">
                  <Tooltip
                    title={"a Guide to working with SailPoint Support"}
                    placement="bottom"
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <Link
                      href={
                        "https://community.sailpoint.com/t5/Working-With-Support/ct-p/WorkWithSupport"
                      }
                      target="_blank"
                      color="primary"
                      underline="hover"
                    >
                      Working with Support
                    </Link>
                  </Tooltip>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="outlined">
                  <Tooltip
                    title={"a Guide to what is supported by SaaS Support"}
                    placement="bottom"
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <Link
                      href={
                        "https://community.sailpoint.com/t5/IdentityNow-Wiki/What-is-supported-by-SaaS-Support/ta-p/198779"
                      }
                      target="_blank"
                      color="primary"
                      underline="hover"
                    >
                      Scope of SaaS Support
                    </Link>
                  </Tooltip>
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary aria-controls="panel2a-content" id="panel2a-header">
            <Typography>Connector References</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button fullWidth variant="outlined">
                  <Tooltip
                    title={"Compass Connector Reference Sheet"}
                    placement="bottom"
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <Link
                      href={
                        "https://community.sailpoint.com/t5/IdentityNow-Connectors/IdentityNow-Connectors/ta-p/80019"
                      }
                      target="_blank"
                      color="primary"
                      underline="hover"
                    >
                      Connector Reference
                    </Link>
                  </Tooltip>
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary aria-controls="panel2a-content" id="panel2a-header">
            <Typography>API References</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button fullWidth variant="outlined">
                  <Tooltip
                    title={"IdentityNow User Level Access Matrix"}
                    placement="bottom"
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <Link
                      href={
                        "https://documentation.sailpoint.com/saas/help/common/users/user_level_matrix.html"
                      }
                      target="_blank"
                      color="primary"
                      underline="hover"
                    >
                      Access Matrix
                    </Link>
                  </Tooltip>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="outlined">
                  <Tooltip
                    title={"Developer Beta API Reference"}
                    placement="bottom"
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <Link
                      href={"https://developer.sailpoint.com/apis/beta/"}
                      target="_blank"
                      color="primary"
                      underline="hover"
                    >
                      Beta API Reference
                    </Link>
                  </Tooltip>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="outlined">
                  <Tooltip
                    title={"Developer V3 API Reference"}
                    placement="bottom"
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <Link
                      href={"https://developer.sailpoint.com/apis/v3/"}
                      target="_blank"
                      color="primary"
                      underline="hover"
                    >
                      V3 API Reference
                    </Link>
                  </Tooltip>
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary aria-controls="panel2a-content" id="panel2a-header">
            <Typography>Transform References</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button fullWidth variant="outlined">
                  <Tooltip
                    title={
                      "IdentityNow Transform Reference - Account Attribute"
                    }
                    placement="bottom"
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <Link
                      href={
                        "https://community.sailpoint.com/t5/IdentityNow-Wiki/IdentityNow-Transforms-Account-Attribute/ta-p/180541"
                      }
                      target="_blank"
                      color="primary"
                      underline="hover"
                    >
                      Account Attribute
                    </Link>
                  </Tooltip>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="outlined">
                  <Tooltip
                    title={"IdentityNow Transform Reference - Conditional"}
                    placement="bottom"
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <Link
                      href={
                        "https://community.sailpoint.com/t5/IdentityNow-Wiki/IdentityNow-Transforms-Conditional/ta-p/180545"
                      }
                      target="_blank"
                      color="primary"
                      underline="hover"
                    >
                      Conditional
                    </Link>
                  </Tooltip>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="outlined">
                  <Tooltip
                    title={
                      "IdentityNow Transform Reference - Decompose Diacritial Marks"
                    }
                    placement="bottom"
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <Link
                      href={
                        "https://community.sailpoint.com/t5/IdentityNow-Wiki/IdentityNow-Transforms-Decompose-Diacritial-Marks/ta-p/180549"
                      }
                      target="_blank"
                      color="primary"
                      underline="hover"
                    >
                      Decompose Diacritial Marks
                    </Link>
                  </Tooltip>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="outlined">
                  <Tooltip
                    title={"IdentityNow Transform Reference - E164 Phone"}
                    placement="bottom"
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <Link
                      href={
                        "https://community.sailpoint.com/t5/IdentityNow-Wiki/IdentityNow-Transforms-E164-Phone/ta-p/180550"
                      }
                      target="_blank"
                      color="primary"
                      underline="hover"
                    >
                      E164 Phone
                    </Link>
                  </Tooltip>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="outlined">
                  <Tooltip
                    title={"IdentityNow Transform Reference - Lookup"}
                    placement="bottom"
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <Link
                      href={
                        "https://community.sailpoint.com/t5/IdentityNow-Wiki/IdentityNow-Transforms-Lookup/ta-p/180560"
                      }
                      target="_blank"
                      color="primary"
                      underline="hover"
                    >
                      Lookup
                    </Link>
                  </Tooltip>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="outlined">
                  <Tooltip
                    title={
                      "IdentityNow Transform Reference - Random Alphanumeric"
                    }
                    placement="bottom"
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <Link
                      href={
                        "https://community.sailpoint.com/t5/IdentityNow-Wiki/IdentityNow-Transforms-Random-Alphanumeric/ta-p/180564"
                      }
                      target="_blank"
                      color="primary"
                      underline="hover"
                    >
                      Random Alphanumeric
                    </Link>
                  </Tooltip>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="outlined">
                  <Tooltip
                    title={"IdentityNow Transform Reference - Replace All"}
                    placement="bottom"
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <Link
                      href={
                        "https://community.sailpoint.com/t5/IdentityNow-Wiki/IdentityNow-Transforms-Replace-All/ta-p/180567"
                      }
                      target="_blank"
                      color="primary"
                      underline="hover"
                    >
                      Replace All
                    </Link>
                  </Tooltip>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="outlined">
                  <Tooltip
                    title={"IdentityNow Transform Reference - rules"}
                    placement="bottom"
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <Link
                      href={
                        "https://community.sailpoint.com/t5/IdentityNow-Wiki/IdentityNow-Transforms-Rule/ta-p/180570"
                      }
                      target="_blank"
                      color="primary"
                      underline="hover"
                    >
                      Rules
                    </Link>
                  </Tooltip>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="outlined">
                  <Tooltip
                    title={
                      "IdentityNow Transform Reference - Username Generator"
                    }
                    placement="bottom"
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <Link
                      href={
                        "https://community.sailpoint.com/t5/IdentityNow-Wiki/IdentityNow-Transforms-Username-Generator/ta-p/180577"
                      }
                      target="_blank"
                      color="primary"
                      underline="hover"
                    >
                      Username Generator
                    </Link>
                  </Tooltip>
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Anchor
          <br />
          <br />
          A Chrome Extension written in React.
          <br />
          <br />
          Built to assist with IdentityNow
          <br />
          <img src={logo} className="App-logo" alt="logo" />
        </Typography>
      </TabPanel>
    </Box>
  );
}

export default App;
