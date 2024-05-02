const reportDocs = require('../models/reportDocuments');

const reportDocsController = async (req, res, next) => {
    try {
        const dataReport = await reportDocs.documentForDependencies();
        console.log('dataReport: ', dataReport)
        res.status(200).json(dataReport);
    } catch (err) {
        console.log('err: ', err);
        res.status(500).send(err);
    }
}

const reportDocsFilterController = async (req, res, next) => {
    try {
        const dataFilter = req.body
        const dataReport = await reportDocs.documentForDependencies(dataFilter);
        console.log('dataReport: ', dataReport)
        res.status(200).json(dataReport);
    } catch (err) {
        console.log('err: ', err);
        res.status(500).send(err);
    }
}

module.exports = {
    reportDocsController,
    reportDocsFilterController
};