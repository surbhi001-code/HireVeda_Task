export const safeUrl = (url) =>
  /^https?:\/\//i.test(url) ? url : `https://${url}`;

export const formatDate = (value) =>
  value
    ? new Date(`${value}-02`).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "";

export const candidateInitials = (name = "") =>
  name
    ? name
        .split(" ")
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "CP";
