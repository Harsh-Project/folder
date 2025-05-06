export const ExtractDataCountry = () => {
  const divElement = document.getElementsByClassName("flits-country-province-name")[0];
  const selectElement = document.createElement("select");
  selectElement.innerHTML = divElement.innerHTML;

  const options = selectElement.querySelectorAll("option");
  const countries = [];
  const provinces = {};

  options.forEach((option, index) => {
    countries.push({
      code: option.getAttribute("value"),
      name: option.innerText,
    });
    const parsedProvinces =
      JSON.parse(option.getAttribute("data-provinces")) || [];
    const provinceObjects = parsedProvinces.map((province) => ({
      code: province[0],
      name: province[1],
    }));

    provinces[option.getAttribute("value")] = provinceObjects;
  });

  return { countries, provinces: provinces };
};
