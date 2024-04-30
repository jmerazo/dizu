const reportDocs = require('../models/reportDocuments');

const reportDocsController = async (req, res, next) => {
    try {
        const dataReport = await reportDocs.documentForDependencies();
        res.status(200).json(dataReport);
    } catch (err) {
        console.log('err: ', err);
        res.status(500).send(err);
    }
}

module.exports = {
    reportDocsController
};