const mongoose = require("mongoose"),
      mongoosePaginate = require("mongoose-paginate"),
      Schema = mongoose.Schema;

const EntregaSchema = Schema({
    status: { type: String, required: true },
    codigoRastreamento: { type: String },
    tipo: { type: String, required: true },
    custo: { type: Number, required: true },
    prazo: { type: Number, required: true },
    endereco: {
        type: {
            local: { type: String, required: true },
            numero: { type: String, required: true },
            complemento: { type: String },
            bairro: { type: String, required: true },
            cidade: { type: String, required: true },
            estado: { type: String, required: true },
            CEP: { type: String, required: true }
        },
        required: true
    },
    pedido: { type: Schema.Types.ObjectId, ref: "Pedido", required: true },
    loja: { type: Schema.Types.ObjectId, ref: "Loja", required: true },
    payload: { type: Object }
}, { timestamps: true });

EntregaSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Entrega", EntregaSchema);