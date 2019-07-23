const Joi = require("joi");

const VariacaoValidation = {
    index: {
        query: {
            loja: Joi.string().alphanum().length(24).required(),
            produto: Joi.string().alphanum().length(24).required()
        }
    },
    show: {
        query: {
            loja: Joi.string().alphanum().length(24).required(),
            produto: Joi.string().alphanum().length(24).required()
        },
        params: {
            id: Joi.string().alphanum().length(24).required()
        }
    },
    store: {
        query: {
            loja: Joi.string().alphanum().length(24).required(),
            produto: Joi.string().alphanum().length(24).required()
        },
        body: {
            codigo: Joi.string().required(), 
            nome: Joi.string().required(), 
            preco: Joi.number().required(), 
            promocao: Joi.number().optional(), 
            entrega: Joi.object({
                dimensoes: Joi.object({
                    alturaCm: Joi.number().required(), 
                    larguraCm: Joi.number().required(),
                    profundidadeCm: Joi.number().required()
                }).required(),
                pesoKg: Joi.number().required(), 
                freteGratis: Joi.boolean().optional()
            }).required(), 
            quantidade: Joi.number().optional(), 
        }
    },
    update: {
        query: {
            loja: Joi.string().alphanum().length(24).required(),
            produto: Joi.string().alphanum().length(24).required()
        },
        params: {
            id: Joi.string().alphanum().length(24).required()
        },
        body: {
            codigo: Joi.string().optional(), 
            nome: Joi.string().optional(), 
            preco: Joi.number().optional(), 
            promocao: Joi.number().optional(), 
            entrega: Joi.object({
                dimensoes: Joi.object({
                    alturaCm: Joi.number().required(), 
                    larguraCm: Joi.number().required(),
                    profundidadeCm: Joi.number().required()
                }).required(),
                pesoKg: Joi.number().required(), 
                freteGratis: Joi.boolean().optional()
            }).optional(), 
            quantidade: Joi.number().optional(),
            fotos: Joi.array().items(Joi.string()).optional()
        }
    },
    updateImages: {
        query: {
            loja: Joi.string().alphanum().length(24).required(),
            produto: Joi.string().alphanum().length(24).required()
        },
        params: {
            id: Joi.string().alphanum().length(24).required()
        }
    },
    remove: {
        query: {
            loja: Joi.string().alphanum().length(24).required(),
            produto: Joi.string().alphanum().length(24).required()
        },
        params: {
            id: Joi.string().alphanum().length(24).required()
        }
    }
};

module.exports = { VariacaoValidation };