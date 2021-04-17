/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ApiService from "../../ApiService";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CustomTable from "../Table/custom-table";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export default function FormList() {
  const apiService = new ApiService();
  const [form, setFormData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getForms();
  }, []);

  const getForms = async () => {
    const data = await apiService.getForm();
    setFormData(data);
  };

  const data = [
    { columnName: "Form Name", accessKey: "formName", type: "text" },
    { columnName: "Version ", accessKey: "version", type: "text", },
    { columnName: "Service Line", accessKey: "serviceLine", type: "text" },
    { columnName: "Updated By ", accessKey: "updatedBy", type: "text" },
    { columnName: "Updated", accessKey: "updated", type: "text" },
    { columnName: "", accessKey: "", type: "dropdown_button" },
    // { columnName: "", accessKey: "", type: "crud_button" },
  ];

  return (
    <Paper className={classes.root}>
      <CustomTable
        data={data}
        rowsData={form}
      />
    </Paper>
  );
}
