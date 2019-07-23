const Joi = require("joi");

const AvaliacaoValidation = {
    index: {
        query: {
            produto: Joi.string().alphanum().length(24).required(),
            loja: Joi.string().alphanum().length(24).required()
        }
    },
    show: {
        query: {
            produto: Joi.string().alphanum().length(24).required(),
            loja: Joi.string().alphanum().length(24).required()
        },
        params: {
            id: Joi.string().alphanum().length(24).required()
        }
    },
    store: {
        query: {
            produto: Joi.string().alphanum().length(24).required(),
            loja: Joi.string().alphanum().length(24).required()
        },
        body: {
            nome: Joi.string().required(),
            pontuacao: Joi.number().min(1).max(5).required(),
            texto: Joi.string().required()
        }
    },
    remove: {
        params: {
            id: Joi.string().alphanum().length(24).required()
        }
    }
};

module.exports = { AvaliacaoValidation };