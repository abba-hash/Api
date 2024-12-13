import https from "https";
import fs from "fs";
import expressAsyncHandler from "express-async-handler";

const BASE_HOSTNAME = "storage.bunnycdn.com";
const ACCESS_KEY = "60694968-14a3-4af6-adf9ef37679b-adad-4638"; // Ensure this is the correct access key
const STORAGE_ZONENAME = "myecommerce";
const HOSTNAME = BASE_HOSTNAME;

export const uploadFile = expressAsyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file attached");
    }

    const file = req.file;
    const filePath = file.path;
    const fileName = encodeURIComponent(file.originalname);

    const readStream = fs.createReadStream(filePath);

    const options = {
        hostname: HOSTNAME,
        path: `/${STORAGE_ZONENAME}/${fileName}`,
        method: "PUT",
        headers: {
            "Content-Type": "application/octet-stream",
            AccessKey: ACCESS_KEY
        },
    };

    const reqBunny = https.request(options, (response) => {
        let responseBody = "";

        response.on("data", (chunk) => {
            responseBody += chunk;
        });

        response.on("end", () => {
            if (response.statusCode === 201 || response.statusCode === 200) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error("Error in removing file", err);
                    } else {
                        console.log("Local file deleted successfully");
                    }
                });

                return res.status(201).json({
                    status: true,
                    msg: "File uploaded successfully",
                    path: `/${STORAGE_ZONENAME}/${fileName}`
                });
            } else {
                console.error("Response from BunnyCDN:", responseBody);
                return res.status(response.statusCode).json({
                    status: false,
                    msg: "Error uploading file",
                    response: responseBody
                });
            }
        });
    });

    reqBunny.on("error", (error) => {
        console.error("Error in making request to Bunny CDN", error);

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error in removing file", err);
            }
        });

        return res.status(500).json({
            status: false,
            msg: "Error uploading file",
            error: error.message
        });
    });

    readStream.pipe(reqBunny);
});


export const deleteFile = expressAsyncHandler(async (req, res) => {
    const url = `https://${HOSTNAME}/${STORAGE_ZONENAME}/${req.params.fileName}`;
    const options = {
        method: "DELETE",
        headers: {
            AccessKey: ACCESS_KEY
        },
    };
    try {
        const response = await fetch(url,options);
        if (response.ok) {
            res.status(200).json({
                status: true,
                msg: "File deleted successfully"
            });
        }
        else{
            const errorText = await response.text();
            res.status(response.status).json({
                status: false,
                msg: "Error deleting file",
                error: errorText
            }); 
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: "Error deleting file",
            error: error.message
        })
    }
});