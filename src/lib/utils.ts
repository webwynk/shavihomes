import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function compressImage(
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.8
): Promise<File> {
  return new Promise((resolve) => {
    // Only process images
    if (!file.type.startsWith("image/")) {
      return resolve(file);
    }

    // Skip GIFs and SVGs to preserve animation and vector properties
    if (file.type === "image/gif" || file.type === "image/svg+xml") {
      return resolve(file);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return resolve(file);
        }

        // Always convert to JPEG for optimal compression (guaranteeing file size < 1MB for Nginx limits).
        // Since JPEG has no transparency, fill the canvas with a white background first
        // to prevent transparent parts of PNGs from turning black.
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        const outputType = "image/jpeg";

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return resolve(file);
            }

            // Rename file extension to .webp if we convert it to JPEG
            let newName = file.name;
            if (!file.name.toLowerCase().endsWith(".webp") && !file.name.toLowerCase().endsWith(".webp")) {
              const lastDot = file.name.lastIndexOf(".");
              newName = (lastDot !== -1 ? file.name.substring(0, lastDot) : file.name) + ".webp";
            }

            const compressedFile = new File([blob], newName, {
              type: outputType,
              lastModified: Date.now(),
            });

            // Return original file if compression didn't result in a smaller size
            if (compressedFile.size > file.size) {
              resolve(file);
            } else {
              resolve(compressedFile);
            }
          },
          outputType,
          quality
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
}

