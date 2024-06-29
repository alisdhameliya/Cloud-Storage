const { BlobServiceClient } = require("@azure/storage-blob");
const dotenv = require("dotenv/config");
const SAS_TOKEN = process.env.SAS_TOKEN;
const ACCOUNT_NAME = process.env.ACCOUNT_NAME;
const CONTAINER_NAME = process.env.CONTAINER_NAME;

const blobURL = `https://${ACCOUNT_NAME}.blob.core.windows.net/?${SAS_TOKEN}`;
const blobServiceClient = new BlobServiceClient(blobURL);
const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

module.exports = { 
    containerClient
};