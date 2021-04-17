import React, { useState } from 'react'
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Alert, AlertTitle } from "@material-ui/lab";
import ButtonHandler from "../Button/button"
import LinearProgressBar from "../ProgressBar/progress-bar"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import {
    createMuiTheme,
    FormControl,
    FormControlLabel,
    Grid,
    makeStyles,
    MenuItem,
    Radio,
    RadioGroup,
    Slide,
} from "@material-ui/core";
import ReactHookFormSelect from "../HookForm/formSelect";
import ReactHookTextField from '../HookForm/formTextField';
import ReactHookSwitch from '../HookForm/formSwitch';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    p: {
        color: '#f44336',
        margin: "auto"
    },
    alertBox: {
        width: "700px",
    },
    addButtonHandler: {
        backgroundColor: "green",
        borderColor: "#409EFF",
        color: "white",
    }
}));

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});
const CustomForm = (props) => {
    const { openPopUp, closePopup, data, projectValue, editForm, projectOnSubmit, questionOnSubmit } = props

    const classes = useStyles();
    const [progress, setProgress] = React.useState(0);
    const [isAlert, setIsAlert] = useState(false);
    const [progressBar, setProgressBar] = useState(false);

    const schemaValidation = yup.object().shape({
        // projectName: yup.string().required("Please enter Project Name"),
         // questionName: yup.string().required("Please enter Question Name"),
    });

    const { register, handleSubmit, errors, control } = useForm({
        resolver: yupResolver(schemaValidation)
    });

    const progressBarHandler = () => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    handleClose();
                    setIsAlert(true);
                }
                const diff = Math.random() * 100;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);
        setTimeout(() => {
            setIsAlert(false);
            // window.location.reload();
        }, 5000);
        return () => {
            clearInterval(timer);
        };
    }

    const onSubmit = async (data) => {
        if (data.projectName) {
            console.log("projectName", data);
            projectOnSubmit(data)
        } else if (data.questionName) {
            questionOnSubmit(data)
            console.log("questionName", data);
        }
        setProgressBar(true);
        progressBarHandler()
    };

    const handleClose = () => {
        closePopup()
    };

    const createInputField = () => {

    }
    return (
        <div>
            <Grid style={{ display: "flex", justifyContent: "center" }}>
                <Slide direction="down" in={isAlert} mountOnEnter unmountOnExit>
                    <Alert severity="success" className={classes.alertBox}>
                        <AlertTitle>Success</AlertTitle>
                         Your Project Created Successfully. — <strong>check it out!</strong>
                    </Alert>
                </Slide>
            </Grid>
            <Dialog
                open={openPopUp}
                onClose={closePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {data && data.map((item, i) => {
                    return item.titleKey === "title" ? (
                        <DialogTitle id="form-dialog-title">{item.formTitle}</DialogTitle>) : ""
                })}
                <form noValidate onSubmit={handleSubmit(onSubmit)} >
                    <DialogContent style={{ paddingTop: "0px" }}>
                        <div style={{ flexGrow: 1, overflow: "hidden" }}>
                            <Grid item xs>
                                {progressBar && (
                                    <LinearProgressBar value={progress} />
                                )}
                            </Grid>
                            {data.map((item, index) => {
                                return item.type === "text" ? (
                                    <>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <ReactHookTextField
                                                    key={index}
                                                    name={item.name}
                                                    // value={editForm ? projectValue.projectName : ""}
                                                    label={item.label}
                                                    inputRef={register}
                                                    // error={errors.projectName ? errors.projectName : errors.questionName}
                                                />
                                                {/* {errors.projectName && <p className={classes.p}>{errors.projectName.message}</p>} */}
                                            </Grid>
                                        </Grid>
                                    </>
                                ) : item.ytpe === "title" ? (
                                    <>
                                        <Grid container direction="row">
                                            < Grid item xs={6} direction="row">
                                                <div className={classes.title}>{item.label}</div>
                                            </Grid>
                                        </Grid>
                                    </>

                                ) : item.type === "button" ? (
                                    <>
                                        <ButtonHandler style={{ backgroundColor: "green", color: "white" }}
                                            name={item.label}
                                            onClick={() => { createInputField() }} />
                                    </>

                                ) : item.type === "addfeild" ? (
                                    <>

                                    </>
                                ) : item.type === "boolean" ? (
                                    <Grid container spacing={3} style={{ alignItems: "center" }}>
                                        <Grid item xs>
                                            <div className={classes.title}>{item.label}</div>
                                        </Grid>
                                        <ReactHookSwitch
                                            name={item.name}
                                            // checked={projectValue.form && projectValue.siteAccessData && projectValue.lotSize}
                                            inputRef={register}
                                        />
                                    </Grid>
                                ) : item.type === "photoLable" ? (
                                    <Grid container spacing={3} style={{ alignItems: "center" }}>
                                        <Grid item xs>
                                            <div className={classes.title}>{item.label}</div>
                                        </Grid>
                                    </Grid>
                                ) : item.type === "radio" ? (
                                    <Grid container spacing={3} style={{ alignItems: "center" }}>
                                        <Grid item xs></Grid>
                                        <Grid item xs>
                                            <div className={classes.title}>{item.label}</div>
                                        </Grid>
                                        <Grid item xs>
                                            <FormControl>
                                                <Controller
                                                    rules={{ required: true }}
                                                    control={control}
                                                    name={item.name}
                                                    // defaultValue={projectValue.gender1}
                                                    as={
                                                        <RadioGroup>
                                                            <FormControlLabel
                                                                value="portrait"
                                                                control={<Radio />}
                                                                label="Portrait"
                                                            />
                                                            <FormControlLabel
                                                                value="landscape"
                                                                control={<Radio />}
                                                                label="landscape"
                                                            />
                                                        </RadioGroup>
                                                    }
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                ) : item.type === "select" ? (
                                    <Grid container spacing={3} style={{ alignItems: "center" }}>
                                        <Grid item xs></Grid>
                                        <Grid item xs>
                                            <div className={classes.title}>{item.label}</div>
                                        </Grid>
                                        <Grid item xs>
                                            <ReactHookFormSelect
                                                name={item.name}
                                                control={control}
                                            // defaultValue={projectValue.photoSize && projectValue.compressionQualitys}
                                            >
                                                {item.value.map((item) => (
                                                    <MenuItem key={item.value} value={item.value}>
                                                        {item.key}
                                                    </MenuItem>
                                                ))}
                                            </ReactHookFormSelect>
                                        </Grid>
                                    </Grid>
                                ) : ""
                            })}
                        </div>
                    </DialogContent>
                    <DialogActions style={{ justifyContent: "center" }}>
                        <div>
                            <ButtonHandler
                                type="submit"
                                color="primary"
                                name="Submit"
                            />
                        </div>
                        <div>
                            <ButtonHandler
                                type="submit"
                                color="primary"
                                name="Cancel"
                                style={{ color: "primary", backgroundColor: "#80808063" }}
                                onClick={closePopup}
                            />
                        </div>
                    </DialogActions>
                </form>
            </Dialog>
        </div >
    )

}

export default CustomForm