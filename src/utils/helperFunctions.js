export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  return [day.toString(), months[month], year.toString()].join(" ");
};

export const convertPriorityToColor = (priority) => {
  let priorityColor;
  switch (priority) {
    case "very-high":
      priorityColor = "#ED4C5C";
      break;
    case "high":
      priorityColor = "#F8A541";
      break;
    case "normal":
      priorityColor = "#00A790";
      break;
    case "low":
      priorityColor = "#428BC1";
      break;
    case "very-low":
      priorityColor = "#8942C1";
      break;
    default:
      break;
  }
  return priorityColor;
};
