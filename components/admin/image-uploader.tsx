"use client";

import Image from "next/image";
import { useState } from "react";

const MAX_FILE_SIZE_MB = 5;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface CloudinarySignatureResponse {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder: string;
}

export function ImageUploader({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string;
}) {
  const [imageUrl, setImageUrl] = useState(defaultValue ?? "");
  const [publicId, setPublicId] = useState("");
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setStatus("error");
      setError("Upload a JPEG, PNG, or WebP image.");
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setStatus("error");
      setError(`File is larger than ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    setStatus("uploading");
    setError(null);

    try {
      const signatureResponse = await fetch("/api/admin/cloudinary-signature", {
        method: "POST",
      });
      if (!signatureResponse.ok) throw new Error("Not authorized to upload.");
      const { signature, timestamp, apiKey, cloudName, folder } =
        (await signatureResponse.json()) as CloudinarySignatureResponse;

      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("api_key", apiKey);
      uploadData.append("timestamp", String(timestamp));
      uploadData.append("signature", signature);
      uploadData.append("folder", folder);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: uploadData },
      );
      if (!uploadResponse.ok) throw new Error("Upload failed.");

      const uploaded = (await uploadResponse.json()) as {
        secure_url: string;
        public_id: string;
      };
      setImageUrl(uploaded.secure_url);
      setPublicId(uploaded.public_id);
      setStatus("idle");
    } catch (uploadError) {
      console.error(uploadError);
      setStatus("error");
      setError("Upload failed — try again.");
    }
  }

  return (
    <div>
      <input type="hidden" name={name} value={imageUrl} />
      <input type="hidden" name={`${name}PublicId`} value={publicId} />
      <label className="block text-small font-medium text-ink">Cover image</label>
      <input
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        onChange={handleFileChange}
        className="mt-2 block text-small text-muted"
      />
      {status === "uploading" && <p className="mt-2 text-small text-muted">Uploading…</p>}
      {error && (
        <p role="alert" className="mt-2 text-small text-danger">
          {error}
        </p>
      )}
      {imageUrl && (
        <div className="relative mt-3 aspect-video w-full max-w-sm overflow-hidden rounded-md border border-border">
          <Image src={imageUrl} alt="Uploaded cover preview" fill className="object-cover" />
        </div>
      )}
    </div>
  );
}
