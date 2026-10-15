import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import { HttpsProxyAgent } from "https-proxy-agent";

cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
});

export const Proxy_agent = process.env.PROXY_URL
    ? new HttpsProxyAgent(process.env.PROXY_URL)
    : undefined;

export default cloudinary;