

const currentDate = () => {
const day = () => {
  const d = new Date();
  const options = { day: "2-digit" };
  const formatBr = d.toLocaleDateString("pt-BR", options)
  return formatBr 
};

const month = () => {
  const d = new Date();
  const options = { month: "2-digit" };
  const formatBr = d.toLocaleDateString("pt-BR", options)
  return formatBr 
};

const year = () => {
  const d = new Date();
  const options = { year: "numeric" };
  const formatBr = d.toLocaleDateString("pt-BR", options)
  return formatBr 
};

return (day() + month() + year())
}

module.exports = currentDate;