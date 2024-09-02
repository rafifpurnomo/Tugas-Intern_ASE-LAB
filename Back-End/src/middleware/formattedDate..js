const formatTanggal = (isoDate) => {
  if (!isoDate) return null;
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "short" }).format(date);
};

module.exports = { 
    formatTanggal 
};
