const Joi = require("joi");

const mongoose = require("mongoose");
const Produto = mongoose.model("Produto");
const Variacao = mongoose.model("Variacao");

const PagamentoValidation = {
    show: {
        params: {
            id: Joi.string().alphanum().length(24).required()
        },
        query: {
            loja: Joi.string().alphanum().length(24).required()
        }
    },
    pagar: {
        params: {
            id: Joi.string().alphanum().length(24).required()
        },
        query: {
            loja: Joi.string().alphanum().length(24).required()
        },
        body: {
            senderHash: Joi.string().required()
        }
    },
    update: {
        params: {
            id: Joi.string().alphanum().length(24).required()
        },
        query: {
            loja: Joi.string().alphanum().length(24).required()
        },
        body: {
            status: Joi.string().optional()
        }
    }
};

const checarValorTotal = async ({ carrinho, entrega, pagamento }) => {
    try {
        const _carrinho = await Promise.all(carrinho.map(async (item) => {
            item.produto = await Produto.findById(item.produto);
            item.variacao = await Variacao.findById(item.variacao);
            return item;
        }));
        let valorTotal = entrega.custo;
        valorTotal += _carrinho.reduce((all, item) => all + (item.quantidade * item.precoUnitario) , 0);
        console.log(valorTotal.toFixed(2), pagamento.valor.toFixed(2), pagamento.parcelas);
        return (
            valorTotal.toFixed(2) === pagamento.valor.toFixed(2) &&
            ( !pagamento.parcelas || pagamento.parcelas <= 6 )
        );
    } catch(e){
        console.log(e);
        return false;
    }
}

const checarCartao = (pagamento) => {
    if( pagamento.forma === "creditCard" ){
        return (
            pagamento.cartao.nomeCompleto && typeof pagamento.cartao.nomeCompleto === "string" &&
            pagamento.cartao.codigoArea && typeof pagamento.cartao.codigoArea === "string" &&
            pagamento.cartao.telefone && typeof pagamento.cartao.telefone === "string" &&
            pagamento.cartao.dataDeNascimento && typeof pagamento.cartao.dataDeNascimento === "string" &&
            pagamento.cartao.credit_card_token && typeof pagamento.cartao.credit_card_token === "string" &&
            pagamento.cartao.cpf && typeof pagamento.cartao.cpf === "string"
        );
    } else if( pagamento.forma === "boleto" ) return true;
    else return false;
}

module.exports = {
    PagamentoValidation,
    checarValorTotal,
    checarCartao
};