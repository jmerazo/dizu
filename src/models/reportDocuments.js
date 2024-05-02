const db = require('../db/conn_db');

const documentForDependencies = async () => {
    try {
        // Ejecuta la consulta utilizando promesas, sin pasar ningún callback.
        const [results] = await db.query(`SELECT 
                                            nombre_unidad_adtiva_destino,
                                            COUNT(*) AS cantidad
                                        FROM 
                                            ges_unidad_documental
                                        WHERE 
                                            fecha_radicado >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
                                        GROUP BY 
                                            nombre_unidad_adtiva_destino`);
        return results;
    } catch (error) {
        console.error('Error performing query:', error);
        throw error;  // Re-lanza el error para manejarlo en el controlador.
    }
}

const documentForDependenciesFilter = async (params) => {
    try {
        const dateIni = params.date;
        const dateEnd = params.date;
        const dependencies = params.dependencies;
        // Ejecuta la consulta utilizando promesas, sin pasar ningún callback.
        const [results] = await db.query(`SELECT 
                                            nombre_unidad_adtiva_destino,
                                            COUNT(*) AS cantidad
                                        FROM 
                                            ges_unidad_documental
                                        WHERE 
                                            fecha_radicado >= ${dateIni} AND
                                            fecha_radicado <= ${dateEnd} AND
                                            nombre_unidad_adtiva_destino = ${dependencies}
                                        GROUP BY 
                                            nombre_unidad_adtiva_destino`);
        return results;
    } catch (error) {
        console.error('Error performing query:', error);
        throw error;  // Re-lanza el error para manejarlo en el controlador.
    }
}

module.exports = {
    documentForDependencies,
    documentForDependenciesFilter
};