import { Grid, makeStyles } from "@material-ui/core";
import { useField } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { FileError, FileRejection, useDropzone } from "react-dropzone";
import AddResult from "../../../layouts/TestRun/Execution/AddResult";
import { SingleFileUploadWithProgress } from "./SingleFileUploadWithProgress";
import { UploadError } from "./UploadError";

let currentId = 0;

function getNewId() {
  // we could use a fancier solution instead of a sequential ID :)
  return ++currentId;
}

export interface UploadableFile {
  // id was added after the video being released to fix a bug
  // Video with the bug -> https://youtube-2021-feb-multiple-file-upload-formik-bmvantunes.vercel.app/bug-report-SMC-Alpha-thank-you.mov
  // Thank you for the bug report SMC Alpha - https://www.youtube.com/channel/UC9C4AlREWdLoKbiLNiZ7XEA
  id: number;
  file: File;
  errors: FileError[];
  url?: string;
}
type rows = {
  data: any;
  meta: any;
  fields: any;
};

export interface ImportData {
  data: any;
}

const useStyles = makeStyles((theme) => ({
  dropzone: {
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: theme.palette.background.default,
    height: theme.spacing(10),
    outline: "none",
  },
}));
const Papa = require("papaparse");
export function MultipleFileUploadField({
  name,
  importData,
  setImportData,
  projectId,
  testRunId,
  testCaseId,
}: {
  name: string;
  importData: any;
  setImportData: any;
  projectId: String;
  testRunId: String;
  testCaseId: String;
}) {
  const [_, __, helpers] = useField(name);
  const classes = useStyles();

  const [files, setFiles] = useState<UploadableFile[]>([]);
  // const [importData, setImportDate] = useState<ImportData>();
  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map((file) => ({
      file,
      errors: [],
      id: getNewId(),
    }));
    const mappedRej = rejFiles.map((r) => ({ ...r, id: getNewId() }));
    setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej]);
    console.log(mappedAcc[0].file);
    let fileType = mappedAcc[0].file.type;
    if (fileType === "text/csv") {
      Papa.parse(mappedAcc[0].file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results: any) {
          console.log("Row:", results.meta.fields);
          const row: rows = {
            data: results.data,
            meta: results.meta,
            fields: results.meta,
          };
          // rows.data = rows.errors = results.errors;
          // rows.meta = results.meta;
          // rows.fields = results.fields;
          setImportData(row);
        },
        // worker: true,
        // step: function (results: any) {
        //   console.log("Row:", results.data);
        //   // rows.data = results.data;
        //   setImportData(results);
        // },
      });
    }
  }, []);

  useEffect(() => {
    helpers.setValue(files);
    // helpers.setTouched(true);
  }, [files]);

  function onUpload(file: File, url: string) {
    setFiles((curr) =>
      curr.map((fw) => {
        if (fw.file === file) {
          return { ...fw, url };
        }
        return fw;
      })
    );
  }

  function onDelete(file: File) {
    setFiles((curr) => curr.filter((fw) => fw.file !== file));
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ["image/*", "video/*", ".pdf", ".csv", ".xls, .xlsx"],
    maxSize: 10000 * 1024, // 300KB
  });

  return (
    <React.Fragment>
      <Grid item style={{ cursor: "pointer" }}>
        <Grid item container {...getRootProps({ className: classes.dropzone })}>
          <input {...getInputProps()} />

          <p>Drag 'n' drop some files here, or click to select files</p>
        </Grid>
      </Grid>

      {files.map((fileWrapper) => (
        <Grid item key={fileWrapper.id}>
          {fileWrapper.errors.length ? (
            <UploadError
              file={fileWrapper.file}
              errors={fileWrapper.errors}
              onDelete={onDelete}
            />
          ) : (
            <SingleFileUploadWithProgress
              onDelete={onDelete}
              onUpload={onUpload}
              file={fileWrapper.file}
              projectId={projectId}
              testRunId={testRunId}
              testCaseId={testCaseId}
            />
          )}
        </Grid>
      ))}
    </React.Fragment>
  );
}
