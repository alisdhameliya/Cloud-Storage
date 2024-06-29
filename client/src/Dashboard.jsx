import { Button, Checkbox, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserButton, useUser } from "@clerk/clerk-react";
import { TbFolderUp } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
const axiosInstance = axios.create({
  baseURL: "https://my-cloud-storage-server.vercel.app/"
});

function Dashboard() {
  const [files, setFiles] = useState(null);
  const [fileCaption, setFileCaption] = useState('');
  const [resultOfUpDelDown, setResultOfUpDelDown] = useState('');
  const [fileUploading, setFileUploading] = useState(false);
  const [allFiles, setAllFiles] = useState([]);
  const [fileGetting, setFileGetting] = useState(false);
  const [isCheckedFiles, setIsCheckedFiles] = useState({});
  const [resultOfFileDelete, setResultOfFileDelete] = useState([]);
  const [deleteFiles, setDeleteFiles] = useState([]);
  const [fileDeleting, setFileDeleting] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileDownloading, setFileDownloading] = useState(false);
  const { user } = useUser();
  const email = user.primaryEmailAddress.emailAddress;

  useEffect(() => { // Getting all the files.
    const getAllFiles = async () => {
      setFileGetting(true);
      try {
        const config = { headers: { 'email': email } };
        const res = await axiosInstance.get("/allFiles", config);
        setAllFiles(res.data); // getting all files
      } catch (error) {
        console.error(error.response.data);
      }
      finally {
        setFileGetting(false);
      }
    };
    getAllFiles();
  }, [resultOfUpDelDown, resultOfFileDelete]);

  useEffect(() => {
    const handleKeyDownDelete = (e) => { // Keyboard Delete Button Handler.
      if (e.key != "Delete") return;
      // e.preventDefault();
      handleFileDelete(deleteFiles);
    };
    document.addEventListener("keydown", handleKeyDownDelete);
    return () => {
      document.removeEventListener("keydown", handleKeyDownDelete);
    };
  }, [deleteFiles]);

  const handleFileDelete = async (filesToDelete) => {
    if (filesToDelete.length === 0) {
      setAllChecked(false);
      alert("Please select atleast one file to delete.");
      return;
    }
    const message = (filesToDelete.length === 1
      ? `Are you sure want to delete the file "${filesToDelete[0].name}" ?`
      : `Are you sure want to delete the all selected files ?`);
    if (!window.confirm(message)) return;
    setFileDeleting(true);
    try {
      const config = { headers: { 'email': email } };
      console.log(config)
      for (const file of filesToDelete) {
        const res = await axiosInstance.delete(`/file/delete/:${file._id}`, config);
      };
      setResultOfFileDelete(filesToDelete); // keeping it unique so that changed values assigned to resultOfFileDelete and useEffect runs and getting all the files again.
      setResultOfUpDelDown("Files Deleted Successfully");
    } catch (error) {
      setResultOfFileDelete("Failed to delete files");
      setResultOfUpDelDown("Failed to delete files");
      console.error(error.response.data);
    }
    finally {
      setIsCheckedFiles({}); // removing list of all the selected checkbox files.
      setDeleteFiles([]); // removing list of all the files to be deleted.
      setAllChecked(false); // unchecking all the checkbox including main checkbox.
      setFileDeleting(false); // removing flag of file deleting.
    }
  };

  const handleFileDownload = async (file) => {
    setFileDownloading(true);
    try {
      const config = { headers: { 'email': email } };
      const res = await axiosInstance.get(`/file/download/:${file._id}`, config);
      const { bufferResponse, contentType } = res.data;
      const uint8Array = new Uint8Array(bufferResponse.data);
      const blob = new Blob([uint8Array], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.name);
      link.click();
      link.remove();  // Alternative of link.remove() => window.URL.revokeObjectURL(url);
      setResultOfUpDelDown("File Downloaded Successfully");
    } catch (error) {
      setResultOfUpDelDown("Failed to download file. Refresh and try again");
      console.error(error.resonse.data);
    } finally {
      setFileDownloading(false);
    }
  };

  const handleFileChoose = (e) => {
    setFiles(e.target.files);
  };

  const handleFileCaption = (e) => {
    setFileCaption(e.target.value);
  };

  const handleFileCheckbox = async (file) => {
    setIsCheckedFiles((prevIsCheckedFiles) => {
      const newIsCheckedFiles = { ...prevIsCheckedFiles, [file._id]: !prevIsCheckedFiles[file._id] };
      const newDeleteFiles = newIsCheckedFiles[file._id] ? [...deleteFiles, file] : deleteFiles.filter((deleteFile) => deleteFile._id !== file._id);
      setDeleteFiles(newDeleteFiles);
      setAllChecked(newDeleteFiles.length === allFiles.length);
      return newIsCheckedFiles;
    });
  };

  const handleAllFileCheckbox = async () => {
    const newAllChecked = !allChecked;
    const newIsCheckedFiles = {};
    const newDeleteFiles = newAllChecked ? [...allFiles] : [];
    for (const file of allFiles) newIsCheckedFiles[file._id] = newAllChecked;
    setIsCheckedFiles(newIsCheckedFiles);
    setDeleteFiles(newDeleteFiles);
    setAllChecked(newAllChecked);
  };

  const handleFileUpload = async () => {
    if (!files) {
      alert("Please select atleast one file to upload.");
      return;
    }
    setFileUploading(true);
    // setResultOfUpDelDown('');
    setUploadProgress(0);
    let res = '';
    try {
      for (const file of files) {
        const filename = file.name.split('.')[0];
        const filetype = file.name.split('.')[1].toLowerCase();
        const config = {
          headers: {
            'content-type': `${filename}/${filetype}`,
            'content-disposition': `attachment; filename=\"${filename}.${filetype}\"`,
            'image-caption': fileCaption,
            'email': email
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        };
        res = await axiosInstance.post('/file/upload', file, config);
      }
      setResultOfUpDelDown(res.data.message);
    } catch (error) {
      setResultOfUpDelDown(error.response.data.message);
      console.error(error.response.data.message);
    }
    finally {
      setFileUploading(false);
      setUploadProgress(0);
      setFileCaption('');
    }
  };



  const TwitterSidebarButton = [
    {
      title: "Home",
      icon: <GoHome />
    },
    {
      title: "Profile",
      icon: <UserButton className="text-2xl"> </UserButton >
    },
    {
      title: "More",
      icon: <HiOutlineDotsCircleHorizontal />
    },
  ]
  return (
    <>
      <div className="grid grid-cols-12  bg-[#0f1010] h-screen w-screen  overflow-hidden">
        <div className="col-span-2 pt-3 border-r-2 border-blue-50">
          <div className="text-2xl text-white flex items-center h-fit w-fit hover:bg-gray-800 rounded-full p-2 ml-2 cursor-pointer">
            <img src="./images/white png.png" alt="" className=" h-12" /><span className=" text-xl">CloudStore</span>
          </div>
          <div>
            <ul className="pt-3 pl-3">
              {TwitterSidebarButton.map(item => (
                <>
                  <li key={item.title}
                    className="flex pl-4 pr-8 h-14 w-36 hover:bg-zinc-600 hover:cursor-pointer text-gray-200 rounded-full gap-4 py-[10px] text-xl items-center">
                    <span className="text-3xl">{item.icon}</span>
                    <span>{item.title}</span>
                  </li>
                </>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-10 text-[#d4d4d4]  scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-zinc-900  overflow-y-scroll overflow-x-hidden ">
          {fileDeleting &&
            <h1 className=" text-[#d4d4d4]">
              Deleting Selected Files...
            </h1>

          }
          {fileDownloading &&
            <h1 className=" text-[#d4d4d4]">
              Downloading...
            </h1>

          }
          <div className=" m-auto mt-10 border-dashed border-zinc-500 border-2 text-white  bg-zinc-900 rounded-lg w-[25%] h-[26%] flex flex-col  items-center">
            <div className="flex items-center justify-center">
              <TbFolderUp className=" h-20 text-3xl text-blue-600" />
            </div>
            <div className="flex items-center justify-center">
              <span >Drop or</span>
              <input className=" flex w-[65%]  rounded-md text-sm text-gray-400 file:border-0 file:bg-zinc-900 file:text-white file:text-sm file:font-medium " type="file" onChange={handleFileChoose} inputProps={{ multiple: true }} disableUnderline />
            </div>
            <input type="text" placeholder="Caption" className=" border-2 m-auto -mb-1 px-3 bg-zinc-900  border-zinc-700 rounded-md  h-10 w-[80%]" value={fileCaption} label="Caption" onChange={handleFileCaption} ></input>
            <p className=" m-1 text-zinc-500 text-sm">* 10 MB max file size. </p>
          </div>

          <div className="flex items-center justify-center mt-7 flex-col">
            {fileUploading
              ? (<>
                <h3> Uploading... </h3>
                <h3> {uploadProgress} % </h3>
                <LinearProgress variant="determinate" value={uploadProgress} style={{ width: "25%", margin: "auto" }} />
              </>)
              : <Button variant="contained" onClick={handleFileUpload}> Upload </Button>
            }

            <h6 className=" text-xl mt-5">
              {resultOfUpDelDown && resultOfUpDelDown}
            </h6>
          </div>
          {
            fileGetting
              ? <Typography variant="h4" fontWeight="bold" style={{ marginTop: "150px", display: "flex", justifyContent: "center" }}>
                Loading Files.....
              </Typography>
              : <>
                <br />
                <Typography variant="h4" fontWeight="bold" style={{ display: "flex", justifyContent: "center", color: "#d4d4d4" }}>
                  Your All Files
                </Typography>
              </>
          }

          {
            allFiles.length > 0 &&
            <TableContainer sx={{ backgroundColor: '#171717', borderRadius: '10px', border: "1px solid #3d3d3d", marginX: "20px", width: "97%", marginTop: "20px", marginBottom: "50px" }} >
              <Table >
                <TableHead >
                  <TableRow >
                    <TableCell sx={{ color: '#B6BEC9' }} width="12%">
                      Select File
                      <br />
                      <Checkbox sx={{ color: 'white' }} onClick={() => handleAllFileCheckbox()} checked={allChecked} />
                      <br />
                      <Button variant="outlined" onClick={() => handleFileDelete(deleteFiles)}> Delete </Button>
                    </TableCell>
                    <TableCell sx={{ color: '#b0aeae' }} width="12%"> NAME </TableCell>
                    <TableCell sx={{ color: '#b0aeae' }} width="18%"> CAPTION </TableCell>
                    <TableCell sx={{ color: '#b0aeae' }} width="8%"> SIZE </TableCell>
                    <TableCell sx={{ color: '#b0aeae' }} width="8%"> FILE TYPE </TableCell>
                    <TableCell sx={{ color: '#b0aeae' }} width="10%"> UPLOAD DATE </TableCell>
                    <TableCell sx={{ color: '#b0aeae' }} width="10%"> UPLOAD TIME </TableCell>
                    <TableCell sx={{ color: '#b0aeae' }} width="10%"> DELETE FILE </TableCell>
                    <TableCell sx={{ color: '#b0aeae' }} width="10%"> DOWNLOAD FILE </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allFiles.map((file) => (
                    <TableRow sx={{ borderBottom: "1px solid red", borderBottomColor: 'red' }} key={file._id} selected={!!isCheckedFiles[file._id]} hover>
                      <TableCell sx={{ color: 'white' }} onClick={() => handleFileCheckbox(file)} >
                        <Checkbox sx={{ color: 'white', }} checked={!!isCheckedFiles[file._id]} /> {/* Handles undefined value too. */}
                      </TableCell>
                      <TableCell sx={{ color: 'white' }} onClick={() => handleFileCheckbox(file)} >{file.name}</TableCell>
                      <TableCell sx={{ color: 'white' }} onClick={() => handleFileCheckbox(file)} >{file.caption}</TableCell>
                      <TableCell sx={{ color: '#b0aeae' }} onClick={() => handleFileCheckbox(file)} >{file.size}</TableCell>
                      <TableCell sx={{ color: '#b0aeae' }} onClick={() => handleFileCheckbox(file)} >{file.fileType}</TableCell>
                      <TableCell sx={{ color: '#b0aeae' }} onClick={() => handleFileCheckbox(file)} >{file.uploadDate}</TableCell>
                      <TableCell sx={{ color: '#b0aeae' }} onClick={() => handleFileCheckbox(file)} >{file.uploadTime}</TableCell>
                      <TableCell sx={{ color: '#b0aeae' }}>
                        <Button variant="outlined" onClick={() => handleFileDelete([file])}> Delete </Button>
                      </TableCell>
                      <TableCell>
                        <Button variant="outlined" onClick={() => handleFileDownload(file)}> Download </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          }
        </div>
      </div >
    </>
  )
};

export default Dashboard;