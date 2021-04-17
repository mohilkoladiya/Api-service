import { Card, Dialog, DialogActions, Checkbox, DialogContent, DialogTitle, Grid, makeStyles, Typography, Button, Box } from "@material-ui/core";
import * as React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import ButtonHandler from "../Button/button";
import Home from "../Home/Home";
import ReactHookTextField from "../HookForm/formTextField";
import SearchTextField from "../SearchField/search-field";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { TreeItem, TreeView } from "@material-ui/lab";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { CheckBox } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        flexGrow: 1,
        border: "none",
        boxShadow: "none"
    },
    projectTitle: {
        textAlign: "center",
        fontWeight: "500",
    },
    alertBox: {
        width: "700px",
    },
    saveButton: {
        marginTop: "10px"
    },
    title: {
        textAlign: "center",
    },
    p: {
        color: '#f44336',
        margin: "auto"
    },
}));
export default function PhotoLabelManager() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [expanded, setExpanded] = React.useState([]);
    const [selected, setSelected] = React.useState([]);

    const schemaValidation = yup.object().shape({
        crewTerritoryManager: yup.string().required("Please enter crew territory manager name"),
    });

    const { register, handleSubmit, control, getValues, reset, errors } = useForm({
        resolver: yupResolver(schemaValidation),

    });

    const onSubmit = (formValues) => {
        console.log("formValues", formValues);
    }
    const handleClickPopUp = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
    };

    return (
        <>
            <Box>
                <Home />
                <Card className={classes.root} variant="outlined">
                    <Typography variant="h6" noWrap className={classes.projectTitle}>
                        Crew Territory Manager
                    </Typography>
                    <Grid container style={{ display: "flex", justifyContent: "center" }}>
                        <Grid item xs={11} md={10} container>
                            <Grid container style={{ marginBottom: "1rem", }}>
                                <Grid item xs={11} md={8} container style={{ justifyContent: "flex-start", }}>
                                    <SearchTextField />
                                </Grid>
                                <Grid item xs={11} md={4} container style={{ justifyContent: "flex-end", marginTop: "7px", marginLeft: "-40px" }}>
                                    <ButtonHandler onClick={() => handleClickPopUp()} name="+ Add Territory" />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Dialog
                        fullWidth={true}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="form-dialog-title">Crew Territory Manager</DialogTitle>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <DialogContent style={{ paddingTop: "0px" }}>
                                <Box style={{ flexGrow: 1, overflow: "hidden" }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <ReactHookTextField
                                                name="crewTerritoryManager"
                                                label="Crew Territory Manager Name"
                                                inputRef={register({})}
                                                style={{ width: 350 }}
                                                error={errors.crewTerritoryManager}
                                            />
                                            {errors.crewTerritoryManager && <p className={classes.p}>{errors.crewTerritoryManager.message}</p>}
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Typography>
                                                <Box fontWeight="fontWeightMedium">Zip Code Selections:</Box>
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TreeView
                                                defaultCollapseIcon={<ExpandMoreIcon />}
                                                defaultExpandIcon={<ChevronRightIcon />}
                                                expanded={expanded}
                                                selected={selected}
                                                onNodeToggle={handleToggle}
                                                onNodeSelect={handleSelect}
                                            >
                                                <TreeItem nodeId="1" label="Applications" >
                                                    <TreeItem nodeId="2" label="Calendar"/>
                                                    <TreeItem nodeId="3" label="Chrome" />
                                                    <TreeItem nodeId="4" label="Webstorm" />
                                                </TreeItem>
                                                <TreeItem nodeId="5" label="Documents">
                                                    <TreeItem nodeId="6" label="Material-UI">
                                                        <TreeItem nodeId="7" label="src">
                                                            <TreeItem nodeId="8" label="index.js" />
                                                            <TreeItem nodeId="9" label="tree-view.js" />
                                                        </TreeItem>
                                                    </TreeItem>
                                                </TreeItem>
                                            </TreeView>
                                        </Grid>
                                    </Grid>

                                </Box>
                            </DialogContent>
                            <DialogActions style={{ justifyContent: "center" }}>
                                <Box>
                                    <ButtonHandler type="submit" name="Submit" />
                                </Box>
                                <Box>
                                    <ButtonHandler
                                        color="primary"
                                        name="Cancel"
                                        style={{ color: "primary", backgroundColor: "#80808063" }}
                                        onClick={handleClose}
                                    />
                                </Box>
                            </DialogActions>
                        </form>
                    </Dialog>
                </Card>
            </Box>
        </>
    );
}