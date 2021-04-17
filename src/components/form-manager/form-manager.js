import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ApiService from "../../ApiService";
import FormList from "./form-list";
import {
  FormControl,
  FormControlLabel,
  Grid,
  LinearProgress,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Typography,
} from "@material-ui/core";
import Home from "../Home/Home";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    flexGrow: 1,
    border: "none",
    boxShadow: "none"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  addButton: {
    maxHeight: "40px",
    backgroundColor: "#409EFF",
    borderColor: "#409EFF",
    color: "white",
    marginTop: "4px",
  },
  pos: {
    marginBottom: 12,
  },
  input: {
    textAlign: "center",
    float: "right",
  },
  lable: {
    // marginLeft: '245px',
    // fontSize: 'small'
  },
  formTitle: {
    textAlign: "center",
    fontWeight: "500",
  },
});

export default function ProjectManager() {
  const classes = useStyles();
  const apiService = new ApiService();
  const [open, setOpen] = React.useState(false);
  const [projectManager, setProjectManager] = useState({});
  const [errors, setError] = useState({});
  const [progress, setProgress] = React.useState(0);
  const [progressBar, setProgressBar] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleonChange = (e) => {
    let { name, value } = e.target;
    if (name === "form") {
      projectManager[name] = e.target.checked;
      setProjectManager({ ...projectManager });
    } else if (name === "siteAccessData") {
      projectManager[name] = e.target.checked;
      setProjectManager({ ...projectManager });
    } else if (name === "lotSize") {
      projectManager[name] = e.target.checked;
      setProjectManager({ ...projectManager });
    } else {
      setProjectManager((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!projectManager.projectName) {
      formIsValid = false;
      errors["projectName"] = "*Please Enter projectName";
    }
    setError(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    if (validateForm()) {
      try {
        const payload = projectManager;
        await apiService.createProject(payload);
        setProgressBar(true);
        const timer = setInterval(() => {
          setProgress((oldProgress) => {
            if (oldProgress === 100) {
              setProjectManager("");
              handleClose();
              window.location.reload();
            }
            const diff = Math.random() * 50;
            return Math.min(oldProgress + diff, 100);
          });
        }, 500);
        return () => {
          clearInterval(timer);
        };
      } catch (err) {
        console.log("error", err);
      }
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Home />
      <Card className={classes.root} variant="outlined">
        <Typography variant="h6" noWrap className={classes.formTitle}>
          Form Manager
        </Typography>
        <Grid container style={{ display: "flex", justifyContent: "center" }}>
          <Grid item xs={11} md={10} container>
            <Grid container style={{ marginBottom: "1rem" }}>
              <Grid item xs={11} md={4} container>
                <Button
                  onClick={handleClickOpen}
                  variant="contained"
                  color="primary"
                  className={classes.addButton}
                >
                  + CREATE FORM
                </Button>
              </Grid>
              <Grid
                item
                xs={11}
                md={8}
                container
                style={{ justifyContent: "flex-end" }}
              >
                <TextField
                  id="filled-required"
                  label="Search"
                  style={{ width: "50%" }}
                  // autoFocus
                  variant="outlined"
                  margin="dense"
                  name="projectName"
                  InputProps={{ className: classes.input }}
                  InputLabelProps={{ className: classes.lable }}
                />
              </Grid>
            </Grid>
            <FormList />
          </Grid>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="form-dialog-title">Form Manager</DialogTitle>
          <DialogContent>
            <div style={{ flexGrow: 1, overflow: "hidden" }}>
              {progressBar && (
                <Grid item xs>
                  <LinearProgress variant="determinate" value={progress} />
                </Grid>
              )}
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    id="filled-required"
                    label="Project Name"
                    autoFocus
                    variant="outlined"
                    margin="dense"
                    name="projectName"
                    value={projectManager.projectName}
                    onChange={(e) => handleonChange(e)}
                  />
                  <span style={{ color: "red", top: "5px", fontSize: "10px" }}>
                    {" "}
                    {errors["projectName"]}
                  </span>
                </Grid>
              </Grid>
              <Grid container spacing={3} style={{ alignItems: "center" }}>
                <Grid item xs>
                  <div className={classes.title}>Form</div>
                </Grid>
                <Switch
                  name="form"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                  checked={projectManager.requestedTypeOfDrop}
                  onChange={(e) => handleonChange(e)}
                />
              </Grid>
              <Grid container spacing={3} style={{ alignItems: "center" }}>
                <Grid item xs>
                  <div className={classes.title}>Site Access Data</div>
                </Grid>
                <Switch
                  name="siteAccessData"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                  checked={projectManager.siteAccessData}
                  onChange={(e) => handleonChange(e)}
                />
              </Grid>
              <Grid container spacing={3} style={{ alignItems: "center" }}>
                <Grid item xs>
                  <div className={classes.title}>Lot Size</div>
                </Grid>
                <Switch
                  name="lotSize"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                  checked={projectManager.lotSize}
                  onChange={(e) => handleonChange(e)}
                />
              </Grid>
              <Grid container spacing={3} style={{ alignItems: "center" }}>
                <Grid item xs>
                  <div className={classes.title}>Photo Settings</div>
                </Grid>
              </Grid>
              <Grid container spacing={3} style={{ alignItems: "center" }}>
                <Grid item xs></Grid>
                <Grid item xs>
                  <div className={classes.title}>Orientation(Mobile)</div>
                </Grid>
                <Grid item xs>
                  <FormControl component="fieldset">
                    <RadioGroup aria-label="gender" name="gender1">
                      <FormControlLabel
                        value="portrait"
                        control={<Radio />}
                        label="Portrait"
                        name="Portrait"
                        checked={projectManager.photoOrientation}
                        onChange={(e) => handleonChange(e)}
                      />
                      <FormControlLabel
                        value="landscape"
                        control={<Radio />}
                        label="Landscape"
                        name="Landscape"
                        checked={projectManager.photoOrientation}
                        onChange={(e) => handleonChange(e)}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={3} style={{ alignItems: "center" }}>
                <Grid item xs></Grid>
                <Grid item xs>
                  <div className={classes.title}>Photo Size</div>
                </Grid>
                <Grid item xs>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Age"
                    name="photoSize"
                    onChange={(e) => handleonChange(e)}
                    value={projectManager.photoSize}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"680 X 480"}>680 X 480</MenuItem>
                    <MenuItem value={"1280 X 1440"}>1280 X 1440</MenuItem>
                    <MenuItem value={"1920 X 1440"}>1920 X 1440</MenuItem>
                    <MenuItem value={"2560 X 1920"}>2560 X 1920</MenuItem>
                  </Select>
                </Grid>
              </Grid>

              <Grid container spacing={3} style={{ alignItems: "center" }}>
                <Grid item xs></Grid>
                <Grid item xs>
                  <div className={classes.title}>Compression Quality</div>
                </Grid>
                <Grid item xs>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Age"
                    name="compressionQualitys"
                    onChange={(e) => handleonChange(e)}
                    value={projectManager.compressionQualitys}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"0.95"}>0.95</MenuItem>
                    <MenuItem value={"0.90"}>0.90</MenuItem>
                    <MenuItem value={"0.85"}>0.85</MenuItem>
                    <MenuItem value={"0.80"}>0.80</MenuItem>
                    <MenuItem value={"0.75"}>0.75</MenuItem>
                    <MenuItem value={"0.70"}>0.70</MenuItem>
                    <MenuItem value={"0.65"}>0.65</MenuItem>
                    <MenuItem value={"0.60"}>0.60</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </div>
          </DialogContent>
          <DialogActions style={{justifyContent:"flex-start"}}>
              <div>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </div>
              <div>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  color="primary"
                >
                  Cancel
                </Button>
              </div>
          </DialogActions>
        </Dialog>
      </Card>
    </div>
  );
}
