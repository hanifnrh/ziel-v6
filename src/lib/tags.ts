export const COLOR_OPTIONS = [
  { border: "border-indigo-200 border", text: "text-indigo-600" },
  { border: "border-blue-200 border", text: "text-blue-600" },
  { border: "border-green-200 border", text: "text-green-600" },
  { border: "border-violet-200 border", text: "text-violet-600" },
  { border: "border-purple-200 border", text: "text-purple-600" },
  { border: "border-sky-200 border", text: "text-sky-600" },
];

export function parseTags(tagField: string | string[] | undefined) {
  let tagsArray: string[] = [];
  if (tagField) {
    tagsArray = Array.isArray(tagField) ? tagField : [tagField];
  }
  if (tagsArray.length === 0) {
    tagsArray = ["Blog"];
  }
  return tagsArray.map((label) => {
    const randomIndex = Math.floor(Math.random() * COLOR_OPTIONS.length);
    const color = COLOR_OPTIONS[randomIndex];
    return {
      label,
      border: color.border,
      text: color.text,
    };
  });
}