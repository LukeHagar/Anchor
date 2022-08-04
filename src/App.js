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
import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import {
  Button,
  Checkbox,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Zoom,
} from "@mui/material";

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

  const [accessProfiles, setAccessProfiles] = useState();
  const [identityProfiles, setIdentityProfiles] = useState();
  const [roles, setRoles] = useState();
  const [betasources, setBetaSources] = useState();
  const [identities, setIdentities] = useState();

  const [tenantSessions, setTenantSessions] = useState();

  const [tenant, setTenant] = useState("No Session");
  const [warningHidden, setWarningHidden] = useState();

  const apiURLTemplate = "https://tenant.api.identitynow.com";
  const [apiURL, setApiURL] = useState("No Session");

  const [bundleArray, setBundleArray] = useState([]);

  const [finalBundle, setFinalBundle] = useState();

  const [searchValue, setSearchValue] = useState("");

  const vscodelink =
    "vscode://yannick-beot-sp.vscode-sailpoint-identitynow/addtenant?tenantName=TEMPTENANT&accessToken=TEMPACCESSTOKEN&authenticationMethod=AccessToken";

  const searchHandleChange = (event) => {
    setSearchValue(event.target.value);
  };

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

              if (result.strongAuth === true) {
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

                fetch(
                  apiURLTemplate.replace("tenant", tempTenant) + "/beta/roles",
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
                    setRoles(result);
                  });

                fetch(
                  apiURLTemplate.replace("tenant", tempTenant) +
                    "/beta/identity-profiles",
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
                    setIdentityProfiles(result);
                  });

                fetch(
                  apiURLTemplate.replace("tenant", tempTenant) +
                    "/beta/sources",
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
                    setBetaSources(result);
                  });

                fetch(
                  apiURLTemplate.replace("tenant", tempTenant) +
                    "/beta/accounts",
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
                    setIdentities(result);
                  });

                fetch(
                  apiURLTemplate.replace("tenant", tempTenant) +
                    "/beta/access-profiles",
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
                    setAccessProfiles(result);
                  });

                chrome.storage?.sync.get(
                  ["tenantSessions"],
                  function (sessions) {
                    setTenantSessions(sessions);
                    console.log("Tenant Sessions State:");
                    console.log(sessions);
                  }
                );
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
              }
            });
        }
      );
  }

  function checkIfChecked(row) {
    if (bundleArray?.indexOf(row) > -1) {
      return true;
    } else {
      return false;
    }
  }

  function toggleChecked(row) {
    if (bundleArray?.indexOf(row) > -1) {
      setBundleArray(
        bundleArray?.filter((obj) => {
          return obj !== row;
        })
      );
    } else {
      if (bundleArray !== null) {
        setBundleArray([...bundleArray, row]);
      } else {
        setBundleArray([row]);
      }
    }
  }

  function addType(type, object) {
    object["type"] = type;
    console.log("Type Add");
    console.log(object);
    return object;
  }

  function finalBundleBuilder() {
    let bundleLoop = "";

    bundleLoop = bundleLoop + "Access Profiles:\r";
    bundleArray
      ?.filter((entry) => entry.type === "Access Profile")
      ?.map(
        (entry) =>
          (bundleLoop =
            bundleLoop +
            "Name: " +
            entry?.name +
            "\r" +
            "ID: " +
            entry?.id +
            "\r")
      );

    bundleLoop = bundleLoop + "\rIdentities:\r";
    bundleArray
      ?.filter((entry) => entry.type === "Identity")
      ?.map(
        (entry) =>
          (bundleLoop =
            bundleLoop +
            "Name: " +
            entry?.name +
            "\r" +
            "ID: " +
            entry?.id +
            "\r")
      );

    bundleLoop = bundleLoop + "\rIdentity Profiles:\r";
    bundleArray
      ?.filter((entry) => entry.type === "Identity Profile")
      ?.map(
        (entry) =>
          (bundleLoop =
            bundleLoop +
            "Name: " +
            entry?.name +
            "\r" +
            "ID: " +
            entry?.id +
            "\r")
      );

    bundleLoop = bundleLoop + "\rSources:\r";
    bundleArray
      ?.filter((entry) => entry.type === "Source")
      ?.map(
        (entry) =>
          (bundleLoop =
            bundleLoop +
            "Name: " +
            entry?.name +
            "\r" +
            "ID: " +
            entry?.id +
            "\r")
      );

    bundleLoop = bundleLoop + "\rRoles:\r";
    bundleArray
      ?.filter((entry) => entry.type === "Role")
      ?.map(
        (entry) =>
          (bundleLoop =
            bundleLoop +
            "Name: " +
            entry?.name +
            "\r" +
            "ID: " +
            entry?.id +
            "\r")
      );
    setFinalBundle(bundleLoop);
  }

  function UpdateSession() {
    useEffect(() => {
      FetchSession();
    }, []);
  }

  UpdateSession();

  console.log("Session:");
  console.log(session);
  console.log("Beta Sources:");
  console.log(betasources);
  console.log("Access Profiles:");
  console.log(accessProfiles);
  console.log("Roles:");
  console.log(roles);
  console.log("Identity Profiles:");
  console.log(identityProfiles);
  console.log("Identities:");
  console.log(identities);
  console.log("Bundle Array:");
  console.log(bundleArray);
  console.log("Final Bundle:");
  console.log(finalBundle);

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
          <Tab label="Generate Support Bundle" {...a11yProps(1)} />
          <Tab label="Support Links" {...a11yProps(2)} />
          <Tab label="About" {...a11yProps(3)} />
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
        {" "}
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              label="Search/Filter"
              value={searchValue}
              onChange={searchHandleChange}
              margin="dense"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Access Profiles</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 400 }} size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Checkbox</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {accessProfiles
                        ?.filter(
                          (entry) =>
                            entry.name.includes(searchValue) ||
                            entry.sourceId.includes(searchValue) ||
                            entry.nativeIdentity.includes(searchValue) ||
                            entry.owner.includes(searchValue) ||
                            entry.type.includes(searchValue) ||
                            entry.manuallyCorrelated.includes(searchValue) ||
                            entry.disabled.includes(searchValue)
                        )
                        ?.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>{row.name}</TableCell>
                            <TableCell>
                              <Checkbox
                                checked={checkIfChecked(row)}
                                onChange={() =>
                                  toggleChecked(addType("Access Profile", row))
                                }
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Identities</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 400 }} size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Native Identity</TableCell>
                        <TableCell>Checkbox</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {identities
                        ?.filter((entry) => entry.name?.includes(searchValue))
                        ?.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>
                              <Typography>{row.nativeIdentity}</Typography>
                            </TableCell>
                            <TableCell>
                              <Checkbox
                                checked={checkIfChecked(row)}
                                onChange={() =>
                                  toggleChecked(addType("Identity", row))
                                }
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Identity Profiles</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 400 }} size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Checkbox</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {identityProfiles
                        ?.filter(
                          (entry) =>
                            entry.name.includes(searchValue) ||
                            entry.sourceId.includes(searchValue) ||
                            entry.nativeIdentity.includes(searchValue) ||
                            entry.owner.includes(searchValue) ||
                            entry.type.includes(searchValue) ||
                            entry.manuallyCorrelated.includes(searchValue) ||
                            entry.disabled.includes(searchValue)
                        )
                        ?.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>{row.name}</TableCell>
                            <TableCell>
                              <Checkbox
                                checked={checkIfChecked(row)}
                                onChange={() =>
                                  toggleChecked(
                                    addType("Identity Profile", row)
                                  )
                                }
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Sources</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 400 }} size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Checkbox</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {betasources
                        ?.filter(
                          (entry) =>
                            entry.name.includes(searchValue) ||
                            entry.sourceId.includes(searchValue) ||
                            entry.nativeIdentity.includes(searchValue) ||
                            entry.owner.includes(searchValue) ||
                            entry.type.includes(searchValue) ||
                            entry.manuallyCorrelated.includes(searchValue) ||
                            entry.disabled.includes(searchValue)
                        )
                        ?.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>{row.name}</TableCell>
                            <TableCell>
                              <Checkbox
                                checked={checkIfChecked(row)}
                                onChange={() =>
                                  toggleChecked(addType("Source", row))
                                }
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Roles</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 400 }} size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Checkbox</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {roles
                        ?.filter(
                          (entry) =>
                            entry.name.includes(searchValue) ||
                            entry.sourceId.includes(searchValue) ||
                            entry.nativeIdentity.includes(searchValue) ||
                            entry.owner.includes(searchValue) ||
                            entry.type.includes(searchValue) ||
                            entry.manuallyCorrelated.includes(searchValue) ||
                            entry.disabled.includes(searchValue)
                        )
                        ?.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>{row.name}</TableCell>
                            <TableCell>
                              <Checkbox
                                checked={checkIfChecked(row)}
                                onChange={() =>
                                  toggleChecked(addType("Role", row))
                                }
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => finalBundleBuilder()}
            >
              Generate
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField multiline fullWidth value={finalBundle}></TextField>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
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
                    title={"The SailPoint Compass Community Search Page"}
                    placement="bottom"
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <Link
                      href={
                        "https://community.sailpoint.com/t5/IdentityNow-Wiki/IdentityNow-Boom-Links-Find-content-faster/ta-p/205856"
                      }
                      target="_blank"
                      color="primary"
                      underline="hover"
                    >
                      {"Boom Links (Shortcuts)"}
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
              <Grid item xs={12}>
                <Button fullWidth variant="outlined">
                  <Tooltip
                    title={"A Link to the Support Knowledge Base"}
                    placement="bottom"
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <Link
                      href={"https://support.sailpoint.com/"}
                      target="_blank"
                      color="primary"
                      underline="hover"
                    >
                      Support Knowledge Base
                    </Link>
                  </Tooltip>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="outlined">
                  <Tooltip
                    title={"Open a Support Ticket"}
                    placement="bottom"
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <Link
                      href={
                        "https://support.sailpoint.com/hc/en-us/requests/new?"
                      }
                      target="_blank"
                      color="primary"
                      underline="hover"
                    >
                      Log a Support Ticket
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
              <Grid item xs={12}>
                <Button fullWidth variant="outlined">
                  <Tooltip
                    title={"Compass Transform Guides"}
                    placement="bottom"
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <Link
                      href={
                        "https://community.sailpoint.com/t5/Search/bd-p/search?searchString=%22IdentityNow+Transforms+-%22"
                      }
                      target="_blank"
                      color="primary"
                      underline="hover"
                    >
                      Transform Guides
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
      </TabPanel>
      <TabPanel value={value} index={3}>
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
