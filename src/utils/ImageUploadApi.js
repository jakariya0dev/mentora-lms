// image upload handler
async function handleUpload(imageFile) {
  // Get signature
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/get-ik-signature`);
  const { signature, expire, token } = await res.json();

  // Prepare form data
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("fileName", imageFile.name || Date.now());
  formData.append("folder", "mentora");
  formData.append("signature", signature);
  formData.append("token", token);
  formData.append("expire", expire);
  formData.append("publicKey", import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY);

  // Upload
  const uploadRes = await fetch(
    "https://upload.imagekit.io/api/v1/files/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const uploadData = await uploadRes.json();

  if (uploadRes.ok) {
    return uploadData.url;
  } else {
    console.error("image Upload error:", uploadData);
  }
}

export default handleUpload;
