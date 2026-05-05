import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return Response.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const fileBase64 = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${fileBase64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "madeinnepal",
      resource_type: "auto",
    });

    return Response.json({
      success: true,
      url: result.secure_url,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return Response.json(
      { success: false, message: error.message || "Upload Failed" },
      { status: 500 }
    );
  }
}