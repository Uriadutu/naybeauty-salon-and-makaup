export function parseAndFormatDateString(dateString) {
  const parsedDate = new Date(dateString);
  const year = parsedDate.getFullYear();
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const day = parsedDate.getDate().toString().padStart(2, "0");

  return `${day}-${month}-${year}`;
}

export function capitalizeWords(text) {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const truncateChars = (text, limit) => {
  if (!text) return "";

  if (text.length <= limit) return text;

  return text.slice(0, limit) + "...";
};

export const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

export const joinWithDan = (arr) => {
  if (!arr || arr.length === 0) return "";
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return `${arr[0]}, dan ${arr[1]}`;

  return `${arr.slice(0, -1).join(", ")}, dan ${arr[arr.length - 1]}`;
};

export const formatTanggal = (date) => {
  if (!date) return "-";
  const d = date.toDate();
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
