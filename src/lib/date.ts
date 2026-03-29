export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const suffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
    .format(date)
    .replace(/\d+/, `${day}${suffix(day)}`);
}