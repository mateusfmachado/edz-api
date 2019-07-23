const mongoose = require("mongoose");

const Variacao = mongoose.model("Variacao");

const validarQuantidadeDisponivel = async (_carrinho) => {
    let todosTemQuantidadeDisponivel = true;
    try {

        const carrinho = await Promise.all(_carrinho.map(async item => {
            item.variacao = await Variacao.findById(item.variacao._id || item.variacao );
            return item;
        }));

        carrinho.forEach(item => {
            if( !item.variacao.quantidade || item.variacao.quantidade < item.quantidade ){
                todosTemQuantidadeDisponivel = false;
            }
        });

        return todosTemQuantidadeDisponivel;
    } catch(e){
        console.warn(e);
        return false;
    }
};

const atualizarQuantidade = async (tipo, pedido) => {
    try {
        const carrinho = await Promise.all(pedido.carrinho.map(async item => {

            item.variacao = await Variacao.findById(item.variacao._id || item.variacao );
            // ALTERACOES

            if( tipo === "salvar_pedido" ){
                item.variacao.quantidade -= item.quantidade;
                item.variacao.quantidadeBloqueada += item.quantidade;
            } else if( tipo === "confirmar_pedido" ){
                item.variacao.quantidadeBloqueada -= item.quantidade;
            } else if( tipo === "cancelar_pedido" ){
                item.variacao.quantidadeBloqueada -= item.quantidade;
                item.variacao.quantidade += item.quantidade;
            }

            await item.variacao.save();
            return item;
        }));
        return true;
    }catch(e){
        console.warn(e);
        return e;
    }
}

module.exports = {
    validarQuantidadeDisponivel,
    atualizarQuantidade
};