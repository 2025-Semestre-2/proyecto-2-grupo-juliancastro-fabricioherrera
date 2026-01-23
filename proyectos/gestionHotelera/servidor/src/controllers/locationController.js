import locationDAO from '../daos/locationDAO.js';

function transformLocations(countries) {
  const result = {
    country: [],
    province: []
    };
    const countrySet = new Set();
    const provinceMap = new Map();
    
    for (const item of countries) {
        let { pais, provincia, canton, distrito } = item;
        pais = pais?.toUpperCase();
        provincia = provincia?.toUpperCase();
        canton = canton?.toUpperCase();
        distrito = distrito?.toUpperCase();
        countrySet.add(pais);
        if (!provinceMap.has(provincia)) {
            provinceMap.set(provincia, {
                nombre: provincia,
                canton: new Map()
        });
    }
    const provinceObj = provinceMap.get(provincia);
    if (!provinceObj.canton.has(canton)) {
      provinceObj.canton.set(canton, {
        nombre: canton,
        distrito: new Set()
      });
    }
    provinceObj.canton.get(canton).distrito.add(distrito);
    }
    result.pais = Array.from(countrySet);
    result.provincia = Array.from(provinceMap.values()).map(p => ({
        nombre: p.nombre,
        canton: Array.from(p.canton.values()).map(c => ({
        nombre: (c.nombre),
        distrito: Array.from(c.distrito)
        }))
    }));
    result.provincia = result.provincia.filter(p => p.nombre !== undefined);
    console.log(result);
  return result;
}


const locationController = {
  async getCountries(req, res) {
    try {

      const countries = await locationDAO.getLocations();
      const formatResult = transformLocations(countries);
      console.log(formatResult);
      

      res.status(200).json({
        success: true,
        data: formatResult,
        message: 'Países obtenidos exitosamente'
      });
    } catch (error) {

      console.error('Error en controlador getCountries:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener países',
        error: error.message
      });
    }
  }
};

export default locationController;