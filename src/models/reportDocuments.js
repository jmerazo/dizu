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

module.exports = {
    documentForDependencies
};