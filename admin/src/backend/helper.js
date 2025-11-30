import axios from "axios";
import { backendUrl } from "../globle";




export async function uploadImageAndGetUrl(imageFile) {
  try {
    if (!imageFile) throw new Error("No image file provided");

    const formData = new FormData();
    formData.append("file", imageFile); // 'file' must match backend field name

    const response = await axios.post(`${backendUrl}/multer/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200 && response.data.imageUrl) {
      console.log("Uploaded Image URL:", response.data.imageUrl);
      return response.data.imageUrl;
    } else {
      throw new Error("Failed to retrieve image URL");
    }
  } catch (error) {
    console.error("Image upload error:", error);
    return null;
  }
}


export async function updateImage(imageFile, oldImageUrl) {
  try {
    console.log("Updating image:", imageFile);
    
    // Upload new image first
    const newImageUrl = await uploadImageAndGetUrl(imageFile);
    if (!newImageUrl) {
      console.error("Failed to upload new image");
      return false;
    }
    
    // Delete old image if upload was successful and old image exists
    if (oldImageUrl) {
      try {
        const oldImageName = oldImageUrl.split("/").pop();
        await axios.delete(`${backendUrl}/multer/image/${oldImageName}`);
        console.log("Old image deleted successfully");
      } catch (error) {
        console.warn("Failed to delete old image:", error);
        // Continue even if delete fails - new image is already uploaded
      }
    }
    
    return newImageUrl;
  } catch (error) {
    console.error("Image update error:", error);
    return false;
  }
}


export async function deleteImage(selectedProductImg) {
  try {
    //  devide selectedProductImg to get image name at the end
    const imageName = selectedProductImg.split("/").pop();
    console.log("Image Name:", imageName); // Debugging line

    const response = await axios.delete(`${backendUrl}/multer/image/${imageName}`);
    if (response.status === 204) {
      console.log("Image deleted successfully");
      return true
    } else {
      console.error("Failed to delete image");
      return false
    }
  } catch (error) {
    console.error("Image delete error:", error);
    return false
  }
}